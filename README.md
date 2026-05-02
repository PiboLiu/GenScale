# ProductAd Studio

AI ecommerce ad creative generator for solo cross-border sellers.

## Product Loop

Product image + product fields -> 3 English ad concepts -> selected 9:16 video job -> result page with MP4 preview, caption, CTA, and download.

## Current Implementation

This repository now contains a local Next.js MVP skeleton:

- Generator-first home page.
- Product image upload validation endpoint.
- Mock creative engine that returns pain, benefit, and urgency concepts.
- Mock video provider behind a provider adapter.
- Polling result page.
- Lead capture endpoint.
- Five SEO pages plus privacy, terms, and contact placeholders.

The app intentionally uses mock generation first so the full flow can be tested before adding external API keys.

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Next Integration Steps

1. Replace the mock creative engine with an LLM structured-output call.
2. Replace `MockVideoProvider` with fal.ai, Replicate, or another video provider.
3. Add Supabase persistence for product inputs, creative packages, concepts, generations, assets, and analytics events.
4. Add R2 or Supabase Storage for generated media when provider URLs are not durable.
5. Deploy to Vercel and collect seller feedback.

## Docs

- `docs/ai-product-ad-generator-design.md`
- `docs/technical-architecture.md`
