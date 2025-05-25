
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BadgeIndianRupee, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define stock type
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

interface SectorAllocation {
  name: string;
  percentage: number;
  value: number;
  stocks: Stock[];
}

interface AssetAllocationProps {
  sectorAllocations: SectorAllocation[];
  expandedSectors: string[];
  toggleSector: (sector: string) => void;
  selectedStock: Stock | null;
  handleStockSelect: (stock: Stock) => void;
  getSectorColor: (sector: string) => string;
}

export function AssetAllocation({
  sectorAllocations,
  expandedSectors,
  toggleSector,
  selectedStock,
  handleStockSelect,
  getSectorColor,
}: AssetAllocationProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Get all stocks from all sectors
  const allStocks = sectorAllocations.flatMap(sector => sector.stocks);
  
  // Sort sectors based on the sort order
  const sortedSectorAllocations = [...sectorAllocations].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.percentage - b.percentage
      : b.percentage - a.percentage;
  });
  
  return (
    <Card className="h-full border-0 shadow-sm">
      <CardHeader className="pb-2 px-6 pt-6 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Asset Allocation</CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 px-2 flex items-center gap-1" 
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <span className="sr-only sm:not-sr-only sm:ml-1 text-xs">
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-2">
                <Filter className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only text-xs">All Stocks</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel>Select a stock</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allStocks
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(stock => (
                  <DropdownMenuItem 
                    key={stock.symbol}
                    onClick={() => handleStockSelect(stock)}
                    className={cn(selectedStock?.symbol === stock.symbol && "bg-muted")}
                  >
                    <span className="mr-auto">{stock.name}</span>
                    <span className="text-muted-foreground text-xs">{stock.symbol}</span>
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-3">
        <div className="space-y-6">
          {sortedSectorAllocations.map((sector) => (
            <div key={sector.name} className="space-y-2.5">
              <div 
                className="flex items-center justify-between mb-1.5 cursor-pointer" 
                onClick={() => toggleSector(sector.name)}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-3 h-3 ${getSectorColor(sector.name)} rounded-full`}></div>
                  <span className="font-medium">{sector.name}</span>
                </div>
                <span className="font-medium text-sm">{sector.percentage}%</span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2.5">
                <div 
                  className={`${getSectorColor(sector.name)} h-2.5 rounded-full transition-all duration-300 ease-out`} 
                  style={{ width: `${sector.percentage}%` }}
                ></div>
              </div>
              
              {/* Stock list when sector is expanded */}
              {expandedSectors.includes(sector.name) && (
                <div className="pl-4 pt-3 space-y-2">
                  {sector.stocks.slice(0, 3).map((stock, idx) => (
                    <div 
                      key={stock.symbol}
                      className={cn(
                        "flex items-center justify-between py-1.5 px-3 rounded-md text-sm transition-all",
                        "cursor-pointer hover:bg-muted/30",
                        selectedStock?.symbol === stock.symbol && "bg-muted/20"
                      )}
                      onClick={() => handleStockSelect(stock)}
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 ${getSectorColor(sector.name)} rounded-full mr-2 ${idx === 0 ? "opacity-100" : "opacity-50"}`}></div>
                        <span className="font-medium">{stock.name}</span>
                      </div>
                      <div className="flex items-center">
                        <BadgeIndianRupee className="h-3 w-3 mr-0.5" />
                        {(stock.value / 1000).toFixed(1)}K
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <Badge variant="outline" className="mt-8 py-2 w-full justify-center bg-muted/30 hover:bg-muted/50 transition-colors duration-200 border border-muted-foreground/20">
          AI Recommendation: Add Pharma Exposure
        </Badge>
      </CardContent>
    </Card>
  );
}
