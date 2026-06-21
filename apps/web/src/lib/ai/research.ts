import { env } from "@/lib/config/env";

const openRouterApiKey =
  process.env.OPENROUTER_API_KEY;

if (!openRouterApiKey) {
  throw new Error(
    "Missing OPENROUTER_API_KEY",
  );
}

type ResearchResult = {
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

export async function runResearch(
  question: string,
): Promise<ResearchResult> {
  const response = await fetch(
    `${env.openRouterApiUrl}/chat/completions`,
    {
      method: "POST",

      headers: {
        Authorization:
          `Bearer ${openRouterApiKey}`,

        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        model:
          "openai/gpt-oss-20b:free",

        messages: [
          {
            role: "system",

            content: `
You are a prediction market analyst.

Confidence must be an integer from 0-100.
Summary must be under 100 words.

Bull case and bear case must contain exactly 3 items.

marketSignals must contain exactly 3 items.

strategy must be under 60 words.

riskLevel must be Low, Medium, or High.

Return ONLY valid JSON.

{
  "recommendation": "YES",
  "confidence": 75,
  "summary": "Short summary",
  "bullCase": [],
  "bearCase": [],
  "premium": {
    "riskLevel": "Medium",
    "marketSignals": [],
    "strategy": "Short strategy"
  }
}
            `,
          },

          {
            role: "user",

            content: question,
          },
        ],

        temperature: 0.3,
      }),
    },
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `Research request failed: ${errorText}`,
    );
  }

  const data =
    await response.json();

  let content =
    data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error(
      "OpenRouter returned empty content",
    );
  }

  if (Array.isArray(content)) {
    content =
      content
        .map(
          (item: any) =>
            item.text ?? "",
        )
        .join("");
  }

  const cleaned =
    String(content)
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

  try {
    return JSON.parse(
      cleaned,
    ) as ResearchResult;
  } catch {
    throw new Error(
      `Failed to parse research response as JSON: ${cleaned.slice(0, 200)}`,
    );
  }
}