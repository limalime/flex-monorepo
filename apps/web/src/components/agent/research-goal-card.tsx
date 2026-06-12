"use client";

import { Search } from "lucide-react";

import { Card } from "@/components/ui/card";

export function ResearchGoalCard() {
  return (
    <Card className="rounded-2xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Search
          className="
            h-5 w-5
            text-indigo-500
          "
        />

        <h3 className="font-semibold">
          Research Goal
        </h3>
      </div>

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