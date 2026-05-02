import { NextRequest, NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics/events";
import { CozeVideoProvider } from "@/lib/providers/coze-video-provider";
import { checkRateLimit } from "@/lib/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import type { Generation } from "@/lib/creative-engine/schema";

const provider = new CozeVideoProvider();

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const supabaseAdmin = getSupabaseAdmin();

  if (!checkRateLimit(`generation:${ip}`, 10)) {
    return NextResponse.json({ error: "Too many generation requests." }, { status: 429 });
  }

  const body = (await request.json()) as {
    packageId?: string;
    conceptId?: string;
  };

  // 1. Fetch concept from Supabase
  const { data: concept, error: cError } = await supabaseAdmin
    .from("creative_concepts")
    .select("*, creative_packages(*, product_inputs(*))")
    .eq("id", body.conceptId)
    .single();

  if (cError || !concept) {
    return NextResponse.json(
      { error: "Creative concept was not found." },
      { status: 404 },
    );
  }

  const creativePackage = concept.creative_packages;
  const productInput = creativePackage.product_inputs;

  // 2. Call Video Provider
  const job = await provider.create({
    videoPrompt: concept.video_prompt,
    productImageUrl: productInput.image_asset_id
      ? `https://example.com/assets/${productInput.image_asset_id}`
      : undefined,
    aspectRatio: "9:16",
    durationSeconds: 10,
  });

  // 3. Persist Generation
  const { data: genRow, error: gError } = await supabaseAdmin
    .from("generations")
    .insert({
      package_id: creativePackage.id,
      concept_id: concept.id,
      provider: job.provider,
      provider_job_id: job.providerJobId,
      status: job.status,
      cost_usd: job.costUsd || 0,
    })
    .select()
    .single();

  if (gError || !genRow) {
    return NextResponse.json({ error: "Failed to save generation." }, { status: 500 });
  }

  trackServerEvent("video_generation_started", {
    generationId: genRow.id,
    packageId: creativePackage.id,
  });

  return NextResponse.json(genRow);
}
