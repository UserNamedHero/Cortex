'use client'

export const dynamic = 'force-dynamic'

import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const supabase = createClient()

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Event Platform Login</h1>
        <button
          onClick={() => handleOAuthLogin('github')}
          className="w-full rounded-md bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  )
}