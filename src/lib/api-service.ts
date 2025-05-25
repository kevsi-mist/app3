
import { updateStockData, updateNewsItem, updateFinancialReport, StockData, NewsItem, FinancialReport } from "./finance-service";
import { formatIndianRupees } from "@/utils/stockDataUtils";
import { toast } from "sonner";

// We'll use Alpha Vantage for the free API (would need a real API key in production)
const ALPHA_VANTAGE_API_KEY = "demo";
const ALPHA_VANTAGE_BASE_URL = "https://www.alphavantage.co/query";

// News API settings
const NEWS_API_KEY = "demo";
const NEWS_API_URL = "https://newsapi.org/v2/everything";

// Function to fetch latest stock price
export const fetchStockPrice = async (symbol: string): Promise<StockData | null> => {
  try {
    // In a real app, you would use the API, but for demo we'll generate fake data
    // const url = `${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    // const response = await fetch(url);
    // const data = await response.json();
    
    // For demo purposes, generate a random price change
    const basePrice = getBasePrice(symbol);
    const change = (Math.random() * 100) - 50;
    const changePercent = (change / basePrice) * 100;
    
    const stockData: StockData = {
      symbol,
      name: getStockName(symbol),
      price: basePrice + change,
      change,
      changePercent,
      lastUpdated: new Date() as any
    };
    
    // Save to Firebase
    await updateStockData(stockData);
    return stockData;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return null;
  }
};

