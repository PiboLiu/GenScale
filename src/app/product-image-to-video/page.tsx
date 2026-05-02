import { SeoPage } from "@/components/layout/seo-page";

export default function Page() {
  return (
    <SeoPage
      eyebrow="Product image to video"
      title="Convert a product image into a vertical ad flow"
      description="Start with one image and a few product facts, then build an ad-ready story for social placements."
      points={[
        "Upload product media, describe what sells, and generate three angles.",
        "Select the best angle before starting the expensive video step.",
        "Download the generated media and reuse the caption or CTA.",
      ]}
    />
  );
}
