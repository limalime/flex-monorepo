"use client";

import { Search } from "lucide-react";

import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/shared/card-header";

export function ResearchGoalCard() {
  return (
    <Card className="rounded-2xl p-6">
      <CardHeader icon={Search} title="Research Goal" />

      <div className="space-y-4">
        <div>
          <p
            className="
              text-lg
              font-medium
            "
          >
            Will ETH reach $10,000
            before Q4 2026?
          </p>
        </div>

        <div
          className="
            inline-flex
            rounded-full
            bg-indigo-500/10
            px-3 py-1
            text-sm
            text-indigo-500
          "
        >
          Monitoring
        </div>

        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
          Agent is continuously monitoring
          market conditions, news flow,
          macro signals and prediction
          probabilities.
        </p>
      </div>
    </Card>
  );
}