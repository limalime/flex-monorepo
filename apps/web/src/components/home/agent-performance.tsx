import { Container } from "@/components/shared/container";

import { Stats } from "./stats";
import { Leaderboard } from "./leaderboard";
import { PerformanceChart } from "./performance-chart";
import { Reveal } from "@/components/shared/reveal";

export function AgentPerformance() {
  return (
    <section
    id="agent-performance"
    className="py-24">
      <Container>
        <Reveal>
        <div className="mb-12">
          <h2 className="flex justify-center text-4xl font-bold">
            AI Performance
          </h2>

          <p className="mt-4 text-muted-foreground flex text-center">
            Monitor autonomous agents and
            track performance across markets.
          </p>
        </div>

        <Stats />

        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <PerformanceChart />
          </div>

          <Leaderboard />
        </div>
        </Reveal>
      </Container>
    </section>
  );
}