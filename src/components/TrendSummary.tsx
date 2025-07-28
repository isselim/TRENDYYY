import React from 'react';
import { TrendingUp as TrendUp, TrendingDown as TrendDown, Activity, Minus } from 'lucide-react';
import { KeywordAnalysis } from '../types';

interface TrendSummaryProps {
  summary: KeywordAnalysis['trendSummary'];
  keyword: string;
}

export function TrendSummary({ summary, keyword }: TrendSummaryProps) {
  const getTrendIcon = () => {
    switch (summary.direction) {
      case 'increasing':
        return <TrendUp className="w-6 h-6 text-green-500" />;
      case 'decreasing':
        return <TrendDown className="w-6 h-6 text-red-500" />;
      case 'volatile':
        return <Activity className="w-6 h-6 text-yellow-500" />;
      default:
        return <Minus className="w-6 h-6 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (summary.direction) {
      case 'increasing':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'decreasing':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'volatile':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDirectionText = () => {
    switch (summary.direction) {
      case 'increasing':
        return 'Trending Upward';
      case 'decreasing':
        return 'Trending Downward';
      case 'volatile':
        return 'High Volatility';
      default:
        return 'Stable Trend';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Trend Summary: "{keyword}"</h3>
        {getTrendIcon()}
      </div>
      
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getTrendColor()}`}>
        {getDirectionText()}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {summary.growthRate > 0 ? '+' : ''}{summary.growthRate}%
          </div>
          <div className="text-sm text-gray-500">Growth Rate</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{summary.peakValue}</div>
          <div className="text-sm text-gray-500">Peak Value</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{summary.averageValue}</div>
          <div className="text-sm text-gray-500">Average</div>
        </div>
      </div>
    </div>
  );
}