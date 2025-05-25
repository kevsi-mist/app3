import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { StockDetailAnalysis } from '@/components/StockDetailAnalysis';
import { PortfolioHeader } from '@/components/PortfolioHeader';
import { PortfolioPerformance } from '@/components/PortfolioPerformance';
import { AssetAllocation } from '@/components/AssetAllocation';
import { HoldingsTable } from '@/components/HoldingsTable';
import {
  stocks,
  calculateSectorAllocations,
  getSectorColor,
  type Stock,
} from '@/utils/portfolioData';

const sectorAllocations = calculateSectorAllocations();

export default function Portfolio() {
  const isMobile = useIsMobile();
  const [expandedSectors, setExpandedSectors] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const [stockDetailInAllocation, setStockDetailInAllocation] = useState<Stock | null>(null);

  const toggleSector = (sector: string) => {
    const isOpen = expandedSectors.includes(sector);
    if (isOpen) {
      // Close the graph if already open
      setExpandedSectors([]);
      setIsGraphOpen(false);
    } else {
      // Open the graph for this sector only
      setExpandedSectors([sector]);
      setIsGraphOpen(true);
    }
  };

  const handleCloseGraph = () => {
    setExpandedSectors([]);
    setIsGraphOpen(false);
  };

  const handleStockSelect = (stock: Stock) => {
    if (selectedStock?.symbol === stock.symbol) {
      setSelectedStock(null);
      return;
    }

    setSelectedStock(stock);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const stockRow = document.getElementById(`stock-row-${stock.symbol}`);
    if (stockRow) {
      stockRow.classList.add('highlight-animation');
      setTimeout(() => {
        stockRow.classList.remove('highlight-animation');
      }, 1000);
    }
  };

  // New handler for stock selection within Asset Allocation
  const handleStockSelectInAllocation = (stock: Stock) => {
    if (stockDetailInAllocation?.symbol === stock.symbol) {
      // If same stock is clicked, close the detail view
      setStockDetailInAllocation(null);
    } else {
      // Open detail view for this stock
      setStockDetailInAllocation(stock);
    }
  };

  const handleCloseStockDetail = () => {
    setStockDetailInAllocation(null);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#fefefe] font-sans flex flex-col ">
      <PortfolioHeader />

      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-12">
        {/* Stock Details (from main selection) */}
        {selectedStock && (
          <div className="rounded-3xl p-6 bg-[#1e1e1e] shadow-xl hover:shadow-[0_0_15px_#3b7cc9] transition-all duration-300">
            <StockDetailAnalysis stock={selectedStock} />
          </div>
        )}

        {/* Performance and Asset Allocation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl p-6 bg-[#1e1e1e] shadow-md hover:shadow-[0_0_12px_#3b7cc9] transition-all duration-300">
            <PortfolioPerformance />
          </div>

          <div className="relative rounded-3xl p-6 bg-[#1e1e1e] shadow-md hover:shadow-[0_0_18px_#3b7cc9] transition-all duration-300">

            <AssetAllocation
              sectorAllocations={sectorAllocations}
              expandedSectors={expandedSectors}
              toggleSector={toggleSector}
              selectedStock={selectedStock}
              handleStockSelect={handleStockSelectInAllocation} // Use the new handler
              getSectorColor={getSectorColor}
            />
          </div>
        </div>

        {/* Holdings table - Hidden only when stock detail is open in Asset Allocation */}
        {!selectedStock && !stockDetailInAllocation && (
          <div className="rounded-3xl p-6 bg-[#1e1e1e] shadow-md hover:shadow-[0_0_12px_#3b7cc9] transition-all duration-300">
            <HoldingsTable
              stocks={stocks}
              selectedStock={selectedStock}
              handleStockSelect={handleStockSelect}
            />
          </div>
        )}

        {/* Additional content when stock detail is open in Asset Allocation */}
        {stockDetailInAllocation && (
          <div className="relative rounded-3xl p-6 bg-[#1e1e1e] shadow-xl hover:shadow-[0_0_15px_#3b7cc9] transition-all duration-300 border border-[#3b7cc9]/20">
            {/* Close Button for Stock Detail - Top Left */}
            <button
              onClick={handleCloseStockDetail}
              className="absolute top-4 left-4 z-30 px-4 py-2 rounded-full bg-[#3b7cc9] hover:bg-[#326bb5] transition-all duration-200 text-white font-semibold shadow-lg shadow-[#3b7cc9]/40 hover:shadow-[0_0_12px_#3b7cc9] transform hover:scale-105"
              aria-label="Close Stock Detail"
            >
              ✕ Close
            </button>
            
            <div className="flex items-center justify-between mb-6 pt-8">
              <h2 className="text-2xl font-bold text-[#fefefe]">
                Stock Analysis: {stockDetailInAllocation.symbol}
              </h2>
              <div className="flex items-center gap-2 text-sm text-[#fefefe]/70">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getSectorColor(stockDetailInAllocation.sector) }}
                ></div>
                {stockDetailInAllocation.sector}
              </div>
            </div>
            <StockDetailAnalysis stock={stockDetailInAllocation} />
          </div>
        )}
      </main>

      <style >{`
        .highlight-animation {
          animation: highlightGlow 1s ease;
        }
        @keyframes highlightGlow {
          0% {
            box-shadow: 0 0 8px #3b7cc9;
          }
          50% {
            box-shadow: 0 0 20px #3b7cc9;
          }
          100% {
            box-shadow: none;
          }
        }

        /* Smooth fade-in animation for stock details */
        .stock-detail-enter {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.3s ease forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Button hover effects */
        button:hover {
          transform: translateY(-1px);
        }

        /* Enhanced shadow effects */
        .shadow-glow {
          box-shadow: 0 0 20px rgba(59, 124, 201, 0.3);
        }
      `}</style>
    </div>
  );
}