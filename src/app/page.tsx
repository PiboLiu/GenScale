import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { FAQ } from "@/components/marketing/faq";
import { Pricing } from "@/components/marketing/pricing";
import { ProductAdGenerator } from "@/components/generator/product-ad-generator";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Generator Section (The core functional tool) */}
      <section id="generator" className="bg-zinc-50 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Try the Generator
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Upload an image and see the magic happen. No credit required for the first 10 creative packages.
            </p>
          </div>
          <ProductAdGenerator />
        </div>
      </section>

      {/* 3. Features Section */}
      <Features />
      
      <Separator />

      {/* 4. Use Cases (Integrated into marketing flow) */}
      <section className="py-24 sm:py-32 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Dominate Every Platform
            </h2>
            <p className="mt-6 text-lg leading-8 text-indigo-100">
              Whether you're scaling a Shopify store, a TikTok shop, or running high-budget Meta ads, GenScale gives you the creative edge to maintain a low CPA.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {['TikTok Shop', 'Facebook Ads', 'Instagram Reels', 'YouTube Shorts'].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm border border-white/20">
                <span className="text-xl font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pricing Section */}
      <Pricing />

      {/* 6. FAQ Section */}
      <FAQ />

      {/* 7. Footer (Simplified) */}
      <footer className="bg-white py-12 border-t border-zinc-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} GenScale AI. All rights reserved.
          </p>
          <nav className="mt-6 flex justify-center flex-wrap gap-6 text-sm text-zinc-600">
            <a href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
