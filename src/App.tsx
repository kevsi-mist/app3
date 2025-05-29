import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

import Dashboard from '@/pages/Dashboard';
import Portfolio from '@/pages/Portfolio';
import Insights from '@/pages/Insights';
import Reports from '@/pages/Reports';
import Billing from './pages/billings';
import News from '@/pages/News';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import { SidebarNav } from '@/components/SidebarNav';
import { MobileNav } from '@/components/mobile_nav';
import { useIsMobile } from '@/hooks/use-mobile';
import { FinanceProvider } from '@/contexts/FinanceContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Layout component to wrap all pages with a sidebar
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
   
  return (
    <div className="flex h-screen w-full bg-background">
      {!isMobile && !isLoginPage && <SidebarNav />}
             
      <div className="flex-1 flex flex-col h-screen overflow-y-auto transition-all duration-300">
        {children}
      </div>
      
      {/* Mobile Navigation - only show on mobile and not on login page */}
      {isMobile && !isLoginPage && <MobileNav />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <FinanceProvider>
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/portfolio" element={
                <ProtectedRoute>
                  <Portfolio />
                </ProtectedRoute>
              } />
              <Route path="/insights" element={
                <ProtectedRoute>
                  <Insights />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/news" element={
                <ProtectedRoute>
                  <News />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/billing" element={
                <ProtectedRoute>
                  <Billing />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
          <Toaster />
        </Router>
      </FinanceProvider>
    </ThemeProvider>
  );
}