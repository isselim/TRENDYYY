import React from 'react';
import { Building2, Target } from 'lucide-react';

interface MarketSectorsProps {
  sectors: string[];
  keyword: string;
}

export function MarketSectors({ sectors, keyword }: MarketSectorsProps) {
  const getSectorIcon = (sector: string) => {
    return <Building2 className="w-4 h-4" />;
  };

  const getSectorColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-orange-100 text-orange-800 border-orange-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Market Sector Impact</h3>
        <Target className="w-6 h-6 text-gray-600" />
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Industries and market sectors that may be affected by trends in "{keyword}"
      </p>

      <div className="grid grid-cols-2 gap-3">
        {sectors.map((sector, index) => (
          <div
            key={sector}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getSectorColor(index)}`}
          >
            {getSectorIcon(sector)}
            <span className="text-sm font-medium">{sector}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">Investment Implications</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Monitor companies in these sectors for potential opportunities</li>
          <li>• Consider correlation with overall market performance</li>
          <li>• Track regulatory changes affecting these industries</li>
          <li>• Analyze competitive landscape shifts</li>
        </ul>
      </div>
    </div>
  );
}