import { createClient } from '@/utils/supabase/server'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    console.log("Current user ID:", user?.id) // Should print the user UUID in your terminal

    // Fetch event data directly from your PostgreSQL table created on Day 3
    const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .order('final_date', { ascending: true })

    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-2xl font-bold tracking-tight">Active Events & Workshops</h1>
            <p className="text-sm text-zinc-500">Manage registrations, hardware kits, and participant pipelines.</p>
            </div>
        </div>

        {error && (
            <div className="p-4 rounded-md bg-red-50 text-red-700 text-sm">
            Failed to load events: {error.message}
            </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events && events.length > 0 ? (
            events.map((event) => (
                <Card key={event.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-semibold">{event.title}</CardTitle>
                    <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                    {event.status}
                    </Badge>
                </CardHeader>
                <CardContent className="pt-2">
                    <CardDescription className="text-xs text-zinc-500">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </CardDescription>
                    <p className="mt-4 text-xs font-medium text-zinc-700 capitalize">
                    Type: {event.location_type || 'Virtual / Hybrid'}
                    </p>
                </CardContent>
                </Card>
            ))
            ) : (
            <Card className="col-span-full p-8 text-center text-zinc-500 text-sm">
                No events found in database. Insert a row into your <code className="bg-zinc-100 px-1 py-0.5 rounded">events</code> table in Supabase to see it render here!
            </Card>
            )}
        </div>
        </div>
    )
}