"use client";

import { useMemo, useState } from "react";
import type { CreativeConcept, CreativePackage } from "@/lib/creative-engine/schema";

const sample = {
  productName: "Portable Neck Fan",
  category: "consumer gadgets",
  sellingPoints: ["hands-free cooling", "quiet motor", "10-hour battery"],
  targetAudience: "commuters and outdoor workers",
  offer: "20% off this week",
};

type FormState = typeof sample & {
  tone: "direct_response" | "premium" | "playful" | "problem_solution";
};

const initialForm: FormState = {
  ...sample,
  tone: "direct_response",
};

export function ProductAdGenerator() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [imageName, setImageName] = useState("");
  const [imageAssetId, setImageAssetId] = useState<string>();
  const [creativePackage, setCreativePackage] = useState<CreativePackage>();
  const [selectedConceptId, setSelectedConceptId] = useState<string>();
  const [isCreatingPackage, setIsCreatingPackage] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [error, setError] = useState("");

  const selectedConcept = useMemo(
    () =>
      creativePackage?.concepts.find(
        (concept) => concept.id === selectedConceptId,
      ) ?? creativePackage?.concepts[0],
    [creativePackage, selectedConceptId],
  );

  async function uploadImage(file: File) {
    const data = new FormData();
    data.append("image", file);
    const response = await fetch("/api/uploads/product-image", {
      method: "POST",
      body: data,
    });
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error ?? "Image upload failed.");
    }

    setImageName(file.name);
    setImageAssetId(body.assetId);
  }

  async function createPackage() {
    setError("");
    setIsCreatingPackage(true);

    try {
      const response = await fetch("/api/creative-packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          imageAssetId,
          platform: "tiktok_reels_meta",
        }),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error ?? "Creative package failed.");
      }

      setCreativePackage(body);
      setSelectedConceptId(body.concepts[0]?.id);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unexpected error.");
    } finally {
      setIsCreatingPackage(false);
    }
  }

  async function generateVideo() {
    if (!creativePackage || !selectedConcept) {
      return;
    }

    setError("");
    setIsGeneratingVideo(true);

    try {
      const response = await fetch("/api/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: creativePackage.id,
          conceptId: selectedConcept.id,
        }),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error ?? "Video generation failed.");
      }

      window.location.href = `/results/${body.id}`;
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unexpected error.");
      setIsGeneratingVideo(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Generator
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">
            Product image to English video ad package
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Upload one product image, enter the sales points, then generate
            three ad angles and one ready-to-post vertical video.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-zinc-800">Product image</span>
            <input
              className="mt-2 block w-full rounded-md border border-zinc-300 bg-white p-2 text-sm"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  uploadImage(file).catch((caught) =>
                    setError(caught instanceof Error ? caught.message : "Upload failed."),
                  );
                }
              }}
            />
            {imageName ? (
              <span className="mt-1 block text-xs text-zinc-500">{imageName}</span>
            ) : null}
          </label>

          <TextInput
            label="Product name"
            value={form.productName}
            onChange={(productName) => setForm((current) => ({ ...current, productName }))}
          />
          <TextInput
            label="Category"
            value={form.category}
            onChange={(category) => setForm((current) => ({ ...current, category }))}
          />

          <div>
            <span className="text-sm font-medium text-zinc-800">Selling points</span>
            <div className="mt-2 grid gap-2">
              {form.sellingPoints.map((point, index) => (
                <input
                  key={index}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                  value={point}
                  onChange={(event) => {
                    const sellingPoints = [...form.sellingPoints];
                    sellingPoints[index] = event.target.value;
                    setForm((current) => ({ ...current, sellingPoints }));
                  }}
                />
              ))}
            </div>
          </div>

          <TextInput
            label="Target audience"
            value={form.targetAudience}
            onChange={(targetAudience) =>
              setForm((current) => ({ ...current, targetAudience }))
            }
          />
          <TextInput
            label="Offer"
            value={form.offer}
            onChange={(offer) => setForm((current) => ({ ...current, offer }))}
          />

          <label className="block">
            <span className="text-sm font-medium text-zinc-800">Tone</span>
            <select
              className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
              value={form.tone}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  tone: event.target.value as FormState["tone"],
                }))
              }
            >
              <option value="direct_response">Direct response</option>
              <option value="premium">Premium</option>
              <option value="playful">Playful</option>
              <option value="problem_solution">Problem-solution</option>
            </select>
          </label>

          <button
            className="h-11 w-full rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
            type="button"
            disabled={isCreatingPackage}
            onClick={createPackage}
          >
            {isCreatingPackage ? "Creating ad angles..." : "Generate 3 ad angles"}
          </button>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
      </section>

      <section className="min-h-[640px] rounded-lg border border-zinc-200 bg-zinc-950 p-5 text-white shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Creative package
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Three angles before render</h2>
          </div>
          <span className="rounded-md border border-white/15 px-2.5 py-1 text-xs text-zinc-300">
            Mock MVP
          </span>
        </div>

        {!creativePackage ? (
          <div className="flex h-[520px] items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/[0.03] p-8 text-center text-sm leading-6 text-zinc-400">
            Your generated hooks, storyboard, captions, and CTAs will appear
            here before video generation starts.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-3">
              {creativePackage.concepts.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  selected={concept.id === selectedConcept?.id}
                  onSelect={() => setSelectedConceptId(concept.id)}
                />
              ))}
            </div>

            <button
              className="h-11 w-full rounded-md bg-emerald-400 px-4 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-zinc-500"
              type="button"
              disabled={isGeneratingVideo}
              onClick={generateVideo}
            >
              {isGeneratingVideo ? "Starting video job..." : "Generate selected video"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-800">{label}</span>
      <input
        className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function ConceptCard({
  concept,
  selected,
  onSelect,
}: {
  concept: CreativeConcept;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`rounded-lg border p-4 text-left transition ${
        selected
          ? "border-emerald-300 bg-emerald-300/10"
          : "border-white/15 bg-white/[0.04] hover:border-white/30"
      }`}
      type="button"
      onClick={onSelect}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
          {concept.angle}
        </span>
        <span className="text-xs text-zinc-400">9:16</span>
      </div>
      <h3 className="mt-2 text-lg font-semibold">{concept.hook}</h3>
      <div className="mt-3 grid gap-2">
        {concept.storyboard.map((scene) => (
          <div key={scene.scene} className="rounded-md bg-white/[0.05] p-3">
            <p className="text-xs font-semibold text-zinc-300">Scene {scene.scene}</p>
            <p className="mt-1 text-sm leading-5 text-zinc-200">{scene.visual}</p>
            <p className="mt-1 text-xs text-emerald-200">{scene.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{concept.caption}</p>
      <p className="mt-2 text-sm font-semibold text-white">{concept.cta}</p>
    </button>
  );
}
