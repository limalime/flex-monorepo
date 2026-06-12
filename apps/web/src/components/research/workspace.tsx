"use client";

import { Card } from "@/components/ui/card";

import { useResearch } from "@/hooks/use-research";

import { ResearchForm } from "./form";

import { ResultCard } from "./result-card";

import { PremiumCard } from "./premium-card";

import { useState } from "react";

export function ResearchWorkspace() {
  const { result, run, isLoading } = useResearch();

  const [premiumUnlocked, setPremiumUnlocked] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <Card className="rounded-2xl p-6">
        <h1 className="mb-4 text-2xl font-bold">Research Engine</h1>

        <ResearchForm isLoading={isLoading} onSubmit={run} />
      </Card>

      {result && <ResultCard result={result} />}
      {result && (
        <PremiumCard
          unlocked={premiumUnlocked}
          premium={result.premium}
          onUnlock={() => setPremiumUnlocked(true)}
        />
      )}
    </div>
  );
}
