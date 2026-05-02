import { SeoPage } from "@/components/layout/seo-page";

export default function Page() {
  return (
    <SeoPage
      eyebrow="Privacy"
      title="Privacy policy placeholder"
      description="This MVP stores product inputs, generated concepts, and generation state for product testing. Replace this placeholder before public launch."
      points={[
        "Do not upload confidential product assets during early testing.",
        "API keys stay server-side and are not exposed to the browser.",
        "Anonymous outputs can be configured to expire when storage is connected.",
      ]}
    />
  );
}
