
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, TrendingDown, BadgeIndianRupee } from "lucide-react";

interface StockInsightCardProps {
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
    fiscalPrice?: number; // Added fiscal price
  }[];
  useFiscalPrice?: boolean; // Flag to use fiscal price
}

export function StockInsightCard({
  stock,
  recommendation,
  analysis,
  targetPrice,
  risk,
  trend,
  tags,
  priceData,
  useFiscalPrice = true // Default to using fiscal price
}: StockInsightCardProps) {
  // Process data to use fiscal prices if available
  const processedData = priceData.map(item => ({
    ...item,
    displayPrice: useFiscalPrice && item.fiscalPrice !== undefined ? item.fiscalPrice : item.price
  }));

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-lg">{stock}</CardTitle>
          </div>
          <Badge variant={recommendation === "Buy" ? "default" : recommendation === "Sell" ? "destructive" : "outline"}>
            {recommendation}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 text-sm text-muted-foreground">
          <p className="mb-3">{analysis}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 text-xs rounded-full bg-secondary">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="h-48">
          <ChartContainer className="h-full" config={{}}>
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickMargin={10} />
              <YAxis stroke="#888888" fontSize={12} tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="displayPrice" 
                stroke={trend === "up" ? "#10B981" : "#EF4444"} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <div className="flex items-center">
              <span>Target: </span>
              <span className="font-medium flex items-center">
                <BadgeIndianRupee className="h-3 w-3 mr-0.5" />
                {targetPrice}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm">Risk:</span>
              <div className="flex">
                {Array(5).fill(0).map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-4 rounded-sm mx-0.5 ${
                      idx < risk 
                        ? risk > 3 
                          ? "bg-red-500" 
                          : risk > 1 
                            ? "bg-yellow-500" 
                            : "bg-green-500"
                        : "bg-muted"
                    }`} 
                  />
                ))}
              </div>
            </div>
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
