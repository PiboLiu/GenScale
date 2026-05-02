import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How many credits does it cost to generate a video?",
    answer: "Generating a creative package (3 concepts) is free. Rendering a final 10-second Kling AI video costs 1 credit. New users get 10 free credits to start.",
  },
  {
    question: "Do I own the rights to the videos?",
    answer: "Yes, once you generate a video using your credits, you own full commercial usage rights to that content for ads, social media, and more.",
  },
  {
    question: "What platforms are the videos optimized for?",
    answer: "All videos are generated in 9:16 vertical format, perfect for TikTok, Instagram Reels, Facebook Reels, and YouTube Shorts.",
  },
  {
    question: "How long does it take to generate?",
    answer: "Creative concepts are generated in under 10 seconds. Final video rendering usually takes between 1 to 5 minutes depending on the current queue.",
  },
  {
    question: "Can I use images with text on them?",
    answer: "For the best results, we recommend using clean product photos. While the AI can handle some text, it may sometimes hallucinate letters in the video movement.",
  },
];

export function FAQ() {
  return (
    <section className="bg-zinc-50 py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            Everything you need to know about the product and billing.
          </p>
          <Accordion type="single" collapsible className="mt-12 w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
