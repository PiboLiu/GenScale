import { createClient } from '@supabase/supabase-js'

// Browser-safe client (uses NEXT_PUBLIC_ env vars)
// In Next.js 15, we can't easily use cookies() in a file imported by client components
// unless we mark it carefully. For simplicity in MVP, we split the clients.
export const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// Admin client for server-side operations (Lazy)
export const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)
