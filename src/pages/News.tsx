"use client";

import React from "react";
import clsx from "clsx";

const sourceColors: Record<string, { base: string; gradient: string }> = {
  "Economic Times": { base: "bg-blue-800", gradient: "from-blue-700 to-blue-900" },
  "Business Standard": { base: "bg-purple-800", gradient: "from-purple-700 to-purple-900" },
  Mint: { base: "bg-teal-800", gradient: "from-teal-700 to-teal-900" },
  "CNBC-TV18": { base: "bg-yellow-800", gradient: "from-yellow-600 to-yellow-800" },
  "Financial Express": { base: "bg-orange-800", gradient: "from-orange-700 to-orange-900" },
  "The Hindu BusinessLine": { base: "bg-red-800", gradient: "from-red-700 to-red-900" },
};

const sentimentConfig = {
  positive: {
    gradient: "bg-gradient-to-r from-green-700 to-green-900",
    icon: "📈",
  },
  neutral: {
    gradient: "bg-gradient-to-r from-yellow-600 to-yellow-800",
    icon: "⚖️",
  },
  negative: {
    gradient: "bg-gradient-to-r from-red-700 to-red-900",
    icon: "📉",
  },
};

const NewsCard = ({
  title,
  source,
  time,
  summary,
  sentiment,
  className = "",
}: {
  title: string;
  source: string;
  time: string;
  summary: string[];
  sentiment: "positive" | "neutral" | "negative";
  className?: string;
}) => {
  const sourceColor = sourceColors[source] || { base: "bg-gray-800", gradient: "from-gray-700 to-gray-900" };
  const sentimentData = sentimentConfig[sentiment];

  return (
    <div
      className={clsx(
        "p-8 rounded-3xl bg-[#1e1e1e] transition-transform duration-300 hover:shadow-lg hover:shadow-blue-700 hover:-translate-y-1",
        className
      )}
    >
      {/* Source block */}
      <div
        className={clsx(
          "relative w-20 h-20 mb-6 rounded-xl flex items-center justify-center select-none cursor-default",
          sourceColor.base,
          "shadow-md",
          "hover:shadow-lg hover:scale-105 transition-shadow transition-transform duration-300"
        )}
      >
        {/* Subtle layered shapes */}
        <div className="absolute top-0 left-0 w-14 h-14 rounded-tr-3xl bg-white/5 rotate-[35deg] origin-bottom-left"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 rounded-bl-3xl bg-white/8 -rotate-12 origin-top-right"></div>

        {/* Source initials */}
        <span
          className="text-white font-semibold text-2xl tracking-wider"
          title={source}
        >
          {source
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()}
        </span>
      </div>

      {/* Sentiment badge */}
      <span
        className={clsx(
          "inline-flex items-center gap-2 px-4 py-1 rounded-full text-white font-semibold text-xs uppercase",
          sentimentData.gradient,
          "select-none"
        )}
      >
        <span className="text-lg">{sentimentData.icon}</span>
        <span>{sentiment}</span>
      </span>

      <h2 className="mt-4 mb-3 text-2xl font-semibold tracking-tight">{title}</h2>

      <div className="text-sm text-gray-400 mb-6 flex justify-between font-mono">
        <span>{source}</span>
        <span>{time}</span>
      </div>

      <ul className="text-gray-300 list-disc list-inside space-y-1 text-sm">
        {summary.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default function News() {
  return (
    <main className="p-8 md:p-12 overflow-auto bg-[#121212] min-h-screen text-white font-sans">
      <div className="space-y-8 max-w-7xl mx-auto">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Financial News</h1>
          <p className="text-muted-foreground text-base">
            The latest market news and analysis.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsData.map((item) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}

const newsData = [
  {
    id: 1,
    title: "RBI Signals Potential Rate Decision in Next Policy Meeting",
    source: "Economic Times",
    time: "2 hours ago",
    summary: [
      "RBI governor indicates key policy rate decisions coming soon",
      "Markets responded positively with Nifty 50 gaining 1.2%",
      "Analysts predict 25-50 basis point adjustment by September",
    ],
    sentiment: "positive" as const,
  },
  {
    id: 2,
    title: "IT Sector Faces Headwinds as Global Tech Spending Slows",
    source: "Business Standard",
    time: "5 hours ago",
    summary: [
      "Major Indian IT firms reporting cautious client outlooks",
      "Potential impacts on hiring and revenue projections",
      "Industry leaders preparing for quarterly investor calls",
    ],
    sentiment: "negative" as const,
  },
  {
    id: 3,
    title: "Indian Supply Chain Resilience Post-Pandemic",
    source: "Mint",
    time: "8 hours ago",
    summary: [
      "Logistics costs dropping after global disruptions",
      "Manufacturing output increased by approximately 8%",
      "PLI scheme boosting domestic manufacturing capacity",
    ],
    sentiment: "positive" as const,
  },
  {
    id: 4,
    title: "Energy Stocks Surge on Rising Global Oil Prices",
    source: "CNBC-TV18",
    time: "1 day ago",
    summary: [
      "ONGC and Reliance stocks hit new 52-week highs",
      "Energy sector outperforming broader market this quarter",
      "Analysts revise outlook upward for remainder of 2025",
    ],
    sentiment: "positive" as const,
  },
  {
    id: 5,
    title: "Real Estate Market Shows Signs of Cooling After Record Prices",
    source: "Financial Express",
    time: "1 day ago",
    summary: [
      "Housing sales decreased 4.5% in metro cities compared to last quarter",
      "Average inventory holding period increased to 38 months",
      "Economists predict gradual normalization through 2025",
    ],
    sentiment: "neutral" as const,
  },
  {
    id: 6,
    title: "Cryptocurrency Regulations in India Face New Developments",
    source: "The Hindu BusinessLine",
    time: "2 days ago",
    summary: [
      "Finance Ministry considering new cryptocurrency framework",
      "Regulatory announcements creating market uncertainty",
      "Major exchanges preparing compliance strategies",
    ],
    sentiment: "negative" as const,
  },
];
