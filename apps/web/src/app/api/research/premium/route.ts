import { NextResponse }
from "next/server";

export async function POST() {
  return NextResponse.json({
    riskLevel: "Medium",

    marketSignals: [
      "Increasing institutional adoption",
      "Growing onchain activity",
      "Positive macro liquidity",
    ],

    strategy:
      "Scale into positions gradually and manage risk carefully.",
  });
}