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
