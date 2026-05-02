import { CozeAPI, COZE_CN_BASE_URL } from "@coze/api";

const clientId = process.env.COZE_CLIENT_ID;
const publicKeyId = process.env.COZE_PUBLIC_KEY_ID;
const privateKey = process.env.COZE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!clientId || !publicKeyId || !privateKey) {
  console.warn("Coze credentials missing in environment variables.");
}

export const coze = new CozeAPI({
  baseURL: process.env.COZE_API_BASE || COZE_CN_BASE_URL,
  auth: {
    type: "jwt",
    clientId: clientId || "",
    publicKeyId: publicKeyId || "",
    privateKey: privateKey || "",
  },
});

export const CREATIVE_BOT_ID = process.env.COZE_CREATIVE_BOT_ID || "";
export const VIDEO_BOT_ID = process.env.COZE_VIDEO_BOT_ID || "";
