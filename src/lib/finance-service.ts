
import { collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db, getCurrentUserId } from "./firebase";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

// Data types
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: Timestamp;
}

export interface NewsItem {
  title: string;
  source: string;
  time: string;
  url: string;
  summary: string[];
  sentiment: "positive" | "negative" | "neutral";
  relatedSymbols: string[];
}

export interface FinancialReport {
  id: number;
  title: string;
  type: string;
  date: string;
  summary: string;
  keyPoints: string[];
  recommendations: string[];
  lastUpdated: Timestamp;
}

// Collection paths
const STOCKS_COLLECTION = 'stocks';
const NEWS_COLLECTION = 'news';
const REPORTS_COLLECTION = 'reports';
const PORTFOLIO_COLLECTION = 'portfolios';

// Helper for getting user-specific collection
const getUserCollection = (collection: string) => {
  const userId = getCurrentUserId();
  return `users/${userId}/${collection}`;
};

// Stock data operations
export const getStockData = async (symbol: string): Promise<StockData | null> => {
  try {
    const docRef = doc(db, STOCKS_COLLECTION, symbol);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as StockData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    return null;
  }
};

export const updateStockData = async (stockData: StockData): Promise<void> => {
  try {
    const docRef = doc(db, STOCKS_COLLECTION, stockData.symbol);
    await setDoc(docRef, {
      ...stockData,
      lastUpdated: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error(`Error updating stock data for ${stockData.symbol}:`, error);
  }
};

// Portfolio operations
export const getUserPortfolio = async () => {
  try {
    const docRef = doc(db, getUserCollection(PORTFOLIO_COLLECTION), 'main');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
};

export const updateUserPortfolio = async (portfolio: any) => {
  try {
    const docRef = doc(db, getUserCollection(PORTFOLIO_COLLECTION), 'main');
    await setDoc(docRef, {
      ...portfolio,
      lastUpdated: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error("Error updating portfolio:", error);
  }
};

// News operations
export const getNews = async (symbols: string[] = []): Promise<NewsItem[]> => {
  try {
    let newsQuery;
    
    if (symbols.length > 0) {
      newsQuery = query(
        collection(db, NEWS_COLLECTION), 
        where("relatedSymbols", "array-contains-any", symbols)
      );
    } else {
      newsQuery = collection(db, NEWS_COLLECTION);
    }
    
    const querySnapshot = await getDocs(newsQuery);
    const news: NewsItem[] = [];
    
    querySnapshot.forEach((doc) => {
      news.push(doc.data() as NewsItem);
    });
    
    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export const updateNewsItem = async (newsItem: NewsItem) => {
  try {
    // Use a deterministic ID based on the title
    const docId = newsItem.title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const docRef = doc(db, NEWS_COLLECTION, docId);
    await setDoc(docRef, {
      ...newsItem,
      lastUpdated: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error("Error updating news:", error);
  }
};

// Financial reports operations
export const getFinancialReports = async (): Promise<FinancialReport[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, REPORTS_COLLECTION));
    const reports: FinancialReport[] = [];
    
    querySnapshot.forEach((doc) => {
      reports.push(doc.data() as FinancialReport);
    });
    
    return reports;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
};

export const updateFinancialReport = async (report: FinancialReport) => {
  try {
    const docRef = doc(db, REPORTS_COLLECTION, report.id.toString());
    await setDoc(docRef, {
      ...report,
      lastUpdated: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error("Error updating report:", error);
  }
};

// Helper to format timestamps
export const formatLastUpdated = (timestamp: Timestamp | null | undefined) => {
  if (!timestamp) return "Never";
  
  try {
    const date = timestamp.toDate();
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (e) {
    return "Unknown";
  }
};

// Check for updates and notify
export const checkForUpdates = async (symbols: string[]): Promise<boolean> => {
  try {
    let hasUpdates = false;
    
    // For demo purposes, we'll just get the first stock
    if (symbols.length > 0) {
      const stockData = await getStockData(symbols[0]);
      
      if (stockData && stockData.lastUpdated) {
        const lastUpdate = stockData.lastUpdated.toDate();
        const now = new Date();
        
        // If last update was less than 5 minutes ago, consider it an update
        if ((now.getTime() - lastUpdate.getTime()) < 5 * 60 * 1000) {
          hasUpdates = true;
          toast("Portfolio data updated", {
            description: `Latest prices for your stocks have been updated`
          });
        }
      }
    }
    
    return hasUpdates;
  } catch (error) {
    console.error("Error checking for updates:", error);
    return false;
  }
};
