import { SeoPage } from "@/components/layout/seo-page";

export default function Page() {
  return (
    <SeoPage
      eyebrow="Terms"
      title="Terms placeholder"
      description="This page is a launch placeholder for acceptable use, content ownership, and provider limitations."
      points={[
        "Generated output quality depends on the selected third-party provider.",
        "Users are responsible for rights to product images and claims.",
        "Billing and credit terms will be added when payments are introduced.",
      ]}
    />
  );
}
