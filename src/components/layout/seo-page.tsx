import Link from "next/link";

export function SeoPage({
  eyebrow,
  title,
  description,
  points,
}: {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link className="text-sm font-semibold text-emerald-700" href="/">
          ProductAd Studio
        </Link>
        <p className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-950">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
          {description}
        </p>
        <div className="mt-8 grid gap-3">
          {points.map((point) => (
            <div
              className="rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-700"
              key={point}
            >
              {point}
            </div>
          ))}
        </div>
        <Link
          className="mt-8 inline-flex rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white"
          href="/"
        >
          Open generator
        </Link>
      </div>
    </main>
  );
}
