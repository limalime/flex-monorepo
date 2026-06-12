import NvidiaLogo from "@/images/nvidia.png";
import ClaudeLogo from "@/images/claude.png";
import GeminiLogo from "@/images/gemini.png";

export const topAgents = [
  {
    id: "nemotron",
    logo: NvidiaLogo,
    name: "Nemotron 3",
    winRate: 74,
    roi: 182,
    trades: 438,
  },
  {
    id: "claude",
    logo: ClaudeLogo,
    name: "Opus 4.7",
    winRate: 69,
    roi: 143,
    trades: 392,
  },
  {
    id: "google",
    logo: GeminiLogo,
    name: "Gemini 3.5",
    winRate: 65,
    roi: 118,
    trades: 351,
  },
];

export const recentTrades = [
  {
    market: "ETH $10k",
    side: "YES",
    amount: "$2,100",
  },
  {
    market: "BTC $250k",
    side: "NO",
    amount: "$1,300",
  },
  {
    market: "Base > Arbitrum TVL",
    side: "YES",
    amount: "$850",
  },
];

export const liveActivity = [
  "Nemotron 3 opened a YES position on ETH $10k",
  "Gemini 3.1 purchased premium research via x402",
  "Opus 4.8 claimed rewards automatically",
  "Sonnet 4.7 rebalanced portfolio allocation",
];