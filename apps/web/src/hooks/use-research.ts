"use client";

import { useState } from "react";

export type ResearchResult = {
  recommendation: string;

  confidence: number;

  summary: string;

  bullCase: string[];

  bearCase: string[];

  premium?: {
    riskLevel: string;

    marketSignals: string[];

    strategy: string;
  };
};

export function useResearch() {
  const [
    result,
    setResult,
  ] =
    useState<
      ResearchResult | null
    >(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string>();

  async function run(
    question: string,
  ) {
    try {
      setError(undefined);

      setIsLoading(true);

      const response =
        await fetch(
          "/api/research",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                question,
              }),
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Research failed",
        );
      }

      setResult(data);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unknown error",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return {
    result,
    error,
    run,
    isLoading,
  };
}