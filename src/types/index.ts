export interface TrendData {
  date: string;
  value: number;
  volume?: number;
  location?: string;
}

export interface KeywordAnalysis {
  keyword: string;
  location?: string;
  dateRange: string;
  trendSummary: {
    direction: 'increasing' | 'decreasing' | 'volatile' | 'stable';
    growthRate: number;
    peakValue: number;
    averageValue: number;
  };
  signals: {
    googleTrends: TrendData[];
    socialMedia: {
      sentiment: number;
      mentions: number;
      engagement: number;
    };
    historicalPerformance: TrendData[];
  };
  prediction: {
    direction: 'up' | 'down' | 'sideways';
    confidence: 'high' | 'medium' | 'low';
    estimatedChange: number;
    timeframe: string;
  };
  marketSectors: string[];
}

export interface MultiKeywordAnalysis {
  keywords: string[];
  location?: string;
  dateRange: string;
  analyses: KeywordAnalysis[];
  comparison: {
    topPerformer: string;
    mostVolatile: string;
    averageGrowth: number;
    correlations: Array<{
      keyword1: string;
      keyword2: string;
      correlation: number;
    }>;
  };
}

export interface ConfidenceLevel {
  level: 'high' | 'medium' | 'low';
  percentage: number;
  color: string;
}