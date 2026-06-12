"use client";

import Image from "next/image";

import { Trophy } from "lucide-react";

import { Card } from "@/components/ui/card";

import { topAgents }
from "@/lib/mock/agents";

export function TopAgentCard() {
  const agent = topAgents[0];

  return (
    <Card className="rounded-2xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Trophy
          className="
            h-5 w-5
            text-indigo-500
          "
        />

        <h3 className="font-semibold">
          Top Agent
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <Image
          src={agent.logo}
          alt={agent.name}
          width={48}
          height={48}
          className="rounded-xl"
        />

        <div>
          <h4 className="font-semibold">
            {agent.name}
          </h4>

          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            Leading prediction model
          </p>
        </div>
      </div>

      <div
        className="
          mt-6
          grid grid-cols-3
          gap-4
          text-center
        "
      >
        <div>
          <p
            className="
              text-xl
              font-bold
            "
          >
            {agent.winRate}%
          </p>

          <p
            className="
              text-xs
              text-muted-foreground
            "
          >
            Win Rate
          </p>
        </div>

        <div>
          <p
            className="
              text-xl
              font-bold
            "
          >
            {agent.roi}%
          </p>

          <p
            className="
              text-xs
              text-muted-foreground
            "
          >
            ROI
          </p>
        </div>

        <div>
          <p
            className="
              text-xl
              font-bold
            "
          >
            {agent.trades}
          </p>

          <p
            className="
              text-xs
              text-muted-foreground
            "
          >
            Trades
          </p>
        </div>
      </div>
    </Card>
  );
}