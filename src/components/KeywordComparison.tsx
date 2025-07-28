import React from 'react';
import { Line } from 'react-chartjs-2';
import { MultiKeywordAnalysis } from '../types';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface KeywordComparisonProps {
  analysis: MultiKeywordAnalysis;
}

export function KeywordComparison({ analysis }: KeywordComparisonProps) {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  
  const chartData = {
    labels: analysis.analyses[0]?.signals.googleTrends.map(d => 
      new Date(d.date).toLocaleDateString()
    ) || [],
    datasets: analysis.analyses.map((keywordAnalysis, index) => ({
      label: keywordAnalysis.keyword,
      data: keywordAnalysis.signals.googleTrends.map(d => d.value),
      borderColor: colors[index % colors.length],
      backgroundColor: `${colors[index % colors.length]}20`,
      fill: false,
      tension: 0.4,
      pointRadius: 2,
      pointHoverRadius: 5,
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Keyword Trends Comparison',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#E5E7EB',
        },
        ticks: {
          color: '#6B7280'
        }
      },
      x: {
        grid: {
          color: '#E5E7EB',
        },
        ticks: {
          color: '#6B7280'
        }
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  const getCorrelationColor = (correlation: number) => {
    const abs = Math.abs(correlation);
    if (abs > 0.7) return 'text-green-600 bg-green-50';
    if (abs > 0.4) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getCorrelationStrength = (correlation: number) => {
    const abs = Math.abs(correlation);
    if (abs > 0.7) return 'Strong';
    if (abs > 0.4) return 'Moderate';
    return 'Weak';
  };

  return (
    <div className="space-y-6">
      {/* Comparison Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Line data={chartData} options={options} />
      </div>

      {/* Performance Comparison */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Comparison</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analysis.analyses.map((keywordAnalysis, index) => (
            <div key={keywordAnalysis.keyword} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 truncate">
                  {keywordAnalysis.keyword}
                </h4>
                <div className="flex items-center space-x-1">
                  {keywordAnalysis.trendSummary.direction === 'increasing' && (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  )}
                  {keywordAnalysis.trendSummary.direction === 'decreasing' && (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  {keywordAnalysis.trendSummary.direction === 'volatile' && (
                    <Activity className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth Rate:</span>
                  <span className={`font-medium ${
                    keywordAnalysis.trendSummary.growthRate > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {keywordAnalysis.trendSummary.growthRate > 0 ? '+' : ''}
                    {keywordAnalysis.trendSummary.growthRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Peak Value:</span>
                  <span className="font-medium">{keywordAnalysis.trendSummary.peakValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average:</span>
                  <span className="font-medium">{keywordAnalysis.trendSummary.averageValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prediction:</span>
                  <span className={`font-medium capitalize ${
                    keywordAnalysis.prediction.direction === 'up' ? 'text-green-600' : 
                    keywordAnalysis.prediction.direction === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {keywordAnalysis.prediction.direction}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Correlation Analysis */}
      {analysis.comparison.correlations.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Keyword Correlations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.comparison.correlations.map((corr, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {corr.keyword1} ↔ {corr.keyword2}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getCorrelationStrength(corr.correlation)} correlation
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${getCorrelationColor(corr.correlation)}`}>
                  {(corr.correlation * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Correlation Insight:</strong> High correlations (&gt;70%) suggest keywords move together,

              indicating related market dynamics or shared external factors affecting both trends.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}