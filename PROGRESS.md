# Project Progress: GenScale (ProductAd Studio)

**Date:** 2026-04-30
**Status:** Functional MVP Ready (Real Service Integration)
**Base Repo:** 103.FitMirror

## 1. Project Overview
Transitioned from a virtual try-on tool (FitMirror) to a specialized **AI Product Ad Generator**. The tool helps solo ecommerce sellers turn a single product image into a complete ad creative package (3 hooks/angles + 1 vertical 9:16 video).

## 2. Technical Stack & Integrations

### 🧠 Creative Engine (LLM)
- **Provider:** [Coze.cn](https://www.coze.cn)
- **Model:** Gemini-1.5-Pro / Doubao-2.0-Pro (via Coze dispatcher)
- **Bot ID:** `7634454865636605986` (ProductAd-Creative-Engine)
- **Function:** Takes structured product input and returns a validated JSON package with 3 ad angles (Pain, Benefit, Urgency).

### 🎬 Video Generation
- **Provider:** Coze API + **Kling AI (可灵)**
- **Bot ID:** `7634455178074472498` (ProductAd-Video-Generator)
- **Capabilities:** Supports `img2video` (Image-to-Video) and `text2video`.
- **Format:** 9:16 Vertical, 10-15 seconds.

### 🗄️ Persistence & Storage (Supabase)
- **Database:** PostgreSQL on Supabase.
- **Tables:** `product_inputs`, `creative_packages`, `creative_concepts`, `generations`.
- **Storage:** Supabase Storage Bucket `product-ad-media` (Public).
- **ORM/Client:** `@supabase/supabase-js`.

## 3. Completed Milestones
- [x] **Project Scaffolding**: Next.js 15 App Router + Tailwind CSS + shadcn/ui.
- [x] **API Layer**: Implemented endpoints for uploads, package generation, and polling.
- [x] **Coze Bot Orchestration**: Automatically created and configured bots via Python client.
- [x] **Real-time Persistence**: Migrated from memory-store to Supabase.
- [x] **User Identity**: Integrated Supabase Auth (Google OAuth) with automatic profile creation.
- [x] **Credits System**: Initial 10-credit grant for new users.
- [x] **Domain**: Purchased `genscale.xyz` (Spaceship).
- [x] **Deployment**: Production deployment to Vercel successful.
- [x] **Landing Page**: Implemented high-conversion "7-section" layout.

## 4. Gap Analysis (vs. Roadmap Phase 1 & 2)
- [ ] **Credit Consumption**: Deduct 1 credit per video generation job.
- [ ] **Asset Management**: User dashboard to view and download history.
- [ ] **Payment**: Integrate Creem.io checkout links.
- [ ] **SEO Content**: Populate pages with actual keywords and `sitemap.ts`.

## 5. Phase 3: Launch Readiness Plan
1. **User Identity**: Integrate Supabase Auth (Google) to track generations per user.
2. **Monetization**:
   - Implement `credits_transactions` table.
   - Integrate Creem.io for credit purchases.
   - Add backend credit-check logic before video generation.
3. **Growth Engine**:
   - Redesign Homepage to follow the "Pollo.ai" shelf-style / multi-section layout.
   - Populate SEO pages with high-value keywords (TikTok, Shopify, etc.).
   - Add `sitemap.ts` and `robots.ts`.
4. **Ops**: Configure custom domain and final production environment variables.

## 6. Known Reference Points
- **SQL Schema**: Found in `supabase/migrations/20260430_initial_schema.sql`.
- **Bot Logic**: Integrated into `src/lib/providers/coze-client.ts`.
- **Product Design**: Detailed in `docs/ai-product-ad-generator-design.md`.

---
*Maintained by Gemini CLI Agent*
