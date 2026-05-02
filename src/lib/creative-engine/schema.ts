export type AdAngle = "pain" | "benefit" | "urgency";

export type ProductInput = {
  productName: string;
  category: string;
  sellingPoints: string[];
  targetAudience: string;
  offer: string;
  platform: "tiktok_reels_meta";
  tone: "direct_response" | "premium" | "playful" | "problem_solution";
  imageAssetId?: string;
};

export type CreativeConcept = {
  id: string;
  angle: AdAngle;
  hook: string;
  storyboard: Array<{
    scene: number;
    visual: string;
    text: string;
  }>;
  caption: string;
  cta: string;
  thumbnailPrompt: string;
  videoPrompt: string;
  rank: number;
};

export type CreativePackage = {
  id: string;
  productInput: ProductInput;
  status: "ready" | "failed";
  language: "en";
  platform: "tiktok_reels_meta";
  concepts: CreativeConcept[];
  createdAt: string;
};

export type Generation = {
  id: string;
  packageId: string;
  conceptId: string;
  provider: string;
  providerJobId: string;
  status: "queued" | "running" | "succeeded" | "failed";
  outputUrl?: string;
  costUsd?: number;
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
};
