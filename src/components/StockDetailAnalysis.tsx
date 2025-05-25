
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockChart } from "@/components/StockChart";
import { NewsCard } from "@/components/NewsCard";
import { Badge } from "@/components/ui/badge";
import { BadgeIndianRupee, Lightbulb } from "lucide-react";

interface StockDetailAnalysisProps {
  stock: {
    name: string;
    symbol: string;
    sector: string;
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
  };
}

// Sample data for charts
const detailedChartData = [
  { name: 'Jan', value: 2300 },
  { name: 'Feb', value: 2400 },
  { name: 'Mar', value: 2200 },
  { name: 'Apr', value: 2600 },
  { name: 'May', value: 2750 },
  { name: 'Jun', value: 2500 },
  { name: 'Jul', value: 2700 },
];

export function StockDetailAnalysis({ stock }: StockDetailAnalysisProps) {
  return (
    <Card className="border-0 shadow-sm mb-8 animate-fade-in">
      <CardHeader className="pb-2 px-6 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-medium">{stock.name} ({stock.symbol})</CardTitle>
            <Badge variant="outline" className="ml-2">{stock.sector}</Badge>
          </div>
          <div className="text-lg font-semibold flex items-center">
            <BadgeIndianRupee className="h-4 w-4 mr-1" />
            {stock.currentPrice.toFixed(2)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Holdings</p>
            <p className="text-lg font-semibold">{stock.shares} shares</p>
            <p className="text-sm text-muted-foreground">
              Avg. Cost: <span className="font-medium">₹{stock.avgCost.toFixed(2)}</span>
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-lg font-semibold flex items-center">
              <BadgeIndianRupee className="h-4 w-4 mr-1 text-amber-500" />
              {stock.value.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">Total Return</p>
            <p className={`text-lg font-semibold ${stock.change.total >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock.change.total >= 0 ? '+' : ''}
              {stock.change.totalPercent.toFixed(2)}%
            </p>
            <p className={`text-sm ${stock.change.total >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock.change.total >= 0 ? '+' : ''}₹{Math.abs(stock.change.total).toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="mb-4 text-base font-medium">Performance</h3>
          <StockChart
            data={detailedChartData}
            title=""
            height={250}
            trend={stock.change.total >= 0 ? "up" : "down"}
            percentage={`${stock.change.total >= 0 ? '+' : ''}${stock.change.totalPercent.toFixed(2)}%`}
          />
        </div>
        
        <div className="mt-8">
          <h3 className="mb-4 text-base font-medium">AI Analysis</h3>
          <div className="p-4 rounded-lg bg-muted/50 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">Key Insights</span>
            </div>
            <div className="space-y-3 text-sm">
              {stock.symbol === "RELIANCE" && (
                <>
                  <p>• Strong momentum in the retail and telecom segments could drive 8-10% revenue growth in the next quarter.</p>
                  <p>• Recent green energy investments aligning with global sustainability trends.</p>
                  <p>• Portfolio impact: Positive contributor to overall returns with relatively lower volatility.</p>
                </>
              )}
              {stock.symbol === "TCS" && (
                <>
                  <p>• Potential headwinds from global tech spending slowdown may impact short-term growth.</p>
                  <p>• Strong orderbook provides revenue visibility for the next 2-3 quarters.</p>
                  <p>• Portfolio impact: Core holding providing stability during market volatility.</p>
                </>
              )}
              {stock.symbol === "HDFCBANK" && (
                <>
                  <p>• Steady credit growth and improving asset quality metrics point to sustainable growth.</p>
                  <p>• Higher retail penetration could drive margin expansion in coming quarters.</p>
                  <p>• Portfolio impact: Anchor holding in financial sector with consistent returns.</p>
                </>
              )}
              {stock.symbol === "INFY" && (
                <>
                  <p>• New AI-focused partnerships could open additional revenue streams.</p>
                  <p>• Attrition rates normalizing which should benefit operating margins.</p>
                  <p>• Portfolio impact: Complements TCS exposure with slightly higher growth profile.</p>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="mb-4 text-base font-medium">Latest News</h3>
          <div className="grid grid-cols-1 gap-6">
            {stock.symbol === "RELIANCE" && (
              <NewsCard
                title="Reliance Retail Eyes Strategic Partnership with Global Luxury Brands"
                source="Economic Times"
                time="3 hours ago"
                summary={[
                  'Reliance Retail in talks with several luxury brands to expand premium retail footprint',
                  'Plans to open dedicated luxury retail spaces in major metros',
                  'Move could accelerate luxury segment growth in Indian market'
                ]}
                sentiment="positive"
              />
            )}
            {stock.symbol === "TCS" && (
              <NewsCard
                title="TCS Secures $500M Digital Transformation Deal with European Banking Giant"
                source="Business Standard"
                time="5 hours ago"
                summary={[
                  'Multi-year deal focuses on cloud migration and AI implementation',
                  'Largest deal win for TCS in the European market this fiscal',
                  'Expected to boost European revenue contribution by 2%'
                ]}
                sentiment="positive"
              />
            )}
            {stock.symbol === "HDFCBANK" && (
              <NewsCard
                title="HDFC Bank Launches New Digital Banking Platform for SMEs"
                source="Financial Express"
                time="7 hours ago"
                summary={[
                  'Platform offers integrated banking, accounting and tax solutions',
                  'Targets 2 million SME customers over the next 18 months',
                  'Move seen as strategy to capture larger SME banking market share'
                ]}
                sentiment="positive"
              />
            )}
            {stock.symbol === "INFY" && (
              <NewsCard
                title="Infosys Partners with Leading Global AI Research Institute"
                source="Mint"
                time="4 hours ago"
                summary={[
                  'Strategic partnership focuses on enterprise AI applications',
                  'Will establish joint AI innovation lab at Infosys Bengaluru campus',
                  'Partnership expected to enhance Infosys AI service capabilities'
                ]}
                sentiment="neutral"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
