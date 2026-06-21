"use client";

import { useState } from "react";

import { toast } from "sonner";

import { Card } from "@/components/ui/card";

import { useResearch } from "@/hooks/use-research";

import { fetchPremiumResearch } from "@/lib/x402/premium";

import { ResearchForm } from "./form";

import { ResultCard } from "./result-card";

import { PremiumCard } from "./premium-card";

export function ResearchWorkspace() {
  const { result, error, run, isLoading } = useResearch();

  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const [premiumData, setPremiumData] = useState();

  async function handleUnlock() {
    try {
      const data =
        await fetchPremiumResearch();

      setPremiumData(data);
      setPremiumUnlocked(true);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to unlock premium research",
      );
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card className="rounded-2xl p-6">
        <h1 className="mb-4 text-2xl font-bold">Research Engine</h1>

        <ResearchForm isLoading={isLoading} onSubmit={run} />

        {error && (
          <p className="mt-3 text-sm text-red-500">{error}</p>
        )}
      </Card>

      {result && <ResultCard result={result} />}
      {result && (
        <PremiumCard
          unlocked={premiumUnlocked}
          premium={premiumData}
          onUnlock={handleUnlock}
        />
      )}
    </div>
  );
}
