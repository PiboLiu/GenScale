export type GenerationInput = {
  productImageUrl?: string;
  videoPrompt: string;
  aspectRatio: "9:16";
  durationSeconds: 10 | 15;
  seed?: number;
};

export type GenerationJob = {
  provider: string;
  providerJobId: string;
  status: "queued" | "running" | "succeeded" | "failed";
  outputUrl?: string;
  costUsd?: number;
  errorMessage?: string;
};

export interface VideoProvider {
  name: string;
  create(input: GenerationInput): Promise<GenerationJob>;
  getStatus(providerJobId: string): Promise<GenerationJob>;
}