// Function to fetch and save news
export const fetchLatestNews = async (symbols: string[]): Promise<NewsItem[]> => {
  try {
    // In a real app, you would use the API, but for demo we'll generate fake data
    // const symbolString = symbols.join(',');
    // const url = `${NEWS_API_URL}?q=${symbolString}&apiKey=${NEWS_API_KEY}`;
    // const response = await fetch(url);
    // const data = await response.json();
    
    // Generate fake news for demo
    const newsItems: NewsItem[] = [];
    
    for (let i = 0; i < symbols.length; i++) {
      if (Math.random() > 0.5) { // Only generate news for some symbols
        const symbol = symbols[i];
        const stockName = getStockName(symbol);
        const sentiments = ["positive", "negative", "neutral"] as const;
        const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
        
        const newsItem: NewsItem = {
          title: `${stockName} ${getRandomNewsTitle(sentiment)}`,
          source: getRandomNewsSource(),
          time: `${Math.floor(Math.random() * 12) + 1} hours ago`,
          url: "#",
          summary: [
            getRandomNewsSummary(stockName, sentiment),
            getRandomNewsSummary(stockName, sentiment),
            getRandomNewsSummary(stockName, sentiment)
          ],
          sentiment,
          relatedSymbols: [symbol]
        };
        
        // Save to Firebase
        await updateNewsItem(newsItem);
        newsItems.push(newsItem);
      }
    }
    
    return newsItems;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

// Function to fetch and update financial reports
export const updateFinancialReports = async (symbols: string[]): Promise<FinancialReport[]> => {
  // In a real app, this would fetch from a financial API
  // For our demo, we'll just return the existing reports
  // with updated timestamps
  
  try {
    const reports: FinancialReport[] = [];
    
    for (let i = 1; i <= 6; i++) {
      // Create a simple report based on the ID
      const report: FinancialReport = {
        id: i,
        title: getReportTitle(i),
        type: getReportType(i),
        date: new Date().toLocaleDateString(),
        summary: `This is an updated financial report #${i}`,
        keyPoints: [
          `Key point 1 for report #${i}`,
          `Key point 2 for report #${i}`,
          `Key point 3 for report #${i}`,
        ],
        recommendations: [
          `Recommendation 1 for report #${i}`,
          `Recommendation 2 for report #${i}`,
          `Recommendation 3 for report #${i}`,
        ],
        lastUpdated: new Date() as any
      };
      
      await updateFinancialReport(report);
      reports.push(report);
    }
    
    return reports;
  } catch (error) {
    console.error("Error updating reports:", error);
    return [];
  }
};

// Function to refresh all data
export const refreshAllData = async (symbols: string[] = ["RELIANCE", "TCS", "HDFCBANK", "INFY"]) => {
  toast.info("Fetching latest market data...");
  
  try {
    // Update stocks in parallel
    const stockPromises = symbols.map(symbol => fetchStockPrice(symbol));
    await Promise.all(stockPromises);
    
    // Fetch news
    await fetchLatestNews(symbols);
    
    // Update reports
    await updateFinancialReports(symbols);
    
    toast.success("All data refreshed", {
      description: "Latest prices, news, and reports have been updated."
    });
    
    return true;
  } catch (error) {
    console.error("Error refreshing data:", error);
    toast.error("Error refreshing data", {
      description: "Please try again later."
    });
    return false;
  }
};

// Helper functions for demo data
function getBasePrice(symbol: string): number {
  const prices: Record<string, number> = {
    'RELIANCE': 2500,
    'TCS': 3600,
    'HDFCBANK': 1700,
    'INFY': 1900,
    'BHARTIARTL': 850,
    'SBIN': 650,
  };
  
  return prices[symbol] || 1000;
}

function getStockName(symbol: string): string {
  const names: Record<string, string> = {
    'RELIANCE': 'Reliance Industries',
    'TCS': 'Tata Consultancy Services',
    'HDFCBANK': 'HDFC Bank',
    'INFY': 'Infosys',
    'BHARTIARTL': 'Bharti Airtel',
    'SBIN': 'State Bank of India',
  };
  
  return names[symbol] || symbol;
}

function getRandomNewsTitle(sentiment: string): string {
  const positiveTitles = [
    "Reports Strong Q2 Earnings",
    "Announces Strategic Partnership",
    "Stock Surges on Positive Outlook",
    "Expands Into New Markets",
    "Increases Dividend by 15%"
  ];
  
  const negativeTitles = [
    "Misses Analyst Expectations",
    "Restructures After Weak Quarter",
    "Faces Regulatory Challenges",
    "Cuts Revenue Guidance",
    "Stock Drops on Market Concerns"
  ];
  
  const neutralTitles = [
    "Announces Leadership Change",
    "Releases Annual Report",
    "Hosts Investor Conference",
    "Updates Growth Strategy",
    "Reorganizes Business Units"
  ];
  
  let titles;
  switch (sentiment) {
    case "positive":
      titles = positiveTitles;
      break;
    case "negative":
      titles = negativeTitles;
      break;
    default:
      titles = neutralTitles;
  }
  
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomNewsSource(): string {
  const sources = [
    "Economic Times",
    "Business Standard",
    "Mint",
    "Financial Express",
    "CNBC-TV18",
    "Bloomberg Quint",
    "Reuters"
  ];
  
  return sources[Math.floor(Math.random() * sources.length)];
}

function getRandomNewsSummary(stockName: string, sentiment: string): string {
  const positiveSummaries = [
    `${stockName} reported revenue growth exceeding market expectations`,
    `Analysts upgrade ${stockName} rating citing strong fundamentals`,
    `${stockName} announces new product launch in growing market segment`,
    `Institutional investors increase holdings in ${stockName}`,
    `${stockName} completes acquisition expected to boost profits`
  ];
  
  const negativeSummaries = [
    `${stockName} faces increased competition in core markets`,
    `Profit margins decline for ${stockName} due to rising costs`,
    `${stockName} delays product launch citing supply constraints`,
    `Analysts express concerns over ${stockName}'s growth strategy`,
    `${stockName} announces restructuring plans to address challenges`
  ];
  
  const neutralSummaries = [
    `${stockName} maintains market share despite industry challenges`,
    `${stockName} appoints new CFO effective next quarter`,
    `Industry regulations may impact ${stockName}'s operations`,
    `${stockName} responds to changing market dynamics with new initiatives`,
    `Investors await ${stockName}'s upcoming quarterly results`
  ];
  
  let summaries;
  switch (sentiment) {
    case "positive":
      summaries = positiveSummaries;
      break;
    case "negative":
      summaries = negativeSummaries;
      break;
    default:
      summaries = neutralSummaries;
  }
  
  return summaries[Math.floor(Math.random() * summaries.length)];
}

function getReportTitle(id: number): string {
  const titles = [
    "Nifty 50 Q1 Summary",
    "Annual Tax Report",
    "Dividend Income Statement",
    "Sensex Performance",
    "Asset Allocation",
    "Risk Assessment (SEBI Guidelines)"
  ];
  
  return titles[id - 1] || `Financial Report ${id}`;
}

function getReportType(id: number): string {
  const types = [
    "Quarterly",
    "Annual",
    "Income",
    "Performance",
    "Allocation",
    "Risk"
  ];
  
  return types[id - 1] || "Report";
}
