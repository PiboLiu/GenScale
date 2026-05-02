import { SeoPage } from "@/components/layout/seo-page";

export default function Page() {
  return (
    <SeoPage
      eyebrow="AI video ad generator"
      title="Generate video ad packages, not only clips"
      description="ProductAd Studio turns product input into strategy, copy, storyboard, CTA, and a rendered mock video result."
      points={[
        "The creative package remains useful even when video generation needs another retry.",
        "Provider adapters keep the product ready for fal.ai, Replicate, or another video API.",
        "Analytics events are planned around the full conversion funnel.",
      ]}
    />
  );
}
