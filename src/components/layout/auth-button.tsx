'use client'

import { getSupabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function AuthButton() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = getSupabase()

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(profile)
      }
      setLoading(false)
    }
    getData()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          setProfile(profile)
        } else {
          setProfile(null)
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  const handleLogin = async () => {
    if (!supabase) return
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
  }

  const handleLogout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    router.refresh()
  }

  if (!supabase || loading) return <div className="h-9 w-20 animate-pulse rounded bg-zinc-200" />

  if (profile) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-zinc-500">Credits</span>
          <span className="text-sm font-bold text-zinc-900">{profile.credits ?? 0}</span>
        </div>
        <img 
          src={profile.avatar_url} 
          alt={profile.full_name} 
          className="h-8 w-8 rounded-full border border-zinc-200"
        />
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Button size="sm" onClick={handleLogin}>
      Sign In with Google
    </Button>
  )
}
