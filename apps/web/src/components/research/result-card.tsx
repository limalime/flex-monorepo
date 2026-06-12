"use client";

import { Card } from "@/components/ui/card";

import type {
  ResearchResult,
} from "@/hooks/use-research";

type Props = {
  result: ResearchResult;
};

export function ResultCard({
  result,
}: Props) {
  return (
    <Card className="rounded-2xl p-6">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Recommendation
          </p>

          <p
            className={
              result.recommendation ===
              "YES"
                ? "text-3xl font-bold text-green-500"
                : "text-3xl font-bold text-red-500"
            }
          >
            {result.recommendation}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Confidence
          </p>

          <p className="text-xl font-semibold">
            {result.confidence}%
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Summary
          </p>

          <p>{result.summary}</p>
        </div>

        <div>
          <h3 className="font-semibold">
            Bull Case
          </h3>

          <ul className="mt-2 list-disc pl-5">
            {result.bullCase.map(
              (item) => (
                <li key={item}>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">
            Bear Case
          </h3>

          <ul className="mt-2 list-disc pl-5">
            {result.bearCase.map(
              (item) => (
                <li key={item}>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
}