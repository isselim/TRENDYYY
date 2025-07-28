import React, { useState } from 'react';
import { Search, Calendar, Upload } from 'lucide-react';

interface AnalysisFormProps {
  onAnalyze: (keyword: string, dateRange: string, csvData?: string) => void;
  isLoading: boolean;
}

export function AnalysisForm({ onAnalyze, isLoading }: AnalysisFormProps) {
  const [keyword, setKeyword] = useState('');
  const [dateRange, setDateRange] = useState('30');
  const [csvData, setCsvData] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    
    onAnalyze(keyword.trim(), `${dateRange} days`, csvData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCsvData(event.target?.result as string || '');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-6">
        <Search className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Market Trends Analysis</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
            Keyword or Market Term
          </label>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., cryptocurrency, electric vehicles, remote work"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-2">
            Analysis Period
          </label>
          <select
            id="dateRange"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="180">Last 180 days</option>
            <option value="365">Last year</option>
          </select>
        </div>

        <div>
          <label htmlFor="csvFile" className="block text-sm font-medium text-gray-700 mb-2">
            Historical Data (Optional CSV)
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              id="csvFile"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="csvFile"
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm">Upload CSV</span>
            </label>
            {csvData && (
              <span className="text-sm text-green-600">✓ File uploaded</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !keyword.trim()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Analyze Trends</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500">
        <p>💡 <strong>Pro tip:</strong> Try keywords like "AI", "sustainability", "remote work", "blockchain", or specific company/product names for comprehensive analysis.</p>
      </div>
    </div>
  );
}