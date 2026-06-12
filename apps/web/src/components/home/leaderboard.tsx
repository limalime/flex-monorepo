import { topAgents } from "@/lib/mock/agents";
import Image from "next/image";

export function Leaderboard() {
  return (
    <div
      className="
        rounded-3xl
        border border-indigo-800/20
        p-6
      "
    >
      <h3 className="mb-6 text-xl font-semibold">
        Top Agent Leaderboard
      </h3>

      <div className="space-y-4">
        {topAgents.map((agent, index) => (
          <div
            key={agent.id}
            className="
              flex items-center
              justify-between
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-8 w-8 items-center
                  justify-center rounded-full
                  bg-indigo-500/10
                  text-sm font-semibold
                "
              >
                #{index + 1}
              </div>

              <Image
                src={agent.logo}
                alt={agent.name}
                width={24}
                height={24}
                className="object-contain"
              />

              <div>
                <p className="font-medium">
                  {agent.name}
                </p>

                <p
                  className="
                    text-sm
                    text-muted-foreground
                  "
                >
                  {agent.trades} trades
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                +{agent.roi}%
              </p>

              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                {agent.winRate}% WR
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}