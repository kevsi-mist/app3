
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp, BadgeIndianRupee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stock {
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

interface HoldingsTableProps {
  stocks: Stock[];
  selectedStock: Stock | null;
  handleStockSelect: (stock: Stock) => void;
}

export function HoldingsTable({ stocks, selectedStock, handleStockSelect }: HoldingsTableProps) {
  return (
    <Card className="border-0 shadow-sm mb-8">
      <CardHeader className="pb-2 px-6 pt-6">
        <CardTitle className="text-base font-medium">Holdings</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-3">
        <div className="overflow-x-auto -mx-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left py-3.5 px-6 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3.5 px-4 font-medium text-muted-foreground">Shares</th>
                <th className="text-left py-3.5 px-4 font-medium text-muted-foreground">Avg Cost</th>
                <th className="text-left py-3.5 px-4 font-medium text-muted-foreground">Price</th>
                <th className="text-left py-3.5 px-4 font-medium text-muted-foreground">Value</th>
                <th className="text-left py-3.5 px-4 font-medium text-muted-foreground">Today</th>
                <th className="text-left py-3.5 px-4 font-medium text-muted-foreground">Total Return</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr 
                  key={stock.symbol} 
                  id={`stock-row-${stock.symbol}`}
                  className={cn(
                    "border-b border-border/20 hover:bg-muted/20 transition-colors cursor-pointer",
                    selectedStock?.symbol === stock.symbol && "bg-muted/10"
                  )}
                  onClick={() => handleStockSelect(stock)}
                >
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{stock.symbol}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">{stock.shares}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-3 w-3 mr-0.5 text-muted-foreground" />
                      {stock.avgCost.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-3 w-3 mr-0.5 text-muted-foreground" />
                      {stock.currentPrice.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center font-medium">
                      <BadgeIndianRupee className="h-3 w-3 mr-0.5 text-muted-foreground" />
                      {stock.value.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center ${stock.change.daily >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.change.daily >= 0 ? (
                        <ArrowUp className="h-3.5 w-3.5 mr-1" />
                      ) : (
                        <ArrowDown className="h-3.5 w-3.5 mr-1" />
                      )}
                      <span>
                        {stock.change.daily >= 0 ? '+' : ''}
                        {stock.change.dailyPercent.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center font-medium ${stock.change.total >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.change.total >= 0 ? (
                        <ArrowUp className="h-3.5 w-3.5 mr-1" />
                      ) : (
                        <ArrowDown className="h-3.5 w-3.5 mr-1" />
                      )}
                      <span>
                        {stock.change.total >= 0 ? '+' : ''}
                        {stock.change.totalPercent.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
