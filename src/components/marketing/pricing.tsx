import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    priceMonthly: "$0",
    description: "Perfect for testing the AI capabilities.",
    features: [
      "10 Free Credits",
      "Kling AI Access",
      "3 Creative Concepts per image",
      "TikTok/Meta optimized",
      "Email support",
    ],
    cta: "Get Started",
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    priceMonthly: "$49",
    description: "Best for growing brands and agencies.",
    features: [
      "100 Credits per month",
      "Priority Rendering queue",
      "Full Commercial Rights",
      "Remove Watermark",
      "24/7 Priority support",
    ],
    cta: "Buy Pro",
    mostPopular: true,
  },
  {
    name: "Growth",
    id: "tier-growth",
    priceMonthly: "$149",
    description: "Scale your creative production exponentially.",
    features: [
      "500 Credits per month",
      "Highest Priority Queue",
      "Custom Brand Presets",
      "Batch Generation (Soon)",
      "Dedicated Account Manager",
    ],
    cta: "Buy Growth",
    mostPopular: false,
  },
];

export function Pricing() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Scale your ads, not your budget
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between rounded-3xl p-8 ring-1 ring-zinc-200 xl:p-10 ${
                tier.mostPopular ? "bg-zinc-900 text-white ring-zinc-900" : "bg-white text-zinc-900"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className={`text-lg font-semibold leading-8 ${tier.mostPopular ? "text-white" : "text-zinc-900"}`}>
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className={`mt-4 text-sm leading-6 ${tier.mostPopular ? "text-zinc-300" : "text-zinc-600"}`}>
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight">{tier.priceMonthly}</span>
                  <span className={`text-sm font-semibold leading-6 ${tier.mostPopular ? "text-zinc-300" : "text-zinc-600"}`}>
                    /month
                  </span>
                </p>
                <ul role="list" className={`mt-8 space-y-3 text-sm leading-6 ${tier.mostPopular ? "text-zinc-300" : "text-zinc-600"}`}>
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className={`h-6 w-5 flex-none ${tier.mostPopular ? "text-indigo-400" : "text-indigo-600"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant={tier.mostPopular ? "default" : "outline"}
                className={`mt-8 w-full ${tier.mostPopular ? "bg-indigo-500 hover:bg-indigo-400 border-none" : ""}`}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
