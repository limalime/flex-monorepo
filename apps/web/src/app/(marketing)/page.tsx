import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { LiveMarkets } from "@/components/home/live-markets";
import { AgentFlow } from "@/components/home/agent-flow";
import { AgentPerformance } from "@/components/home/agent-performance";
import { CTA } from "@/components/home/cta";
import { Stack } from "@/components/home/stack";
import { Footer } from "@/components/home/footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <LiveMarkets />
      <AgentFlow />
      <AgentPerformance />
      <Stack />
      <CTA />
      <Footer />
    </main>
  );
}