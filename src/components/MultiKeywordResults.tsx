import React from 'react';
import { TrendChart } from './TrendChart';
import { TrendSummary } from './TrendSummary';
import { SignalBreakdown } from './SignalBreakdown';
import { PredictiveInsight } from './PredictiveInsight';
import { MarketSectors } from './MarketSectors';
import { KeywordComparison } from './KeywordComparison';
import { MultiKeywordAnalysis } from '../types';
import { BarChart3, MapPin } from 'lucide-react';

interface MultiKeywordResultsProps {
  analysis: MultiKeywordAnalysis;
}

export function MultiKeywordResults({ analysis }: MultiKeywordResultsProps) {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Multi-Keyword Analysis Results
            </h2>
          </div>
          {analysis.location && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{analysis.location} County</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{analysis.keywords.length}</div>
            <div className="text-sm text-gray-500">Keywords Analyzed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{analysis.comparison.topPerformer}</div>
            <div className="text-sm text-gray-500">Top Performer</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">{analysis.comparison.mostVolatile}</div>
            <div className="text-sm text-gray-500">Most Volatile</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {analysis.comparison.averageGrowth > 0 ? '+' : ''}{analysis.comparison.averageGrowth}%
            </div>
            <div className="text-sm text-gray-500">Avg Growth</div>
          </div>
        </div>
      </div>

      {/* Keyword Comparison Chart */}
      <KeywordComparison analysis={analysis} />

      {/* Individual Keyword Analyses */}
      {analysis.analyses.map((keywordAnalysis, index) => (
        <div key={keywordAnalysis.keyword} className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Analysis for "{keywordAnalysis.keyword}"
            </h3>
            <div className="text-sm text-gray-600">
              Keyword {index + 1} of {analysis.keywords.length} • {analysis.dateRange}
            </div>
          </div>

          {/* Trend Summary */}
          <TrendSummary 
            summary={keywordAnalysis.trendSummary} 
            keyword={keywordAnalysis.keyword} 
          />
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <TrendChart 
              data={keywordAnalysis.signals.googleTrends} 
              title={`Google Trends - ${keywordAnalysis.keyword}`}
              color={colors[index % colors.length]} 
            />
            <TrendChart 
              data={keywordAnalysis.signals.historicalPerformance} 
              title={`Historical Performance - ${keywordAnalysis.keyword}`}
              color={colors[index % colors.length]} 
            />
          </div>

          {/* Signal Breakdown */}
          <SignalBreakdown signals={keywordAnalysis.signals} />
          
          {/* Prediction and Market Sectors */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <PredictiveInsight prediction={keywordAnalysis.prediction} />
            <MarketSectors 
              sectors={keywordAnalysis.marketSectors} 
              keyword={keywordAnalysis.keyword} 
            />
          </div>

          {/* Separator */}
          {index < analysis.analyses.length - 1 && (
            <div className="border-t border-gray-200 my-8"></div>
          )}
        </div>
      ))}
    </div>
  );
}