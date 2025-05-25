"use client";

import React, { useState, useEffect } from "react";
import { StockInsightCard } from "@/components/StockInsightCard";
import { MarketAlerts } from "@/components/MarketAlerts";
import { useFinance } from "@/contexts/FinanceContext";
import { insightsData, alertsData } from "@/data/insightsData";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function Insights() {
  const { isRefreshing, refreshData } = useFinance();
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState(insightsData);
  const [alerts, setAlerts] = useState(alertsData);

  useEffect(() => {
    const loadInsightsData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setInsights(insightsData);
        setAlerts(alertsData);
      } catch (error) {
        console.error("Error loading insights:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInsightsData();
  }, []);

  return (
    <main className="p-6 overflow-auto bg-[#121212] min-h-screen text-white font-sans">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Stock Insights</h1>
            <p className="text-muted-foreground text-sm mt-1 max-w-md">
              AI-powered market analysis and stock recommendations.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => refreshData()}
            disabled={isRefreshing}
            className={isRefreshing ? "animate-pulse border-blue-600 text-blue-400 hover:border-blue-700" : ""}
          >
            {isRefreshing && <Loader className="h-4 w-4 animate-spin mr-2" />}
            Refresh Data
          </Button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid gap-2 lg:grid-cols-2">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-700 rounded-xl p-6 space-y-4 animate-pulse bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
                  style={{ minHeight: 280 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-[180px] bg-gray-700 rounded-md" />
                    <div className="h-5 w-[60px] bg-gray-700 rounded-md" />
                  </div>
                  <div className="h-4 w-full bg-gray-700 rounded-md" />
                  <div className="h-4 w-3/4 bg-gray-700 rounded-md" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-700 rounded-md" />
                    <div className="h-6 w-16 bg-gray-700 rounded-md" />
                  </div>
                  <div className="h-[180px] w-full bg-gray-700 rounded-md" />
                </div>
              ))}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {insights.map((insight, index) => (
              <div
                key={insight.id}
                style={{ animationDelay: `${index * 150}ms` }}
                className="transform transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-700 rounded-xl border border-gradient p-[1.5px] bg-gradient-to-r from-blue-800 via-purple-800 to-pink-700"
              >
                <div className="bg-[#121212] rounded-lg p-6 shadow-md shadow-black/40 animate-fadeInUp">
                  <StockInsightCard {...insight} useFiscalPrice={true} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Market Alerts */}
        <MarketAlerts alerts={alerts} />
      </div>

      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease forwards;
        }

        .border-gradient {
          border-image-slice: 1;
          border-width: 1.5px;
          border-style: solid;
          border-image-source: linear-gradient(
            to right,
            #4f46e5,
          
          );
        }
      `}</style>
    </main>
  );
}
