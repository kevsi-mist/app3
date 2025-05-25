import React, { useState } from 'react';
import { SidebarNav } from "@/components/SidebarNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, IndianRupee, LandPlot, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Reports() {
  const [expandedReport, setExpandedReport] = useState<number | null>(null);

  const toggleReport = (id: number) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 overflow-auto bg-background">
        <div className="space-y-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-primary text-white">Indian Financial Reports</h1>
            <LandPlot className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground">View and analyze your Indian stock market investments and financial statements.</p>
          
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {reportsData.map((report) => (
              <Card
                key={report.id}
                className={cn(
                  "bg-[#121212] border border-[#3b7cc9]/70 rounded-2xl shadow-lg p-7 flex flex-col hover:shadow-blue-800/60 transition-shadow duration-300 relative",
                  expandedReport === report.id
                    ? "col-span-full w-full h-[600px] overflow-y-auto"
                    : ""
                )}
              >
                {/* Improved floating circle: repositioned and blurred */}
                <div className="absolute top-5 right-5 w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 filter blur-xl opacity-50 pointer-events-none"></div>
                
                <CardHeader className="flex flex-row items-center space-x-2 border-b border-border/20 pb-3 relative z-10">
                  {report.icon === 'rupee' ? (
                    <IndianRupee className="h-5 w-5 text-primary" />
                  ) : (
                    <FileText className="h-5 w-5 text-primary" />
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-lg font-medium text-white">{report.title}</CardTitle>
                  </div>
                  {expandedReport === report.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setExpandedReport(null)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="pt-4 relative z-10">
                  {expandedReport === report.id ? (
                    <div className="space-y-4 animate-fade-in">
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Full Report Summary</h3>
                          <p className="text-muted-foreground">{report.fullSummary}</p>

                          {report.keyPoints && (
                            <div className="mt-6">
                              <h4 className="font-medium mb-2">Key Points</h4>
                              <ul className="list-disc list-inside space-y-2">
                                {report.keyPoints.map((point, idx) => (
                                  <li key={idx} className="text-muted-foreground">{point}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {report.recommendations && (
                            <div className="mt-6">
                              <h4 className="font-medium mb-2">Recommendations</h4>
                              <ul className="list-disc list-inside space-y-2">
                                {report.recommendations.map((rec, idx) => (
                                  <li key={idx} className="text-muted-foreground">{rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{report.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{report.date}</span>
                        <Badge className="bg-primary text-white hover:bg-primary/80 border-none">
                          {report.type}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4 text-primary border-primary/20 hover:bg-primary/10"
                        onClick={() => toggleReport(report.id)}
                      >
                        View Full Summary
                      </Button>
                    </>
                  )}
                </CardContent>

                <div className="h-1 w-full bg-gradient-to-r from-primary/30 to-primary/60"></div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

const reportsData = [
  {
    id: 1,
    title: "NSE Nifty 50 Q1 Summary",
    description: "A comprehensive analysis of your Nifty 50 index investments for Q1 2025.",
    date: "May 1, 2025",
    type: "Quarterly",
    icon: "rupee",
    fullSummary: "The Nifty 50 index has shown remarkable resilience in Q1 2025, registering a growth of 11.2% compared to the previous quarter. Your portfolio of Nifty 50 stocks has outperformed the broader market with a 13.5% return. Key contributors to this performance have been Reliance Industries and HDFC Bank, which constitute 18% of your Nifty 50 holdings. The technology sector, represented by TCS and Infosys in your portfolio, has shown mixed results with TCS delivering strong performance while Infosys faced headwinds due to reduced spending in the US market. Overall, the Q1 performance bodes well for the rest of the fiscal year.",
    keyPoints: [
      "Portfolio return: 13.5% vs. Nifty 50 index return: 11.2%",
      "Reliance Industries led performance with 17.9% returns",
      "IT sector showed mixed performance with TCS up 13.5% but Infosys lagging at 10.4%",
      "Banking sector strengthened with HDFC Bank up 13.7%"
    ],
    recommendations: [
      "Consider increasing allocation to banking sector given strong fundamentals",
      "Review Infosys position relative to other IT companies",
      "Add exposure to pharmaceutical sector which is underrepresented"
    ]
  },
  {
    id: 2,
    title: "Annual Tax Report (India)",
    description: "Complete tax information for your investment activities in the fiscal year as per Indian tax laws.",
    date: "March 31, 2025",
    type: "Annual",
    icon: "file",
    fullSummary: "This annual tax report provides a detailed breakdown of your investment returns, capital gains, and dividend income for the fiscal year 2024-25 in accordance with Indian tax laws. Your portfolio generated total short-term capital gains of ₹132,450 taxable at your income tax slab rate. Long-term capital gains from equity exceed the ₹1 lakh exemption by ₹245,700, attracting 10% tax without indexation benefit. Dividend income amounts to ₹78,925 and is taxable at your income tax slab rate. The report includes detailed transaction records required for ITR filing. All Securities Transaction Tax (STT) has been paid at the time of transactions. Consult with your tax advisor before filing your returns.",
    keyPoints: [
      "Short-term capital gains: ₹132,450 (taxable at income tax slab rate)",
      "Long-term capital gains above exemption limit: ₹245,700 (10% tax)",
      "Dividend income: ₹78,925 (taxable at income tax slab rate)",
      "Total STT paid: ₹14,325"
    ],
    recommendations: [
      "Consider tax-loss harvesting before fiscal year end",
      "Evaluate holding periods to maximize long-term capital gains benefits",
      "Review dividend-yielding stocks in light of tax implications"
    ]
  },
  {
    id: 3,
    title: "Dividend Income Statement",
    description: "Detailed breakdown of all dividend income from your Indian stock investments.",
    date: "April 10, 2025",
    type: "Income",
    icon: "rupee",
    fullSummary: "Your portfolio generated a total dividend income of ₹78,925 for the fiscal year, representing a dividend yield of 2.3% on your total equity investment value. The highest dividend contributions came from your investments in ITC Limited (₹24,600) and Reliance Industries (₹18,750), which together account for 55% of your total dividend income. Dividend payments were received quarterly and reinvested to maximize compounding effects. The dividend reinvestment plan (DRIP) has added approximately ₹5,200 in value over the year. Keep in mind that dividend income is taxable as per Indian income tax slabs and must be declared in your ITR.",
    keyPoints: [
      "Total dividend income: ₹78,925",
      "Top dividend payers: ITC Ltd (₹24,600), Reliance Industries (₹18,750)",
      "Dividend yield: 2.3%",
      "DRIP reinvested ₹5,200 adding to portfolio value"
    ],
    recommendations: [
      "Consider DRIP for additional compounding benefits",
      "Review dividend-paying stocks for sustainable yields",
      "Monitor tax implications on dividend income"
    ]
  },
  {
    id: 4,
    title: "Quarterly Corporate Earnings",
    description: "Summary of corporate earnings from your portfolio companies for Q1 2025.",
    date: "May 15, 2025",
    type: "Quarterly",
    icon: "file",
    fullSummary: "Corporate earnings for Q1 2025 from your portfolio companies reflect positive growth across most sectors. Reliance Industries reported a 7% increase in net profit driven by petrochemical and digital services. HDFC Bank’s net interest income rose by 9%, supported by strong loan growth. IT companies such as TCS and Infosys showed revenue growth of 6% and 4% respectively, with TCS benefiting from a strong deal pipeline. However, pharmaceutical stocks like Sun Pharma faced a decline in earnings due to pricing pressures. Overall, the earnings season supports the positive outlook for your portfolio for the next two quarters.",
    keyPoints: [
      "Reliance Industries net profit up 7%",
      "HDFC Bank net interest income up 9%",
      "TCS revenue growth of 6%, Infosys 4%",
      "Sun Pharma earnings declined by 5%"
    ],
    recommendations: [
      "Maintain exposure to strong performing sectors like banking and IT",
      "Consider trimming positions in pharmaceutical stocks facing pressure",
      "Stay updated on upcoming corporate results for better timing"
    ]
  },
  {
    id: 5,
    title: "Market Volatility Analysis",
    description: "Insight into the recent volatility patterns observed in the Indian stock markets.",
    date: "May 20, 2025",
    type: "Analysis",
    icon: "file",
    fullSummary: "The Indian markets experienced elevated volatility during the past quarter due to geopolitical tensions and fluctuating crude oil prices. The Nifty Volatility Index (VIX) averaged 18.5%, compared to the historical average of 14.7%. Mid-cap and small-cap stocks exhibited higher price swings, impacting overall portfolio risk. Investors are advised to maintain a diversified portfolio and consider hedging strategies. Sector rotation was observed with defensive stocks gaining momentum over cyclical sectors during periods of uncertainty.",
    keyPoints: [
      "Nifty VIX averaged 18.5%, above historical average",
      "Mid-cap and small-cap stocks showed higher volatility",
      "Defensive sectors outperformed cyclical sectors",
      "Geopolitical risks remain a key factor"
    ],
    recommendations: [
      "Diversify across sectors to mitigate risk",
      "Consider hedging with index options",
      "Monitor crude oil price trends closely"
    ]
  },
  {
    id: 6,
    title: "Monetary Policy Update - RBI",
    description: "Review of the latest Reserve Bank of India monetary policy decisions and their impact.",
    date: "May 25, 2025",
    type: "Policy",
    icon: "file",
    fullSummary: "The Reserve Bank of India in its May 2025 policy meeting maintained the repo rate at 6.5%, focusing on balancing inflation control with growth support. The inflation rate moderated to 5.1%, while GDP growth forecast stands at 6.2% for FY 2025-26. RBI reiterated its commitment to ensure liquidity in the system and support credit flow to productive sectors. This stance is expected to benefit banking and infrastructure sectors. Investors should watch for potential rate changes in upcoming quarters as inflation dynamics evolve.",
    keyPoints: [
      "Repo rate maintained at 6.5%",
      "Inflation at 5.1%, GDP growth forecast 6.2%",
      "RBI focusing on liquidity and credit flow",
      "Positive outlook for banking and infrastructure sectors"
    ],
    recommendations: [
      "Stay invested in banking and infrastructure stocks",
      "Monitor inflation data for potential rate changes",
      "Review fixed income allocations based on RBI stance"
    ]
  }
];
