import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-zinc-50/50 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <span className="h-6 w-6 rounded-md bg-zinc-900 text-white flex items-center justify-center text-xs">E</span>
            NPO EventOps
          </div>
          <nav className="space-y-1 flex flex-col text-sm text-zinc-600">
            <Link href="/dashboard" className="rounded-lg bg-zinc-200/60 px-3 py-2 font-medium text-zinc-900">
              Events & Workshops
            </Link>
            <Link href="/dashboard/teams" className="rounded-lg px-3 py-2 hover:bg-zinc-100">
              Teams & Hackathons
            </Link>
            <Link href="/dashboard/analytics" className="rounded-lg px-3 py-2 hover:bg-zinc-100">
              Operations Telemetry
            </Link>
          </nav>
        </div>
        <div className="border-t pt-4 text-xs text-zinc-500">
          <p className="truncate font-medium text-zinc-900">{user.email}</p>
          <p className="capitalize">Role: Organizer</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="border-b px-8 py-4 flex justify-between items-center bg-white">
          <h2 className="text-sm font-medium text-zinc-500">Organizer Command Center</h2>
          <form action="/auth/signout" method="post">
            <button className="text-xs text-red-600 hover:underline">Sign Out</button>
          </form>
        </header>
        <main className="p-8 flex-1 bg-zinc-50/30">
          {children}
        </main>
      </div>
    </div>
  )
}