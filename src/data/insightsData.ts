
import { generatePriceData } from '../utils/stockDataUtils';

export interface StockInsight {
  keyPoints: any;
  description: string;
  id: number;
  stock: string;
  recommendation: 'Buy' | 'Sell' | 'Hold';
  analysis: string;
  targetPrice: number;
  risk: number;
  trend: 'up' | 'down';
  tags: string[];
  priceData: {
    date: string;
    price: number;
  }[];
}

export interface MarketAlert {
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

export const insightsData: StockInsight[] = [
  {
    id: 1,
    stock: 'RELIANCE - Reliance Industries',
    keyPoints: [
      'Expanding green energy portfolio',
      'Strong retail and telecom growth',
      'Recent market pullback'
    ],
    description: 'Reliance Industries is positioned for long-term growth with its focus on green energy and robust performance in retail and telecom sectors.',
    recommendation: 'Buy',
    analysis: 'Strong potential for growth with new green energy initiatives. Recent market pullback presents a good buying opportunity.',
    targetPrice: 3000.00,
    risk: 3,
    trend: 'up',
    tags: ['Energy', 'Retail', 'Telecom'],
    priceData: generatePriceData('up')
  },
  {
    id: 2,
    stock: 'TCS - Tata Consultancy Services',
    keyPoints: [
      'Strong global IT demand',
      'Valuation is high',
      'Potential for pullback'
    ],
    description: 'TCS continues to benefit from global IT demand, but its current valuation suggests waiting for a better entry point.',
    recommendation: 'Hold',
    analysis: 'IT services demand remains strong globally, but current valuation appears to be pricing in significant growth. Wait for pullback.',
    targetPrice: 3500.00,
    risk: 2,
    trend: 'down',
    tags: ['IT', 'Technology', 'Services'],
    priceData: generatePriceData('down')
  },
  {
    id: 3,
    stock: 'TATAMOTORS - Tata Motors',
    keyPoints: [
      'EV market competition rising',
      'Production challenges',
      'High valuation vs peers'
    ],
    description: 'Tata Motors faces margin pressures due to competition and production issues, making it less attractive at current valuations.',
    recommendation: 'Sell',
    analysis: 'Increasing competition in EV market and production challenges may impact margins. Valuation remains high relative to peers.',
    targetPrice: 750.50,
    risk: 4,
    trend: 'down',
    tags: ['Automotive', 'Manufacturing', 'Consumer'],
    priceData: generatePriceData('down')
  },
  {
    id: 4,
    stock: 'HDFCBANK - HDFC Bank',
    keyPoints: [
      'Strong credit growth',
      'Improved asset quality',
      'Retail banking expansion'
    ],
    description: 'HDFC Bank is well-positioned for growth with strong fundamentals and opportunities in retail banking.',
    recommendation: 'Buy',
    analysis: 'Strong credit growth and improved asset quality with potential for further expansion in retail banking market.',
    targetPrice: 1750.25,
    risk: 2,
    trend: 'up',
    tags: ['Banking', 'Financial Services', 'Private Sector'],
    priceData: generatePriceData('up', 14, 0.06)
  }
];

export const alertsData: MarketAlert[] = [
  {
    severity: 'high',
    title: 'Unusual FII Activity Detected',
    description: 'Significant increase in Foreign Institutional Investor outflows from technology sector stocks.'
  },
  {
    severity: 'medium',
    title: 'Quarterly Results Season',
    description: 'Major Nifty 50 companies reporting earnings next week may cause increased market volatility.'
  },
  {
    severity: 'low',
    title: 'Economic Data Release',
    description: 'WPI and IIP data scheduled for release on Friday could impact market sentiment in manufacturing sector.'
  }
];
