
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StockCard } from '@/components/StockCard';
import { BadgeIndianRupee, TrendingUp, TrendingDown } from "lucide-react";
import { generatePriceData, formatIndianRupees, formatPercentage } from '@/utils/stockDataUtils';

const marketData = [
  {
    symbol: 'NIFTY 50',
    company: 'Benchmark Index',
    price: '₹21,783.45',
    change: '+162.35',
    changePercent: '1.19%',
    trend: 'up' as const
  },
  {
    symbol: 'RELIANCE',
    company: 'Reliance Industries',
    price: '₹2,765.30',
    change: '+32.45',
    changePercent: '1.19%',
    trend: 'up' as const
  },
  {
    symbol: 'TCS',
    company: 'Tata Consultancy Services',
    price: '₹3,542.75',
    change: '-24.65',
    changePercent: '0.69%',
    trend: 'down' as const
  },
  {
    symbol: 'HDFCBANK',
    company: 'HDFC Bank',
    price: '₹1,632.80',
    change: '+18.25',
    changePercent: '1.13%',
    trend: 'up' as const
  },
  {
    symbol: 'INFY',
    company: 'Infosys Ltd',
    price: '₹1,490.35',
    change: '+10.55',
    changePercent: '0.71%',
    trend: 'up' as const
  },
  {
    symbol: 'BHARTIARTL',
    company: 'Bharti Airtel',
    price: '₹1,208.95',
    change: '+15.70',
    changePercent: '1.32%',
    trend: 'up' as const
  }
];

export function MarketOverview() {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-medium">Indian Market Overview</CardTitle>
            <BadgeIndianRupee className="h-4 w-4 text-amber-500" />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>4 Gainers</span>
            </div>
            <div className="flex items-center text-red-500">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span>1 Loser</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2 max-h-[calc(100vh-320px)] overflow-y-auto">
        <div className="grid gap-2">
          {marketData.map((stock) => (
            <StockCard
              key={stock.symbol}
              symbol={stock.symbol}
              company={stock.company}
              price={stock.price}
              change={stock.change}
              changePercent={stock.changePercent}
              trend={stock.trend}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
