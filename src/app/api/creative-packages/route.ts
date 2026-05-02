import { NextRequest, NextResponse } from "next/server";
import { generateCozeCreativePackage } from "@/lib/creative-engine/coze-generate";
import type { ProductInput } from "@/lib/creative-engine/schema";
import { trackServerEvent } from "@/lib/analytics/events";
import { checkRateLimit } from "@/lib/rate-limit";
import { supabaseAdmin } from "@/lib/supabase/client";

function normalizeProductInput(body: Partial<ProductInput>): ProductInput {
  return {
    productName: String(body.productName ?? "").trim(),
    category: String(body.category ?? "").trim(),
    sellingPoints: Array.isArray(body.sellingPoints)
      ? body.sellingPoints.map(String).slice(0, 3)
      : [],
    targetAudience: String(body.targetAudience ?? "").trim(),
    offer: String(body.offer ?? "").trim(),
    platform: "tiktok_reels_meta",
    tone: body.tone ?? "direct_response",
    imageAssetId: body.imageAssetId,
  };
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";

  if (!checkRateLimit(`creative:${ip}`, 30)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const input = normalizeProductInput(await request.json());

  if (!input.productName || input.sellingPoints.filter(Boolean).length < 1) {
    return NextResponse.json(
      { error: "Product name and at least one selling point are required." },
      { status: 400 },
    );
  }

  // 0. Get User from Session (if logged in)
  const { data: { user } } = await supabaseAdmin.auth.getUser(
    request.headers.get("Authorization")?.split("Bearer ")[1] || ""
  );

  // 1. Generate via Coze
  const creativePackage = await generateCozeCreativePackage(input);

  // 2. Persist to Supabase
  const { data: productRow, error: pError } = await supabaseAdmin
    .from("product_inputs")
    .insert({
      product_name: input.productName,
      category: input.category,
      target_audience: input.targetAudience,
      selling_points: input.sellingPoints,
      offer: input.offer,
      tone: input.tone,
      image_asset_id: input.imageAssetId,
      user_id: user?.id, // Link to user
    })
    .select()
    .single();

  if (pError || !productRow) {
    return NextResponse.json({ error: "Failed to save product input." }, { status: 500 });
  }

  const { data: packageRow, error: pkgError } = await supabaseAdmin
    .from("creative_packages")
    .insert({
      product_input_id: productRow.id,
      status: "ready",
    })
    .select()
    .single();

  if (pkgError || !packageRow) {
    return NextResponse.json({ error: "Failed to save creative package." }, { status: 500 });
  }

  const conceptsToInsert = creativePackage.concepts.map((c) => ({
    package_id: packageRow.id,
    angle: c.angle,
    hook: c.hook,
    storyboard: c.storyboard,
    caption: c.caption,
    cta: c.cta,
    thumbnail_prompt: c.thumbnailPrompt,
    video_prompt: c.videoPrompt,
    rank: c.rank,
  }));

  const { error: conceptError } = await supabaseAdmin
    .from("creative_concepts")
    .insert(conceptsToInsert);

  if (conceptError) {
    return NextResponse.json({ error: "Failed to save creative concepts." }, { status: 500 });
  }

  // Add the newly created DB IDs back to the response object for the frontend
  const finalPackage = {
    ...creativePackage,
    id: packageRow.id,
  };

  trackServerEvent("creative_package_succeeded", {
    packageId: finalPackage.id,
    productName: input.productName,
  });

  return NextResponse.json(finalPackage);
}
