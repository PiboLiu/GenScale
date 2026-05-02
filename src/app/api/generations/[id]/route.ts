import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics/events";
import { CozeVideoProvider } from "@/lib/providers/coze-video-provider";
import { getSupabaseAdmin } from "@/lib/supabase/client";

const provider = new CozeVideoProvider();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabaseAdmin = getSupabaseAdmin();
  
  // 1. Fetch generation with relations from Supabase
  const { data: generation, error: gError } = await supabaseAdmin
    .from("generations")
    .select("*, creative_concepts(*, creative_packages(*, product_inputs(*)))")
    .eq("id", id)
    .single();

  if (gError || !generation) {
    return NextResponse.json({ error: "Generation was not found." }, { status: 404 });
  }

  const ageMs = Date.now() - new Date(generation.created_at).getTime();

  // 2. Poll provider if needed
  if (generation.status !== "succeeded" && generation.status !== "failed" && ageMs > 2_000) {
    const job = await provider.getStatus(generation.provider_job_id);
    
    const updateData: any = {
      status: job.status,
      output_url: job.outputUrl,
      cost_usd: job.costUsd,
      error_message: job.errorMessage,
    };
    
    if (job.status === "succeeded") {
      updateData.completed_at = new Date().toISOString();
      trackServerEvent("video_generation_succeeded", { generationId: generation.id });
    } else if (job.status === "failed") {
      updateData.completed_at = new Date().toISOString();
      trackServerEvent("video_generation_failed", { 
        generationId: generation.id,
        error: job.errorMessage 
      });
    }

    await supabaseAdmin
      .from("generations")
      .update(updateData)
      .eq("id", generation.id);
      
    // Update local object for response
    Object.assign(generation, updateData);

  } else if (generation.status === "queued" && ageMs > 500) {
    const { error: uError } = await supabaseAdmin
      .from("generations")
      .update({ status: "running" })
      .eq("id", generation.id);
    
    if (!uError) {
      generation.status = "running";
    }
  }

  const concept = generation.creative_concepts;
  const creativePackage = concept?.creative_packages;

  return NextResponse.json({
    generation,
    creativePackage,
    concept,
  });
}
