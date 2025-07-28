import React, { useState } from 'react';
import { Search, Calendar, Upload, Plus, X, MapPin } from 'lucide-react';
import { KENYA_COUNTIES, POPULAR_KENYA_KEYWORDS } from '../utils/kenyaData';

interface MultiKeywordFormProps {
  onAnalyze: (keywords: string[], dateRange: string, location?: string, csvData?: string) => void;
  isLoading: boolean;
}

export function MultiKeywordForm({ onAnalyze, isLoading }: MultiKeywordFormProps) {
  const [keywords, setKeywords] = useState<string[]>(['']);
  const [dateRange, setDateRange] = useState('30');
  const [location, setLocation] = useState<string>('');
  const [csvData, setCsvData] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validKeywords = keywords.filter(k => k.trim());
    if (validKeywords.length === 0) return;
    
    onAnalyze(validKeywords, `${dateRange} days`, location || undefined, csvData);
  };

  const addKeyword = () => {
    if (keywords.length < 5) {
      setKeywords([...keywords, '']);
    }
  };

  const removeKeyword = (index: number) => {
    if (keywords.length > 1) {
      setKeywords(keywords.filter((_, i) => i !== index));
    }
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
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

  const addPopularKeyword = (keyword: string) => {
    const emptyIndex = keywords.findIndex(k => !k.trim());
    if (emptyIndex !== -1) {
      updateKeyword(emptyIndex, keyword);
    } else if (keywords.length < 5) {
      setKeywords([...keywords, keyword]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-6">
        <Search className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Kenya Market Trends Analysis</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Keywords Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Keywords or Market Terms (up to 5)
          </label>
          <div className="space-y-3">
            {keywords.map((keyword, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => updateKeyword(index, e.target.value)}
                  placeholder={`Keyword ${index + 1} (e.g., M-Pesa, Safaricom, tea export)`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {keywords.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeKeyword(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {keywords.length < 5 && (
              <button
                type="button"
                onClick={addKeyword}
                className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-dashed border-blue-300"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add another keyword</span>
              </button>
            )}
          </div>
        </div>

        {/* Popular Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Popular Kenya Keywords
          </label>
          <div className="flex flex-wrap gap-2">
            {POPULAR_KENYA_KEYWORDS.slice(0, 12).map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => addPopularKeyword(keyword)}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>

        {/* Location Selection */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Kenya County (Optional)
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Kenya</option>
            {KENYA_COUNTIES.map((county) => (
              <option key={county} value={county}>
                {county} County
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
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

        {/* CSV Upload */}
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
          disabled={isLoading || keywords.every(k => !k.trim())}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Analyze Kenya Market Trends</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <p>🇰🇪 <strong>Kenya Focus:</strong> Analysis tailored for Kenyan market dynamics and economic sectors.</p>
        <p>💡 <strong>Pro tip:</strong> Try combinations like "M-Pesa + fintech", "tea export + agriculture", or "Nairobi real estate + construction".</p>
      </div>
    </div>
  );
}