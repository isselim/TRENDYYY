import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import { KeywordAnalysis } from '../types';

interface PredictiveInsightProps {
  prediction: KeywordAnalysis['prediction'];
}

export function PredictiveInsight({ prediction }: PredictiveInsightProps) {
  const getDirectionIcon = () => {
    switch (prediction.direction) {
      case 'up':
        return <TrendingUp className="w-6 h-6 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-6 h-6 text-red-500" />;
      default:
        return <Minus className="w-6 h-6 text-gray-500" />;
    }
  };

  const getDirectionColor = () => {
    switch (prediction.direction) {
      case 'up':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'down':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getConfidenceColor = () => {
    switch (prediction.confidence) {
      case 'high':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-red-600 bg-red-100';
    }
  };

  const getDirectionText = () => {
    switch (prediction.direction) {
      case 'up':
        return 'Expected to Increase';
      case 'down':
        return 'Expected to Decrease';
      default:
        return 'Expected to Remain Stable';
    }
  };

  const getConfidencePercentage = () => {
    switch (prediction.confidence) {
      case 'high':
        return '85-95%';
      case 'medium':
        return '65-85%';
      default:
        return '45-65%';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Predictive Insight</h3>
        {getDirectionIcon()}
      </div>
      
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getDirectionColor()}`}>
        {getDirectionText()}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Estimated Change</h4>
          <div className="text-2xl font-bold text-gray-900">
            {prediction.estimatedChange > 0 ? '+' : ''}{prediction.estimatedChange}%
          </div>
          <div className="text-sm text-gray-500">Over {prediction.timeframe}</div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Confidence Level</h4>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor()}`}>
            <span className="capitalize">{prediction.confidence}</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">{getConfidencePercentage()}</div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start space-x-2">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="text-sm text-blue-800">
          <strong>Note:</strong> Predictions are based on historical patterns and current trends. 
          Market conditions can change rapidly due to external factors.
        </div>
      </div>
    </div>
  );
}