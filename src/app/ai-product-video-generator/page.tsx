import { SeoPage } from "@/components/layout/seo-page";

export default function Page() {
  return (
    <SeoPage
      eyebrow="AI product video generator"
      title="Create ecommerce product videos from one image"
      description="Generate English ad hooks, a short storyboard, captions, CTAs, and a vertical product video for TikTok, Reels, and Meta placements."
      points={[
        "Built around product selling points instead of generic video prompts.",
        "Creates three ad angles before you spend generation time on the final video.",
        "Designed for solo ecommerce sellers who need usable creative quickly.",
      ]}
    />
  );
}
