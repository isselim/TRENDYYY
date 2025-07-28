export const KENYA_COUNTIES = [
  'Baringo',
  'Bomet',
  'Bungoma',
  'Busia',
  'Elgeyo-Marakwet',
  'Embu',
  'Garissa',
  'Homa Bay',
  'Isiolo',
  'Kajiado',
  'Kakamega',
  'Kericho',
  'Kiambu',
  'Kilifi',
  'Kirinyaga',
  'Kisii',
  'Kisumu',
  'Kitui',
  'Kwale',
  'Laikipia',
  'Lamu',
  'Machakos',
  'Makueni',
  'Mandera',
  'Marsabit',
  'Meru',
  'Migori',
  'Mombasa',
  'Murang\'a',
  'Nairobi',
  'Nakuru',
  'Nandi',
  'Narok',
  'Nyamira',
  'Nyandarua',
  'Nyeri',
  'Samburu',
  'Siaya',
  'Taita-Taveta',
  'Tana River',
  'Tharaka-Nithi',
  'Trans Nzoia',
  'Turkana',
  'Uasin Gishu',
  'Vihiga',
  'Wajir',
  'West Pokot'
];

export const KENYA_MARKET_SECTORS = {
  'agriculture': ['Agriculture', 'Tea & Coffee', 'Horticulture', 'Livestock', 'Dairy'],
  'technology': ['Fintech', 'M-Pesa', 'Digital Banking', 'E-commerce', 'Telecommunications'],
  'tourism': ['Safari Tourism', 'Coastal Tourism', 'Hospitality', 'Airlines', 'Travel Services'],
  'manufacturing': ['Textiles', 'Food Processing', 'Cement', 'Steel', 'Pharmaceuticals'],
  'energy': ['Geothermal', 'Solar Power', 'Wind Energy', 'Oil & Gas', 'Hydroelectric'],
  'finance': ['Banking', 'Insurance', 'Capital Markets', 'Microfinance', 'Investment'],
  'real estate': ['Residential', 'Commercial', 'Industrial', 'REITs', 'Construction'],
  'education': ['Universities', 'Technical Training', 'Online Learning', 'EdTech', 'Vocational'],
  'healthcare': ['Hospitals', 'Pharmaceuticals', 'Medical Equipment', 'Health Insurance', 'Telemedicine'],
  'transport': ['Matatu Industry', 'Logistics', 'Shipping', 'Aviation', 'Railway'],
  'retail': ['Supermarkets', 'Shopping Malls', 'E-commerce', 'Fashion', 'Electronics'],
  'media': ['Broadcasting', 'Publishing', 'Digital Media', 'Advertising', 'Entertainment']
};

export const POPULAR_KENYA_KEYWORDS = [
  // Technology & Finance
  'M-Pesa', 'Safaricom', 'KCB Bank', 'Equity Bank', 'fintech Kenya',
  
  // Agriculture & Food
  'tea export Kenya', 'coffee farming', 'maize prices', 'dairy farming', 'horticulture',
  
  // Tourism & Travel
  'Maasai Mara', 'safari Kenya', 'Diani Beach', 'Mount Kenya', 'tourism Kenya',
  
  // Business & Economy
  'Nairobi Stock Exchange', 'Kenya economy', 'manufacturing Kenya', 'export Kenya',
  
  // Energy & Infrastructure
  'geothermal Kenya', 'solar power', 'SGR railway', 'infrastructure Kenya',
  
  // Education & Health
  'university Kenya', 'NHIF', 'healthcare Kenya', 'medical tourism',
  
  // Real Estate & Construction
  'real estate Nairobi', 'affordable housing', 'construction Kenya',
  
  // Politics & Governance
  'Kenya government', 'devolution Kenya', 'county government',
  
  // Sports & Culture
  'Kenya athletics', 'marathon running', 'Kenyan music', 'cultural tourism'
];

export function getLocationMultiplier(location: string): number {
  // Major economic centers have higher base activity
  const majorCenters = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];
  const economicHubs = ['Kiambu', 'Machakos', 'Kajiado', 'Uasin Gishu', 'Kericho'];
  
  if (majorCenters.includes(location)) {
    return 1.5; // 50% higher activity
  } else if (economicHubs.includes(location)) {
    return 1.2; // 20% higher activity
  } else {
    return 1.0; // Base activity
  }
}

export function getKenyaMarketSectors(keyword: string): string[] {
  const lowerKeyword = keyword.toLowerCase();
  const matchedSectors: string[] = [];

  Object.entries(KENYA_MARKET_SECTORS).forEach(([key, sectors]) => {
    if (lowerKeyword.includes(key) || sectors.some(sector => 
      lowerKeyword.includes(sector.toLowerCase())
    )) {
      matchedSectors.push(...sectors);
    }
  });

  // Default Kenyan sectors if no specific match
  if (matchedSectors.length === 0) {
    return ['Agriculture', 'Fintech', 'Tourism', 'Manufacturing'];
  }

  return [...new Set(matchedSectors)].slice(0, 4);
}