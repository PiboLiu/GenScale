import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Video } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return <div>Database connection error.</div>;
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // Fetch user's profile and generations
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: generations } = await supabase
    .from("generations")
    .select("*, creative_concepts(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
            <p className="text-zinc-600">Manage your AI video assets</p>
          </div>
          <Card className="w-full sm:w-auto">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-500">Available Credits</span>
                  <span className="text-2xl font-bold text-zinc-900">{profile?.credits ?? 0}</span>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Top Up</Button>
              </div>
            </CardContent>
          </Card>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generations && generations.length > 0 ? (
            generations.map((gen) => (
              <Card key={gen.id} className="overflow-hidden border-zinc-200">
                <div className="aspect-[9/16] bg-zinc-900 relative flex items-center justify-center">
                  {gen.status === 'succeeded' && gen.output_url ? (
                    <video 
                      src={gen.output_url} 
                      className="h-full w-full object-cover"
                      controls
                    />
                  ) : (
                    <div className="text-zinc-500 flex flex-col items-center gap-2">
                      <Video className="h-8 w-8 animate-pulse" />
                      <span className="text-sm uppercase tracking-widest">{gen.status}</span>
                    </div>
                  )}
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={gen.status === 'succeeded' ? 'secondary' : 'outline'}>
                      {gen.status}
                    </Badge>
                    <span className="text-xs text-zinc-400">
                      {new Date(gen.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-sm line-clamp-1">
                    {gen.creative_concepts?.angle || "Video Ad"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Button variant="ghost" size="sm" className="w-full gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" asChild>
                    <a href={`/results/${gen.package_id}`} target="_blank" rel="noopener noreferrer">
                      View Package <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-zinc-200">
              <Video className="mx-auto h-12 w-12 text-zinc-300 mb-4" />
              <h3 className="text-lg font-medium text-zinc-900">No videos yet</h3>
              <p className="text-zinc-500 mb-6">Start by generating your first creative package on the homepage.</p>
              <Button asChild variant="outline">
                <a href="/">Go to Home</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
