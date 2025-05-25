
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BadgeIndianRupee } from 'lucide-react';

const insights = [
  {
    id: 1,
    text: 'Based on your portfolio, diversification into pharma sectors could reduce risk exposure by 12%',
    tag: 'Recommendation'
  },
  {
    id: 2,
    text: 'IT holdings showing 15% higher volatility than Nifty IT index this quarter',
    tag: 'Analysis'
  },
  {
    id: 3,
    text: 'Reliance approaching projected price target of ₹3,200, consider rebalancing',
    tag: 'Alert'
  }
];

export function AIInsights() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-medium">AI-Powered Insights</CardTitle>
          <BadgeIndianRupee className="h-4 w-4 text-amber-500" />
        </div>
        <Badge variant="outline" className="bg-royal/10 text-royal border-royal/20">
          Beta
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-3 rounded-lg bg-muted/50 relative">
              <Badge className="absolute -top-2 -left-1 text-xs" variant="secondary">
                {insight.tag}
              </Badge>
              <p className="text-sm mt-2">{insight.text}</p>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full mt-2">
            View all insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
