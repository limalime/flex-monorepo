type ProbabilityBarProps = {
  label: string;
  probability: number;
  barColor: string;
  trackColor: string;
};

export function ProbabilityBar({
  label,
  probability,
  barColor,
  trackColor,
}: ProbabilityBarProps) {
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span>{label}</span>
        <span>{probability}%</span>
      </div>

      <div className={`h-2 rounded-full ${trackColor}`}>
        <div
          className={`h-2 rounded-full ${barColor}`}
          style={{ width: `${probability}%` }}
        />
      </div>
    </div>
  );
}
