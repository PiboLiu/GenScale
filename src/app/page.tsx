import { ProductAdGenerator } from "@/components/generator/product-ad-generator";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-6">
      <div className="mx-auto max-w-7xl">
        <ProductAdGenerator />
        <nav className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-600">
          <a href="/ai-product-video-generator">AI product video generator</a>
          <a href="/shopify-product-video-generator">Shopify product videos</a>
          <a href="/tiktok-product-video-generator">TikTok product ads</a>
          <a href="/ai-video-ad-generator">AI video ads</a>
          <a href="/product-image-to-video">Product image to video</a>
        </nav>
      </div>
    </main>
  );
}
