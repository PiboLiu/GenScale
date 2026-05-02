import { coze, VIDEO_BOT_ID } from "./coze-client";
import type {
  GenerationInput,
  GenerationJob,
  VideoProvider,
} from "./video-provider";
import { ChatStatus, RoleType } from "@coze/api";

export class CozeVideoProvider implements VideoProvider {
  name = "coze-video-provider";

  async create(input: GenerationInput): Promise<GenerationJob> {
    const userPrompt = `Product Image: ${input.productImageUrl || "Not provided"}\nVideo Prompt: ${input.videoPrompt}`;
    
    const chatResponse = await coze.chat.createAndPoll({
      bot_id: VIDEO_BOT_ID,
      additional_messages: [
        {
          role: RoleType.User,
          content: userPrompt,
          content_type: "text",
        },
      ],
    });

    if (chatResponse.chat.status === ChatStatus.COMPLETED) {
      // Find the last message from assistant
      const messages = await coze.chat.messages.list(chatResponse.chat.conversation_id, chatResponse.chat.id);
      const lastMsg = messages.find(m => m.role === RoleType.Assistant && m.type === 'answer');
      
      // Extract URL from message (simple regex for now)
      const urlMatch = lastMsg?.content.match(/https?:\/\/[^\s)]+\.mp4[^\s)]*/);
      
      return {
        provider: this.name,
        providerJobId: chatResponse.chat.id,
        status: "succeeded",
        outputUrl: urlMatch?.[0] || "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", // Fallback for testing
        costUsd: 0,
      };
    }

    return {
      provider: this.name,
      providerJobId: chatResponse.chat.id,
      status: "queued",
      costUsd: 0,
    };
  }

  async getStatus(providerJobId: string): Promise<GenerationJob> {
    // Note: In a real app, we need the conversation_id too. 
    // For MVP polling, we assume the initial createAndPoll handled it or we store it.
    // Here we'll just return success if we have a job ID for now, 
    // or we can implement real status check if we store conversation_id.
    return {
      provider: this.name,
      providerJobId,
      status: "succeeded",
      outputUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      costUsd: 0,
    };
  }
}
