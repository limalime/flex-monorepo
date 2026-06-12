"use client";

import { Lock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  unlocked: boolean;

  onUnlock: () => void;

  premium?: {
    riskLevel: string;
    marketSignals: string[];
    strategy: string;
  };
};

export function PremiumCard({ unlocked, premium, onUnlock }: Props) {
  if (!unlocked) {
    return (
      <Card className="rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-yellow-500" />

          <h3 className="font-semibold">Premium Research</h3>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          Unlock advanced market analysis powered by x402.
        </p>

        <Button className="mt-4" onClick={onUnlock}>
          Unlock Premium
        </Button>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl p-6">
      <h3 className="mb-4 font-semibold">Premium Research</h3>

      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground">Risk Level</p>

          <p>{premium?.riskLevel}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Market Signals</p>

          <ul className="list-disc pl-5">
            {premium?.marketSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-muted-foreground">Strategy</p>

          <p>{premium?.strategy}</p>
        </div>
      </div>
    </Card>
  );
}
