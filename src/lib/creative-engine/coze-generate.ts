import { coze, CREATIVE_BOT_ID } from "../providers/coze-client";
import type { CreativePackage, ProductInput } from "./schema";
import { ChatStatus, RoleType } from "@coze/api";

export async function generateCozeCreativePackage(
  productInput: ProductInput,
): Promise<CreativePackage> {
  const userPrompt = JSON.stringify(productInput);
  
  const chat = await coze.chat.createAndPoll({
    bot_id: CREATIVE_BOT_ID,
    additional_messages: [
      {
        role: RoleType.User,
        content: userPrompt,
        content_type: "text",
      },
    ],
  });

  if (chat.status === ChatStatus.COMPLETED) {
    const messages = await coze.chat.messages.list(chat.conversation_id, chat.id);
    const lastMsg = messages.find(m => m.role === RoleType.Assistant && m.type === 'answer');
    
    if (lastMsg) {
      try {
        // Find JSON block in message
        const jsonMatch = lastMsg.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const data = JSON.parse(jsonMatch[0]);
          return {
            id: crypto.randomUUID(),
            productInput,
            status: "ready",
            language: "en",
            platform: "tiktok_reels_meta",
            concepts: data.concepts.map((c: any, index: number) => ({
              ...c,
              id: crypto.randomUUID(),
              rank: index,
            })),
            createdAt: new Date().toISOString(),
          };
        }
      } catch (e) {
        console.error("Failed to parse Coze JSON response", e);
      }
    }
  }

  throw new Error("Failed to generate creative package via Coze.");
}
