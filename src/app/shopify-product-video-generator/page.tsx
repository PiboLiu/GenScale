import { SeoPage } from "@/components/layout/seo-page";

export default function Page() {
  return (
    <SeoPage
      eyebrow="Shopify product video generator"
      title="Turn Shopify product photos into short video ads"
      description="Use product names, offers, and selling points to draft practical English ad concepts for small ecommerce stores."
      points={[
        "Works with basic product photos and plain selling points.",
        "Outputs captions and CTAs that can be reused in ad managers or store campaigns.",
        "The MVP is web-first, with Shopify integration deferred until demand is proven.",
      ]}
    />
  );
}
