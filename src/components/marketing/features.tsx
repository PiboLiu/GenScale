import { Zap, Video, Target, BarChart3, Repeat, Layers } from "lucide-react";

const features = [
  {
    title: "Kling AI Powered",
    description: "Industry-leading video synthesis for hyper-realistic textures and physics.",
    icon: Zap,
  },
  {
    title: "Ad Concept Packaging",
    description: "Get 3 distinct creative concepts (Angles, Hooks, Scripts) for every product image.",
    icon: Layers,
  },
  {
    title: "Vertical 9:16 Format",
    description: "Native vertical video optimized for TikTok, Reels, and YouTube Shorts.",
    icon: Video,
  },
  {
    title: "Audience-Targeted",
    description: "Specify your niche to get scripts that resonate with your exact customer persona.",
    icon: Target,
  },
  {
    title: "ROAS Focused",
    description: "Built by e-commerce marketers to solve the creative fatigue problem.",
    icon: BarChart3,
  },
  {
    title: "One-Click Iteration",
    description: "Tweak prompts and regenerate instantly until you find the winning ad.",
    icon: Repeat,
  },
];

export function Features() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Why GenScale?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Everything you need for creative scale
          </p>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            Stop wasting thousands on studios. GenScale provides agency-quality creatives at a fraction of the cost and time.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-zinc-900">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
