import { featuredMarkets } from "@/lib/mock/markets";

export function MarketPreview() {
  const market = featuredMarkets[0];
  const market1 = featuredMarkets[1];

  return (
    <>
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
          <div>
            <div className="mb-1 flex justify-between">
              <span>YES</span>
              <span>{market.yesProbability}%</span>
            </div>
            <div className="h-2 rounded-full bg-indigo-200">
              <div
                className="h-2 rounded-full bg-indigo-500"
                style={{ width: `${market.yesProbability}%` }}
              />
            </div>
          </div>

          <div>
            <div className="mb-1 flex justify-between">
              <span>NO</span>
              <span>{market.noProbability}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-slate-500"
                style={{ width: `${market.noProbability}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between">
            <span>Volume</span>
            <span>{market.volume}</span>
          </div>
        </div>
      </div>
    </>
  );
}