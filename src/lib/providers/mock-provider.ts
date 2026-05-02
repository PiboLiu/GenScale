import type {
  GenerationInput,
  GenerationJob,
  VideoProvider,
} from "@/lib/providers/video-provider";

export class MockVideoProvider implements VideoProvider {
  name = "mock-video-provider";

  async create(input: GenerationInput): Promise<GenerationJob> {
    void input;

    return {
      provider: this.name,
      providerJobId: crypto.randomUUID(),
      status: "queued",
      costUsd: 0,
    };
  }

  async getStatus(providerJobId: string): Promise<GenerationJob> {
    return {
      provider: this.name,
      providerJobId,
      status: "succeeded",
      outputUrl:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      costUsd: 0,
    };
  }
}
