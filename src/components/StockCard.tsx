
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StockCardProps {
  symbol: string;
  company: string;
  price: string;
  change: string;
  changePercent: string;
  trend: 'up' | 'down' | 'neutral';
}

export function StockCard({ 
  symbol, 
  company, 
  price, 
  change, 
  changePercent, 
  trend 
}: StockCardProps) {
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors cursor-pointer">
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-sm">{symbol}</h3>
            </div>
            <p className="text-xs text-muted-foreground truncate max-w-[120px]">{company}</p>
          </div>
          <div className={`flex flex-col items-end ${
            trend === 'up' 
              ? 'text-green-500' 
              : trend === 'down' 
                ? 'text-red-500' 
                : 'text-muted-foreground'
          }`}>
            <p className="font-medium text-sm">{price}</p>
            <div className="flex items-center text-xs">
              {trend === 'up' ? (
                <ArrowUp className="h-3 w-3 mr-0.5" />
              ) : trend === 'down' ? (
                <ArrowDown className="h-3 w-3 mr-0.5" />
              ) : null}
              <span>
                {change} ({changePercent})
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
