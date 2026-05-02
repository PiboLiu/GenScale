import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics/events";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; context?: unknown };
  const email = String(body.email ?? "").trim();

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  trackServerEvent("email_captured", { email, context: body.context });

  return NextResponse.json({ ok: true });
}
