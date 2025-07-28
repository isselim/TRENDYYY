import React, { useState } from 'react';
import { MultiKeywordForm } from './components/MultiKeywordForm';
import { MultiKeywordResults } from './components/MultiKeywordResults';
import { TrendAnalyzer } from './utils/trendAnalyzer';
import { KeywordAnalysis, MultiKeywordAnalysis } from './types';
import { BarChart3, TrendingUp, MapPin } from 'lucide-react';

function App() {
  const [analysis, setAnalysis] = useState<MultiKeywordAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (keywords: string[], dateRange: string, location?: string, csvData?: string) => {
    setIsLoading(true);
    
    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      const days = parseInt(dateRange.split(' ')[0]);
      
      const analyses: KeywordAnalysis[] = [];
      
      for (const keyword of keywords) {
        const trendData = TrendAnalyzer.generateMockTrendData(keyword, days, location);
        const historicalData = TrendAnalyzer.generateMockTrendData(keyword, Math.min(days * 2, 180), location);
        
        const trendSummary = TrendAnalyzer.analyzeTrend(trendData);
        const prediction = TrendAnalyzer.predictTrend(trendData, keyword);
        const marketSectors = TrendAnalyzer.getMarketSectors(keyword);
        const socialMediaData = TrendAnalyzer.generateSocialMediaData(keyword, location);

        const keywordAnalysis: KeywordAnalysis = {
          keyword,
          location,
          dateRange,
          trendSummary,
          signals: {
            googleTrends: trendData,
            socialMedia: socialMediaData,
            historicalPerformance: historicalData
          },
          prediction,
          marketSectors
        };
        
        analyses.push(keywordAnalysis);
      }
      
      // Calculate comparison metrics
      const topPerformer = analyses.reduce((best, current) => 
        current.trendSummary.growthRate > best.trendSummary.growthRate ? current : best
      ).keyword;
      
      const mostVolatile = analyses.reduce((most, current) => {
        const currentVolatility = Math.abs(current.trendSummary.growthRate);
        const mostVolatility = Math.abs(most.trendSummary.growthRate);
        return currentVolatility > mostVolatility ? current : most;
      }).keyword;
      
      const averageGrowth = Math.round(
        analyses.reduce((sum, analysis) => sum + analysis.trendSummary.growthRate, 0) / analyses.length * 100
      ) / 100;
      
      // Calculate correlations between keywords
      const correlations = [];
      for (let i = 0; i < analyses.length; i++) {
        for (let j = i + 1; j < analyses.length; j++) {
          const correlation = TrendAnalyzer.calculateCorrelation(
            analyses[i].signals.googleTrends,
            analyses[j].signals.googleTrends
          );
          correlations.push({
            keyword1: analyses[i].keyword,
            keyword2: analyses[j].keyword,
            correlation: Math.round(correlation * 100) / 100
          });
        }
      }
      
      const multiAnalysis: MultiKeywordAnalysis = {
        keywords,
        location,
        dateRange,
        analyses,
        comparison: {
          topPerformer,
          mostVolatile,
          averageGrowth,
          correlations
        }
      };

      setAnalysis(multiAnalysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-gray-900">Kenya Market Trends Analyzer</h1>
                <span className="text-2xl">🇰🇪</span>
              </div>
              <p className="text-gray-600 flex items-center space-x-2">
                <span>AI-powered market intelligence for Kenya</span>
                <MapPin className="w-4 h-4" />
                <span>Multi-keyword analysis & predictions</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analysis Form */}
          <div className="lg:col-span-1">
            <MultiKeywordForm onAnalyze={handleAnalyze} isLoading={isLoading} />
            
            {/* Quick Stats */}
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Kenya Market Intelligence</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>47 Counties</span>
                  <span className="text-green-600">✓ Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Multi-Keyword</span>
                  <span className="text-green-600">✓ Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Kenya Sectors</span>
                  <span className="text-green-600">✓ Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Correlations</span>
                  <span className="text-green-600">✓ Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-2">
            {!analysis && !isLoading && (
              <div className="bg-white p-12 rounded-lg shadow-md text-center">
                <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to Analyze Kenya Markets</h3>
                <p className="text-gray-500">
                  Enter up to 5 keywords to analyze Kenya market trends with location-specific insights and correlations.
                </p>
              </div>
            )}

            {isLoading && (
              <div className="bg-white p-12 rounded-lg shadow-md text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Analyzing Kenya Market Trends</h3>
                <p className="text-gray-500">
                  Processing multiple keywords, calculating correlations, and generating Kenya-specific insights...
                </p>
              </div>
            )}

            {analysis && (
              <MultiKeywordResults analysis={analysis} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;