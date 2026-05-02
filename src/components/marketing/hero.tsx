import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Rocket, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <Badge variant="secondary" className="mb-4 gap-1.5 px-3 py-1 text-sm font-medium">
          <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
          Next-Gen AI Video for E-commerce
        </Badge>
        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-7xl">
          Transform One Product Image Into <span className="text-indigo-600">Viral Video Ads</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 sm:text-xl">
          GenScale uses Kling AI and specialized creative agents to turn flat photos into high-converting video packages in seconds. Scale your TikTok and Meta ads without a production team.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="h-12 gap-2 px-8 text-base shadow-xl shadow-indigo-200">
            <Rocket className="h-5 w-5" />
            Start Creating Free
          </Button>
          <Button size="lg" variant="outline" className="h-12 gap-2 px-8 text-base">
            <PlayCircle className="h-5 w-5" />
            Watch Examples
          </Button>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-50/50 blur-3xl" />
      </div>
    </section>
  );
}
