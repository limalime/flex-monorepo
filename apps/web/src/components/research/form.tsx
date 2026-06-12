"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  isLoading: boolean;
  onSubmit: (
    question: string,
  ) => Promise<void>;
};

export function ResearchForm({
  isLoading,
  onSubmit,
}: Props) {
  const [
    question,
    setQuestion,
  ] = useState("");

  return (
    <div className="space-y-4">
      <textarea
        value={question}
        onChange={(event) =>
          setQuestion(
            event.target.value,
          )
        }
        placeholder="Will BTC reach $100k by 2027?"
        className="
          min-h-32
          w-full
          rounded-xl
          border
          bg-background
          p-4
        "
      />

      <Button
        disabled={
          isLoading ||
          !question.trim()
        }
        onClick={() =>
          onSubmit(question)
        }
        className="
          bg-indigo-500
          hover:bg-indigo-600
        "
      >
        {isLoading
          ? "Researching..."
          : "Run Research"}
      </Button>
    </div>
  );
}