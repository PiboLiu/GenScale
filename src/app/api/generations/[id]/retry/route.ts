import { NextResponse } from "next/server";
import { CozeVideoProvider } from "@/lib/providers/coze-video-provider";
import { supabaseAdmin } from "@/lib/supabase/client";

const provider = new CozeVideoProvider();

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // 1. Fetch previous generation with relations
  const { data: previous, error: pError } = await supabaseAdmin
    .from("generations")
    .select("*, creative_concepts(*, creative_packages(*, product_inputs(*)))")
    .eq("id", id)
    .single();

  if (pError || !previous) {
    return NextResponse.json({ error: "Generation was not found." }, { status: 404 });
  }

  const concept = previous.creative_concepts;
  const creativePackage = concept?.creative_packages;
  const productInput = creativePackage?.product_inputs;

  if (!creativePackage || !concept) {
    return NextResponse.json(
      { error: "Creative package or concept was not found." },
      { status: 404 },
    );
  }

  // 2. Call Video Provider
  const job = await provider.create({
    videoPrompt: concept.video_prompt,
    productImageUrl: productInput.image_asset_id
      ? `https://example.com/assets/${productInput.image_asset_id}`
      : undefined,
    aspectRatio: "9:16",
    durationSeconds: 10,
  });

  // 3. Persist new Generation
  const { data: next, error: nError } = await supabaseAdmin
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

  if (nError || !next) {
    return NextResponse.json({ error: "Failed to save new generation." }, { status: 500 });
  }

  return NextResponse.json(next);
}

