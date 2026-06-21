import { NextResponse }
from "next/server";

import {
  runResearch,
} from "@/lib/ai/research";

const MAX_QUESTION_LENGTH = 2000;

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;

const requestCounts = new Map<
  string,
  { count: number; resetAt: number }
>();

function isRateLimited(
  ip: string,
): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(
  request: Request,
) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 },
      );
    }

    const body =
      await request.json();

    const question =
      body?.question;

    if (
      !question ||
      typeof question !== "string"
    ) {
      return NextResponse.json(
        {
          error:
            "Question is required and must be a string",
        },
        {
          status: 400,
        },
      );
    }

    const trimmed = question.trim();

    if (
      trimmed.length === 0 ||
      trimmed.length > MAX_QUESTION_LENGTH
    ) {
      return NextResponse.json(
        {
          error:
            `Question must be between 1 and ${MAX_QUESTION_LENGTH} characters`,
        },
        {
          status: 400,
        },
      );
    }

    const result =
      await runResearch(
        trimmed,
      );

    return NextResponse.json(
      result,
    );
  } catch {
    return NextResponse.json(
      {
        error: "Research failed",
      },
      {
        status: 500,
      },
    );
  }
}