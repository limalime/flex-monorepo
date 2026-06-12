import { Container } from "@/components/shared/container";
import { featuredMarkets } from "@/lib/mock/markets";
import { Reveal } from "@/components/shared/reveal";
import { MarketCard } from "./market-card";
import { CircleDot } from "lucide-react";

export function LiveMarkets() {
  return (
    <section
    id="live-markets"
    className="py-24">
      <Container>
        <Reveal>
        <div className="flex mb-12 justify-center">
          <h2 className="flex items-center gap-2 text-4xl font-bold">
            <CircleDot className="text-indigo-500" />
            Live Market
          </h2>
        </div>

        <div>
          <p className="mt-4 text-muted-foreground">
            Explore trending prediction markets
            powered by Flex.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredMarkets.map((market) => (
            <MarketCard
              key={market.id}
              question={market.question}
              yesProbability={market.yesProbability}
              noProbability={market.noProbability}
              volume={market.volume}
              category={market.category}
            />
          ))}
        </div>
        </Reveal>
      </Container>
    </section>
  );
}