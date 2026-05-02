export function trackServerEvent(eventName: string, properties?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", eventName, properties ?? {});
  }
}
