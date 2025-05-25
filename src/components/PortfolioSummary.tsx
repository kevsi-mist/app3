
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StockChart } from '@/components/StockChart';
import { BadgeIndianRupee } from 'lucide-react';

const portfolioData = [
  { name: 'Jan', value: 950000 },
  { name: 'Feb', value: 925000 },
  { name: 'Mar', value: 975000 },
  { name: 'Apr', value: 1050000 },
  { name: 'May', value: 1025000 },
  { name: 'Jun', value: 1075000 },
  { name: 'Jul', value: 1100000 },
];

export function PortfolioSummary() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-medium">Portfolio Summary</CardTitle>
          <BadgeIndianRupee className="h-4 w-4 text-amber-500" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-semibold flex items-center">
              <BadgeIndianRupee className="h-5 w-5 mr-1 text-amber-500" />
              10,60,899.75
            </p>
            <div className="flex items-center text-xs text-green-500">
              <span>+3.2% (₹33,893)</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Today's Change</p>
            <p className="text-2xl font-semibold flex items-center text-green-500">
              <BadgeIndianRupee className="h-5 w-5 mr-1" />
              +8,243.58
            </p>
            <div className="flex items-center text-xs text-green-500">
              <span>+0.8%</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <StockChart
            data={portfolioData}
            title="6 Month Performance"
            height={150}
            trend="up"
            percentage="+15.8%"
          />
        </div>
      </CardContent>
    </Card>
  );
}
