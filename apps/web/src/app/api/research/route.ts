import { NextResponse }
from "next/server";

import {
  runResearch,
} from "@/lib/ai/research";

export async function POST(
  request: Request,
) {
  try {
    const body =
      await request.json();

    const question =
      body?.question;

    if (!question) {
      return NextResponse.json(
        {
          error:
            "Question is required",
        },
        {
          status: 400,
        },
      );
    }

    const result =
      await runResearch(
        question,
      );

    return NextResponse.json(
      result,
    );
  } catch (error) {
    console.error(
      "RESEARCH ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Research failed",
      },
      {
        status: 500,
      },
    );
  }
}