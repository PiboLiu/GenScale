import { getSupabaseAdmin } from "@/lib/supabase/client";

/**
 * Deducts 1 credit from the user's profile.
 * Should be called inside API routes that perform billable AI operations.
 */
export async function deductCredit(userId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { success: false, error: "Database connection failed" };

  // Get current credits
  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", userId)
    .single();

  if (fetchError || !profile) {
    return { success: false, error: "User profile not found" };
  }

  if (profile.credits < 1) {
    return { success: false, error: "Insufficient credits" };
  }

  // Deduct 1 credit
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ credits: profile.credits - 1 })
    .eq("id", userId);

  if (updateError) {
    return { success: false, error: "Failed to update credits" };
  }

  return { success: true };
}
