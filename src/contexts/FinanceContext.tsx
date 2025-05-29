import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { subscribeToAuthChanges } from '@/lib/auth-service';
import { refreshAllData } from '@/lib/api-service';
import { checkForUpdates } from '@/lib/finance-service';
import { toast } from "sonner";

interface FinanceContextType {
  user: User | null;
  loading: boolean;
  isRefreshing: boolean;
  lastUpdated: Date | null;
  refreshData: () => Promise<void>;
  hasUpdates: boolean;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [hasUpdates, setHasUpdates] = useState(false);
  const [symbols] = useState(['RELIANCE', 'TCS', 'HDFCBANK', 'INFY']);

  // Subscribe to auth changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Initial data load
  useEffect(() => {
    if (!loading) {
      refreshData();
      
      // Set up periodic check for updates
      const checkInterval = setInterval(async () => {
        const updates = await checkForUpdates(symbols);
        setHasUpdates(updates);
      }, 60000); // Check every minute
      
      return () => clearInterval(checkInterval);
    }
  }, [loading, symbols]);

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      await refreshAllData(symbols);
      setLastUpdated(new Date());
      setHasUpdates(false);
    } catch (error) {
      toast.error("Failed to refresh data");
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const value = {
    user,
    loading,
    isRefreshing,
    lastUpdated,
    refreshData,
    hasUpdates,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};