
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Moon, Sun, RefreshCcw, ArrowDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useFinance } from '@/contexts/FinanceContext';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function PortfolioHeader() {
  const { theme, setTheme } = useTheme();
  const { refreshData, isRefreshing, lastUpdated, hasUpdates } = useFinance();
  
  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Never updated';
    return formatDistanceToNow(lastUpdated, { addSuffix: true });
  };
  
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 lg:px-8 py-5">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold">Portfolio</h1>
        <div className="flex items-center space-x-4">
          {hasUpdates && (
            <Badge variant="outline" className="bg-primary/10 text-primary animate-pulse">
              🔄 Updated
            </Badge>
          )}
          
          <div className="text-sm text-muted-foreground">
            Last updated: {formatLastUpdated()}
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full" 
                  onClick={() => refreshData()}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? (
                    <ArrowDown className="h-5 w-5 animate-bounce" />
                  ) : (
                    <RefreshCcw className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh financial data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          
          <Button size="sm" className="gap-1.5 font-medium">
            <Plus className="h-4 w-4" /> Add Investment
          </Button>
        </div>
      </div>
    </header>
  );
}
