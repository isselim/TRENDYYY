import { TrendData, KeywordAnalysis } from '../types';
import { getLocationMultiplier, getKenyaMarketSectors } from './kenyaData';

export class TrendAnalyzer {
  static generateMockTrendData(keyword: string, days: number = 30, location?: string): TrendData[] {
    const data: TrendData[] = [];
    const baseValue = Math.random() * 100;
    const locationMultiplier = location ? getLocationMultiplier(location) : 1.0;
    let currentValue = baseValue;
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      // Add some realistic volatility based on keyword characteristics
      const volatility = this.getKeywordVolatility(keyword);
      const change = (Math.random() - 0.5) * volatility;
      currentValue = Math.max(0, Math.min(100, (currentValue + change) * locationMultiplier));
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(currentValue * 100) / 100,
        volume: Math.floor(Math.random() * 10000 * locationMultiplier) + 1000,
        location
      });
    }
    
    return data;
  }

  static getKeywordVolatility(keyword: string): number {
    const volatileKeywords = ['crypto', 'stock', 'meme', 'viral', 'breaking', 'election', 'politics', 'NSE'];
    const stableKeywords = ['health', 'education', 'food', 'home', 'agriculture', 'tea', 'coffee'];
    const kenyaVolatile = ['shilling', 'fuel prices', 'maize prices', 'election', 'strike'];
    
    const lowerKeyword = keyword.toLowerCase();
    
    if (volatileKeywords.some(vk => lowerKeyword.includes(vk)) || 
        kenyaVolatile.some(kv => lowerKeyword.includes(kv))) {
      return 15; // High volatility
    } else if (stableKeywords.some(sk => lowerKeyword.includes(sk))) {
      return 3; // Low volatility
    }
    
    return 8; // Medium volatility
  }

  static analyzeTrend(data: TrendData[]): KeywordAnalysis['trendSummary'] {
    if (data.length === 0) return {
      direction: 'stable',
      growthRate: 0,
      peakValue: 0,
      averageValue: 0
    };

    const values = data.map(d => d.value);
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    const growthRate = ((secondAvg - firstAvg) / firstAvg) * 100;
    const peakValue = Math.max(...values);
    const averageValue = values.reduce((a, b) => a + b, 0) / values.length;
    
    let direction: 'increasing' | 'decreasing' | 'volatile' | 'stable';
    
    if (Math.abs(growthRate) < 5) {
      direction = 'stable';
    } else if (growthRate > 5) {
      direction = 'increasing';
    } else if (growthRate < -5) {
      direction = 'decreasing';
    } else {
      direction = 'volatile';
    }
    
    // Check for volatility
    const variance = values.reduce((acc, val) => acc + Math.pow(val - averageValue, 2), 0) / values.length;
    const standardDeviation = Math.sqrt(variance);
    
    if (standardDeviation > averageValue * 0.3) {
      direction = 'volatile';
    }

    return {
      direction,
      growthRate: Math.round(growthRate * 100) / 100,
      peakValue: Math.round(peakValue * 100) / 100,
      averageValue: Math.round(averageValue * 100) / 100
    };
  }

  static predictTrend(data: TrendData[], keyword: string): KeywordAnalysis['prediction'] {
    if (data.length < 7) {
      return {
        direction: 'sideways',
        confidence: 'low',
        estimatedChange: 0,
        timeframe: '7-30 days'
      };
    }

    const recentData = data.slice(-7);
    const values = recentData.map(d => d.value);
    
    // Simple linear regression
    const n = values.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const xMean = x.reduce((a, b) => a + b, 0) / n;
    const yMean = values.reduce((a, b) => a + b, 0) / n;
    
    const numerator = x.reduce((acc, xi, i) => acc + (xi - xMean) * (values[i] - yMean), 0);
    const denominator = x.reduce((acc, xi) => acc + Math.pow(xi - xMean, 2), 0);
    
    const slope = denominator !== 0 ? numerator / denominator : 0;
    const estimatedChange = slope * 7; // 7-day prediction
    
    let direction: 'up' | 'down' | 'sideways';
    let confidence: 'high' | 'medium' | 'low';
    
    if (Math.abs(estimatedChange) < 2) {
      direction = 'sideways';
    } else if (estimatedChange > 0) {
      direction = 'up';
    } else {
      direction = 'down';
    }
    
    // Calculate confidence based on data consistency and volatility
    const volatility = this.getKeywordVolatility(keyword);
    const dataConsistency = 1 - (Math.abs(slope) / Math.max(...values));
    
    if (dataConsistency > 0.8 && volatility < 10) {
      confidence = 'high';
    } else if (dataConsistency > 0.6 && volatility < 15) {
      confidence = 'medium';
    } else {
      confidence = 'low';
    }

    return {
      direction,
      confidence,
      estimatedChange: Math.round(estimatedChange * 100) / 100,
      timeframe: '7-30 days'
    };
  }

  static getMarketSectors(keyword: string): string[] {
    return getKenyaMarketSectors(keyword);
  }

  static generateSocialMediaData(keyword: string, location?: string): KeywordAnalysis['signals']['socialMedia'] {
    const locationMultiplier = location ? getLocationMultiplier(location) : 1.0;
    const baseEngagement = Math.random() * 1000000 * locationMultiplier;
    const sentiment = Math.random() * 200 - 100; // -100 to 100
    const mentions = Math.floor(baseEngagement * (0.1 + Math.random() * 0.3));

    return {
      sentiment: Math.round(sentiment * 100) / 100,
      mentions,
      engagement: Math.floor(baseEngagement)
    };
  }

  static calculateCorrelation(data1: TrendData[], data2: TrendData[]): number {
    if (data1.length !== data2.length || data1.length === 0) return 0;

    const values1 = data1.map(d => d.value);
    const values2 = data2.map(d => d.value);

    const mean1 = values1.reduce((a, b) => a + b, 0) / values1.length;
    const mean2 = values2.reduce((a, b) => a + b, 0) / values2.length;

    let numerator = 0;
    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < values1.length; i++) {
      const diff1 = values1[i] - mean1;
      const diff2 = values2[i] - mean2;
      numerator += diff1 * diff2;
      sum1 += diff1 * diff1;
      sum2 += diff2 * diff2;
    }

    const denominator = Math.sqrt(sum1 * sum2);
    return denominator === 0 ? 0 : numerator / denominator;
  }
}