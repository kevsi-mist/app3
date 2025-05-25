
// Stock data types
export interface Stock {
  name: string;
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  value: number;
  change: {
    daily: number;
    dailyPercent: number;
    total: number;
    totalPercent: number;
  };
  sector: string;
}

// Sample stocks data (Indian companies)
export const stocks: Stock[] = [
  {
    name: 'Reliance Industries',
    symbol: 'RELIANCE',
    shares: 150,
    avgCost: 2345.75,
    currentPrice: 2765.30,
    value: 414795.0,
    change: {
      daily: 32.45,
      dailyPercent: 1.19,
      total: 62932.5,
      totalPercent: 17.9
    },
    sector: 'Energy & Petrochemicals'
  },
  {
    name: 'Tata Consultancy Services',
    symbol: 'TCS',
    shares: 85,
    avgCost: 3120.45,
    currentPrice: 3542.75,
    value: 301133.75,
    change: {
      daily: -24.65,
      dailyPercent: -0.69,
      total: 35895.5,
      totalPercent: 13.5
    },
    sector: 'IT Services'
  },
  {
    name: 'Infosys Ltd',
    symbol: 'INFY',
    shares: 100,
    avgCost: 1350.25,
    currentPrice: 1490.35,
    value: 149035.0,
    change: {
      daily: 10.55,
      dailyPercent: 0.71,
      total: 14010.0,
      totalPercent: 10.4
    },
    sector: 'IT Services'
  },
  {
    name: 'HDFC Bank',
    symbol: 'HDFCBANK',
    shares: 120,
    avgCost: 1435.67,
    currentPrice: 1632.80,
    value: 195936.0,
    change: {
      daily: 18.25,
      dailyPercent: 1.13,
      total: 23655.6,
      totalPercent: 13.7
    },
    sector: 'Banking & Finance'
  },
  {
    name: 'Bharti Airtel',
    symbol: 'BHARTIARTL',
    shares: 200,
    avgCost: 720.50,
    currentPrice: 850.25,
    value: 170050.0,
    change: {
      daily: 12.80,
      dailyPercent: 1.53,
      total: 25950.0,
      totalPercent: 18.0
    },
    sector: 'Telecom'
  },
  {
    name: 'ITC Limited',
    symbol: 'ITC',
    shares: 300,
    avgCost: 235.75,
    currentPrice: 290.45,
    value: 87135.0,
    change: {
      daily: -1.25,
      dailyPercent: -0.43,
      total: 16410.0,
      totalPercent: 23.2
    },
    sector: 'FMCG'
  },
  {
    name: 'Asian Paints',
    symbol: 'ASIANPAINT',
    shares: 60,
    avgCost: 2950.25,
    currentPrice: 3120.85,
    value: 187251.0,
    change: {
      daily: 22.35,
      dailyPercent: 0.72,
      total: 10236.0,
      totalPercent: 5.8
    },
    sector: 'Consumer Goods'
  },
  {
    name: 'Axis Bank',
    symbol: 'AXISBANK',
    shares: 110,
    avgCost: 785.35,
    currentPrice: 875.60,
    value: 96316.0,
    change: {
      daily: 10.85,
      dailyPercent: 1.25,
      total: 9927.5,
      totalPercent: 11.5
    },
    sector: 'Banking & Finance'
  },
  {
    name: 'Wipro Limited',
    symbol: 'WIPRO',
    shares: 180,
    avgCost: 380.25,
    currentPrice: 410.65,
    value: 73917.0,
    change: {
      daily: -5.15,
      dailyPercent: -1.24,
      total: 5472.0,
      totalPercent: 8.0
    },
    sector: 'IT Services'
  },
  {
    name: 'Hindustan Unilever',
    symbol: 'HINDUNILVR',
    shares: 45,
    avgCost: 2450.75,
    currentPrice: 2625.45,
    value: 118145.25,
    change: {
      daily: 15.35,
      dailyPercent: 0.59,
      total: 7861.5,
      totalPercent: 7.1
    },
    sector: 'FMCG'
  }
];

// Calculate sector allocations
export const calculateSectorAllocations = () => {
  const sectorTotals = stocks.reduce((acc, stock) => {
    if (!acc[stock.sector]) {
      acc[stock.sector] = { value: 0, stocks: [] };
    }
    acc[stock.sector].value += stock.value;
    acc[stock.sector].stocks.push(stock);
    return acc;
  }, {} as Record<string, { value: number, stocks: typeof stocks }>);

  const totalValue = Object.values(sectorTotals).reduce((sum, sector) => sum + sector.value, 0);

  return Object.entries(sectorTotals).map(([sector, data]) => ({
    name: sector,
    percentage: Math.round((data.value / totalValue) * 100),
    value: data.value,
    stocks: data.stocks,
  })).sort((a, b) => b.percentage - a.percentage);
};

// Get color for each sector
export const getSectorColor = (sectorName: string): string => {
  switch (sectorName) {
    case 'Energy & Petrochemicals':
      return 'bg-amber-500';
    case 'IT Services':
      return 'bg-royal';
    case 'Banking & Finance':
      return 'bg-green-500';
    case 'Telecom':
      return 'bg-blue-500';
    case 'FMCG':
      return 'bg-purple-500';
    case 'Consumer Goods':
      return 'bg-pink-500';
    default:
      return 'bg-slate-500';
  }
};
