import { featuredMarkets } from "@/lib/mock/markets";
import { ProbabilityBar } from "@/components/shared/probability-bar";

export function MarketPreview() {
  const market = featuredMarkets[0];

  return (
    <div
      className="
        rounded-3xl
        border border-indigo-500/50
        bg-background
        p-6
        shadow-xl
        shadow-indigo-400/50
        hover:shadow-indigo-300
      "
    >
      <p
        className="
          mb-6
          text-lg
          font-semibold
        "
      >
        {market.question}
      </p>

      <div className="space-y-4">
        <ProbabilityBar
          label="YES"
          probability={market.yesProbability}
          barColor="bg-indigo-500"
          trackColor="bg-indigo-200"
        />

        <ProbabilityBar
          label="NO"
          probability={market.noProbability}
          barColor="bg-slate-500"
          trackColor="bg-slate-200"
        />
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between">
          <span>Volume</span>
          <span>{market.volume}</span>
        </div>
      </div>
    </div>
  );
}