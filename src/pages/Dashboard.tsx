import React from 'react';
import { SidebarNav } from '@/components/SidebarNav';
import { PortfolioSummary } from '@/components/PortfolioSummary';
import { MarketOverview } from '@/components/MarketOverview';
import { AIInsights } from '@/components/AIInsights';
import { StockChart } from '@/components/StockChart';
import { NewsCard } from '@/components/NewsCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { adjustToFiscalPrice } from '@/utils/stockDataUtils';

const stockData = adjustToFiscalPrice([
  { name: 'Jan', value: 18000 },
  { name: 'Feb', value: 18500 },
  { name: 'Mar', value: 18200 },
  { name: 'Apr', value: 18700 },
  { name: 'May', value: 19200 },
  { name: 'Jun', value: 19000 },
  { name: 'Jul', value: 19600 },
]);

const newsData = {
  title: 'RBI Signals Potential Rate Cut in Next Policy',
  source: 'Economic Times',
  time: '2 hours ago',
  summary: [
    'RBI Governor suggests improved economic conditions may warrant rate adjustments',
    'Markets responded positively with Nifty 50 gaining 0.8%',
    'Analysts predict first cut could come as early as August'
  ],
  sentiment: 'positive' as const
};

export default function Dashboard() {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen bg-[#121212] text-[#fefefe]">
      {!isMobile}

      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="sticky top-0 z-10 border-b border-white/10 bg-[#121212]/80 backdrop-blur px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <h1 className={cn("text-3xl font-bold")}>Dashboard</h1>
            <span className="text-sm text-[#999]">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </header>

        <main className="flex-1 px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl p-6 bg-[#1e1e1e] shadow-xl hover:shadow-[0_0_15px_#3b7cc9] transition">
              <PortfolioSummary />
            </div>

            <div className="rounded-3xl p-6 bg-[#1e1e1e] shadow-xl hover:shadow-[0_0_15px_#3b7cc9] transition">
              <AIInsights />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-3xl p-6 bg-[#1e1e1e] shadow-md hover:shadow-[0_0_12px_#3b7cc9] transition">
                  <StockChart
                    data={stockData}
                    title="NIFTY 50"
                    subtext="21,783.45"
                    trend="up"
                    percentage="+0.74%"
                  />
                </div>

                <div className="rounded-3xl p-6 bg-[#1e1e1e] shadow-md hover:shadow-[0_0_12px_#3b7cc9] transition">
                  <StockChart
                    data={adjustToFiscalPrice(stockData.map((item, i) => ({
                      name: item.name,
                      value: item.value * 0.85 + (i * 100)
                    })))}
                    title="SENSEX"
                    subtext="71,745.30"
                    trend="up"
                    percentage="+1.12%"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Latest News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-3xl p-6 bg-[#1e1e1e] shadow-md hover:shadow-[0_0_12px_#3b7cc9] transition">
                    <NewsCard
                      title={newsData.title}
                      source={newsData.source}
                      time={newsData.time}
                      summary={newsData.summary}
                      sentiment={newsData.sentiment}
                    />
                  </div>

                  <div className="rounded-3xl p-6 bg-[#1e1e1e] shadow-md hover:shadow-[0_0_12px_#3b7cc9] transition">
                    <NewsCard
                      title="IT Giants Announce Major AI Investments"
                      source="Business Standard"
                      time="5 hours ago"
                      summary={[
                        'Several IT majors unveiled billion-rupee AI initiatives',
                        'Focus on generative AI applications for BFSI sector',
                        'Talent acquisition in AI becomes key priority for firms'
                      ]}
                      sentiment="neutral"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-[#1e1e1e] shadow-md hover:shadow-[0_0_12px_#3b7cc9] transition">
              <MarketOverview />
            </div>
          </div>
        </main>

        {isMobile && <div className="h-16" />}
      </div>
    </div>
  );
}
