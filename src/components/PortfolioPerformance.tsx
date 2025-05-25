
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StockChart } from '@/components/StockChart';
import { BadgeIndianRupee } from 'lucide-react';

// Chart data
const dailyData = [
  { name: '9:30', value: 1058000 },
  { name: '10:30', value: 1057800 },
  { name: '11:30', value: 1062000 },
  { name: '12:30', value: 1065000 },
  { name: '1:30', value: 1070000 },
  { name: '2:30', value: 1067000 },
  { name: '3:30', value: 1074000 },
  { name: '4:00', value: 1078000 }
];

const monthlyData = [
  { name: '1', value: 940000 },
  { name: '5', value: 962000 },
  { name: '10', value: 985000 },
  { name: '15', value: 998000 },
  { name: '20', value: 1032000 },
  { name: '25', value: 1056000 },
  { name: '30', value: 1078000 }
];

export function PortfolioPerformance() {
  return (
    <Card className="md:col-span-2 h-full border-0 shadow-sm">
      <CardHeader className="pb-2 px-6 pt-6">
        <CardTitle className="text-base font-medium">Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-semibold flex items-center">
              <BadgeIndianRupee className="h-5 w-5 mr-1 text-amber-500" />
              10,60,899.75
            </p>
            <p className="text-sm font-medium text-green-500 flex items-center">
              +3.2% (₹33,893)
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Today's Change</p>
            <p className="text-2xl font-semibold text-green-500 flex items-center">
              <BadgeIndianRupee className="h-5 w-5 mr-1" />
              +8,243.58
            </p>
            <p className="text-sm font-medium text-green-500 flex items-center">
              +0.8%
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Total Gain/Loss</p>
            <p className="text-2xl font-semibold text-green-500 flex items-center">
              <BadgeIndianRupee className="h-5 w-5 mr-1" />
              +1,36,493.60
            </p>
            <p className="text-sm font-medium text-green-500 flex items-center">
              +14.7%
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="daily" className="mt-6">
          <TabsList className="mb-6 bg-muted/50 p-1">
            <TabsTrigger value="daily" className="rounded-md">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="rounded-md">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="rounded-md">Monthly</TabsTrigger>
            <TabsTrigger value="yearly" className="rounded-md">Yearly</TabsTrigger>
            <TabsTrigger value="all" className="rounded-md">All Time</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="mt-0">
            <StockChart
              data={dailyData}
              title=""
              height={250}
              trend="up"
              percentage="+0.8%"
            />
          </TabsContent>
          <TabsContent value="monthly" className="mt-0">
            <StockChart
              data={monthlyData}
              title=""
              height={250}
              trend="up"
              percentage="+14.7%"
            />
          </TabsContent>
          <TabsContent value="weekly">
            <StockChart
              data={monthlyData.slice(0, 5)}
              title=""
              height={250}
              trend="up"
              percentage="+5.3%"
            />
          </TabsContent>
          <TabsContent value="yearly">
            <StockChart
              data={monthlyData.map(d => ({ ...d, value: d.value * 0.9 }))}
              title=""
              height={250}
              trend="up"
              percentage="+32.7%"
            />
          </TabsContent>
          <TabsContent value="all">
            <StockChart
              data={monthlyData.map(d => ({ ...d, value: d.value * 0.7 }))}
              title=""
              height={250}
              trend="up"
              percentage="+58.4%"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
