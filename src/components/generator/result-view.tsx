"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type {
  CreativeConcept,
  CreativePackage,
  Generation,
} from "@/lib/creative-engine/schema";

type ResultPayload = {
  generation: Generation;
  creativePackage?: CreativePackage;
  concept?: CreativeConcept;
};

export function ResultView({ generationId }: { generationId: string }) {
  const [payload, setPayload] = useState<ResultPayload>();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [leadState, setLeadState] = useState<"idle" | "saved">("idle");

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function poll() {
      const response = await fetch(`/api/generations/${generationId}`);
      const body = await response.json();

      if (!active) {
        return;
      }

      if (!response.ok) {
        setError(body.error ?? "Result could not be loaded.");
        return;
      }

      setPayload(body);

      if (body.generation.status === "queued" || body.generation.status === "running") {
        timer = setTimeout(poll, 1200);
      }
    }

    poll().catch((caught) =>
      setError(caught instanceof Error ? caught.message : "Result could not be loaded."),
    );

    return () => {
      active = false;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [generationId]);

  async function captureLead() {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, context: { generationId } }),
    });

    if (response.ok) {
      setLeadState("saved");
    }
  }

  if (error) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6">
        <p className="text-sm text-red-600">{error}</p>
        <Link className="mt-4 text-sm font-semibold text-zinc-950" href="/">
          Back to generator
        </Link>
      </main>
    );
  }

  if (!payload) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6">
        <p className="text-sm text-zinc-600">Loading generation...</p>
      </main>
    );
  }

  const { generation, creativePackage, concept } = payload;
  const ready = generation.status === "succeeded" && generation.outputUrl;

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Result
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-950">
              {creativePackage?.productInput.productName ?? "Generated product ad"}
            </h1>
          </div>
          <Link
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold"
            href="/"
          >
            New ad
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="aspect-[9/16] overflow-hidden rounded-lg bg-zinc-950">
              {ready ? (
                <video
                  className="h-full w-full object-cover"
                  src={generation.outputUrl}
                  controls
                  autoPlay
                  muted
                  loop
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center text-sm text-zinc-300">
                  Video status: {generation.status}
                </div>
              )}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                className={`rounded-md px-4 py-2 text-center text-sm font-semibold ${
                  ready
                    ? "bg-zinc-950 text-white"
                    : "pointer-events-none bg-zinc-300 text-zinc-500"
                }`}
                href={generation.outputUrl}
                download
              >
                Download MP4
              </a>
              <button
                className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold"
                type="button"
                onClick={() => navigator.clipboard.writeText(concept?.caption ?? "")}
              >
                Copy caption
              </button>
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Selected angle
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
                {concept?.hook ?? "Creative concept"}
              </h2>
              <div className="mt-4 grid gap-3">
                {concept?.storyboard.map((scene) => (
                  <div key={scene.scene} className="rounded-md bg-zinc-50 p-3">
                    <p className="text-xs font-semibold text-zinc-500">
                      Scene {scene.scene}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-zinc-800">{scene.visual}</p>
                    <p className="mt-1 text-sm font-medium text-emerald-700">
                      {scene.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-zinc-950">Caption</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{concept?.caption}</p>
              <h3 className="mt-4 text-sm font-semibold text-zinc-950">CTA</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{concept?.cta}</p>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-zinc-950">
                Save this result
              </h3>
              <div className="mt-3 flex gap-2">
                <input
                  className="min-w-0 flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button
                  className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950"
                  type="button"
                  onClick={captureLead}
                >
                  Save
                </button>
              </div>
              {leadState === "saved" ? (
                <p className="mt-2 text-sm text-emerald-700">Email captured.</p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
