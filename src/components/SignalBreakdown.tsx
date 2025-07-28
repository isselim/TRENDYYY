import React from 'react';
import { Search, MessageCircle, BarChart3 } from 'lucide-react';
import { KeywordAnalysis } from '../types';

interface SignalBreakdownProps {
  signals: KeywordAnalysis['signals'];
}

export function SignalBreakdown({ signals }: SignalBreakdownProps) {
  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 20) return 'text-green-600 bg-green-50';
    if (sentiment < -20) return 'text-red-600 bg-red-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  const getSentimentText = (sentiment: number) => {
    if (sentiment > 20) return 'Positive';
    if (sentiment < -20) return 'Negative';
    return 'Neutral';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const currentTrend = signals.googleTrends[signals.googleTrends.length - 1]?.value || 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Signal Breakdown</h3>
      
      <div className="space-y-6">
        {/* Google Trends */}
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-2">Google Trends</h4>
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-blue-600">{currentTrend}</div>
              <div className="text-sm text-gray-500">Current interest level</div>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Based on search volume over the selected period
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-purple-50 rounded-lg">
            <MessageCircle className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-2">Social Media Signals</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className={`inline-flex px-2 py-1 rounded text-sm font-medium ${getSentimentColor(signals.socialMedia.sentiment)}`}>
                  {getSentimentText(signals.socialMedia.sentiment)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Sentiment</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {formatNumber(signals.socialMedia.mentions)}
                </div>
                <div className="text-xs text-gray-500">Mentions</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {formatNumber(signals.socialMedia.engagement)}
                </div>
                <div className="text-xs text-gray-500">Engagement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Performance */}
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-2">Historical Performance</h4>
            <div className="text-sm text-gray-600">
              Data points available: <span className="font-medium">{signals.historicalPerformance.length}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Average historical value: <span className="font-medium">
                {Math.round(signals.historicalPerformance.reduce((acc, d) => acc + d.value, 0) / signals.historicalPerformance.length * 100) / 100}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}