type MarketCardProps = {
  question: string;
  yesProbability: number;
  noProbability: number;
  volume: string;
  category: string;
};

export function MarketCard({
  question,
  yesProbability,
  noProbability,
  volume,
  category,
}: MarketCardProps) {
  return (
    <div
      className="
        rounded-3xl
        border border-indigo-800/20
        bg-background
        p-6
        transition-all
        hover:-translate-y-1
        hover:border-indigo-500/30
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className="
            rounded-full
            bg-indigo-500/10
            px-3 py-1
            text-xs
            font-medium
            text-indigo-500
          "
        >
          {category}
        </span>

        <span className="text-sm text-muted-foreground">
          {volume}
        </span>
      </div>

      <h3 className="mb-6 text-lg font-semibold">
        {question}
      </h3>

      <div className="space-y-4">
        <div>
          <div className="mb-2 flex justify-between">
            <span>YES</span>
            <span>{yesProbability}%</span>
          </div>

          <div className="h-2 rounded-full bg-indigo-200">
            <div
              className="h-2 rounded-full bg-indigo-500"
              style={{
                width: `${yesProbability}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span>NO</span>
            <span>{noProbability}%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-slate-500"
              style={{
                width: `${noProbability}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}