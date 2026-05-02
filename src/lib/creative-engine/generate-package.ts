import type {
  AdAngle,
  CreativeConcept,
  CreativePackage,
  ProductInput,
} from "@/lib/creative-engine/schema";

const angleCopy: Record<
  AdAngle,
  { label: string; hookPrefix: string; captionLead: string; ctaLead: string }
> = {
  pain: {
    label: "pain-point",
    hookPrefix: "Still dealing with",
    captionLead: "Turn a daily frustration into a quick win with",
    ctaLead: "Solve it with",
  },
  benefit: {
    label: "benefit",
    hookPrefix: "Make every day easier with",
    captionLead: "Built for shoppers who want practical results,",
    ctaLead: "Try",
  },
  urgency: {
    label: "urgency",
    hookPrefix: "This week only:",
    captionLead: "A simple product upgrade is easier to test while",
    ctaLead: "Shop",
  },
};

function compactText(value: string, fallback: string) {
  return value.trim() || fallback;
}

function makeConcept(
  product: ProductInput,
  angle: AdAngle,
  rank: number,
): CreativeConcept {
  const copy = angleCopy[angle];
  const primaryPoint = compactText(product.sellingPoints[0] ?? "", "clear benefits");
  const secondPoint = compactText(product.sellingPoints[1] ?? "", "easy everyday use");
  const thirdPoint = compactText(product.sellingPoints[2] ?? "", "a cleaner routine");
  const audience = compactText(product.targetAudience, "busy online shoppers");
  const offer = compactText(product.offer, "the launch offer is live");
  const productName = compactText(product.productName, "this product");

  const hook =
    angle === "urgency"
      ? `${copy.hookPrefix} ${offer}`
      : `${copy.hookPrefix} ${primaryPoint}?`;

  return {
    id: crypto.randomUUID(),
    angle,
    hook,
    storyboard: [
      {
        scene: 1,
        visual: `Open with ${audience} facing the exact use case for ${productName}.`,
        text: angle === "pain" ? "This gets annoying fast" : "Start with the problem",
      },
      {
        scene: 2,
        visual: `Show the product clearly while highlighting ${primaryPoint} and ${secondPoint}.`,
        text: primaryPoint,
      },
      {
        scene: 3,
        visual: `End on a clean product shot with ${thirdPoint} and the offer.`,
        text: angle === "urgency" ? offer : thirdPoint,
      },
    ],
    caption: `${copy.captionLead} ${productName}. ${primaryPoint}, ${secondPoint}, and ${thirdPoint} in one short product story.`,
    cta: `${copy.ctaLead} ${productName} today`,
    thumbnailPrompt: `Vertical ecommerce ad cover for ${productName}, clear product focus, ${copy.label} angle, bold short text.`,
    videoPrompt: `Create a 9:16 vertical ecommerce ad for ${productName}. Use a ${copy.label} angle. Show three scenes: problem context, product close-up, final offer. Emphasize ${primaryPoint}, ${secondPoint}, and ${thirdPoint}. Keep on-screen text short and readable on mobile.`,
    rank,
  };
}

export function generateMockCreativePackage(
  productInput: ProductInput,
): CreativePackage {
  const concepts = (["pain", "benefit", "urgency"] as const).map((angle, index) =>
    makeConcept(productInput, angle, index),
  );

  return {
    id: crypto.randomUUID(),
    productInput,
    status: "ready",
    language: "en",
    platform: "tiktok_reels_meta",
    concepts,
    createdAt: new Date().toISOString(),
  };
}
