import type { LucideIcon } from "lucide-react";

type CardHeaderProps = {
  icon: LucideIcon;
  title: string;
};

export function CardHeader({
  icon: Icon,
  title,
}: CardHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon className="h-5 w-5 text-indigo-500" />

      <h3 className="font-semibold">{title}</h3>
    </div>
  );
}
