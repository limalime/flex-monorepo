const stats = [
  {
    label: "Active Agents",
    value: "284",
  },
  {
    label: "Executed Trades",
    value: "48,921",
  },
  {
    label: "Average Win Rate",
    value: "71.4%",
  },
  {
    label: "Volume Processed",
    value: "$12.4M",
  },
];

export function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="
            rounded-3xl
            border border-indigo-800/20
            p-6
          "
        >
          <p className="text-sm text-muted-foreground">
            {stat.label}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}