import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  FileText, 
  Home, 
  LogOut, 
  Menu,
  Newspaper, 
  PieChart, 
  Settings, 
  User,
  X,
  ChevronLeft,
  ChevronRight, 
  CreditCard
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerTrigger 
} from '@/components/ui/drawer';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    icon: Home,
    label: 'Dashboard',
    href: '/dashboard'
  },
  {
    icon: PieChart,
    label: 'Portfolio',
    href: '/portfolio'
  },
  {
    icon: FileText,
    label: 'Reports',
    href: '/reports'
  },
  {
    icon: Newspaper,
    label: 'News',
    href: '/news'
  },
  {
    icon: BarChart,
    label: 'Stock Insights',
    href: '/insights'
  },
  {
    icon: CreditCard,
    label: 'Billing',
    href: '/billing'
  }, 
  {
    icon: Settings,
    label: 'Settings',
    href: '/settings'
  }
];

// Read and write sidebar state to localStorage (only for desktop)
const getSidebarState = () => {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('sidebar-collapsed');
  return saved === 'true';
};

const setSidebarState = (collapsed: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sidebar-collapsed', String(collapsed));
  }
};

export function SidebarNav() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => getSidebarState());

  useEffect(() => {
    setSidebarState(collapsed);
  }, [collapsed]);
  
  const toggleCollapsed = () => {
    setCollapsed(prev => !prev);
  };
  
  if (isMobile) {
    return (
      <>
        {/* Enhanced Mobile Drawer */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-md border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh] max-h-[90vh] bg-background/95 backdrop-blur-xl border-t-2">
            {/* Header with gradient background */}
            <div className="p-4 flex justify-between items-center border-b bg-gradient-to-r from-royal-light/10 to-royal-dark/10">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-royal-light via-royal to-royal-dark flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <span className="text-sm font-bold text-pearl tracking-tight">IA</span>
                  </div>
                  <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-background animate-pulse"></div>
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  imbue<span className="text-royal-light bg-gradient-to-r from-royal-light to-royal bg-clip-text text-transparent">.ai</span>
                </span>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive transition-colors">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>

            {/* Navigation Items with enhanced styling */}
            <div className="p-4 space-y-6 overflow-y-auto">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={cn(
                      "flex items-center gap-4 rounded-xl px-4 py-3 text-sm transition-all duration-300 group",
                      "hover:scale-[1.02] hover:shadow-md",
                      location.pathname.startsWith(item.href)
                        ? "bg-gradient-to-r from-royal-light/20 to-royal/10 text-royal-dark shadow-lg border border-royal-light/20"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      location.pathname.startsWith(item.href)
                        ? "bg-royal-light/20"
                        : "group-hover:bg-accent/30"
                    )}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Enhanced User Profile Section */}
            <div className="p-4 mt-auto border-t bg-gradient-to-r from-muted/30 to-muted/10">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-background/50 backdrop-blur-sm">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-muted to-accent flex items-center justify-center shadow-lg">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 ring-2 ring-background"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">Keval Mistry</p>
                  <p className="text-xs text-muted-foreground truncate">keval@example.com</p>
                </div>
                <Button size="icon" variant="ghost" className="hover:bg-destructive/10 hover:text-destructive transition-colors">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        
        {/* Enhanced Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-t-2 py-2 px-2 shadow-2xl">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {navItems.slice(0, 5).map((item, index) => (
              <Link 
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 transform hover:scale-105",
                  location.pathname.startsWith(item.href) 
                    ? "text-royal-light bg-royal-light/10 shadow-lg" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                )}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={cn(
                  "p-1 rounded-lg transition-colors",
                  location.pathname.startsWith(item.href) && "bg-royal-light/20"
                )}>
                  <item.icon size={20} />
                </div>
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </>
    );
  }
  
  // Enhanced Desktop sidebar
  return (
    <div 
      className={cn(
        "flex flex-col border-r h-screen bg-background/95 backdrop-blur-xl transition-all duration-500 ease-in-out shadow-xl",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Enhanced Header */}
      <div className={cn(
        "p-6 flex items-center border-b bg-gradient-to-r from-royal-light/5 to-royal-dark/5",
        collapsed ? "justify-center px-4" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-royal-light via-royal to-royal-dark flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <span className="text-sm font-bold text-pearl tracking-tight">IA</span>
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-background animate-pulse"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              imbue<span className="text-royal-light bg-gradient-to-r from-royal-light to-royal bg-clip-text text-transparent">.ai</span>
            </span>
          </div>
        )}
        
        {collapsed && (
          <div className="relative group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-royal-light via-royal to-royal-dark flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <span className="text-sm font-bold text-pearl tracking-tight">IA</span>
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-background animate-pulse"></div>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "flex justify-center items-center hover:bg-accent/50 hover:scale-110 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg",
            collapsed && "ml-auto"
          )}
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      {/* Enhanced Navigation Items */}
      <div className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center rounded-xl py-3 transition-all duration-300 group hover:scale-[1.02]",
                collapsed ? "justify-center px-3" : "px-4 gap-4",
                location.pathname.startsWith(item.href)
                  ? "bg-gradient-to-r from-royal-light/20 to-royal/10 text-royal-dark shadow-lg border border-royal-light/20"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground hover:shadow-md"
              )}
              title={collapsed ? item.label : undefined}
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                location.pathname.startsWith(item.href)
                  ? "bg-royal-light/20"
                  : "group-hover:bg-accent/30"
              )}>
                <item.icon className="h-5 w-5 flex-shrink-0" />
              </div>
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Enhanced User Profile Section */}
      <div className={cn(
        "border-t p-3 bg-gradient-to-r from-muted/20 to-muted/10",
        collapsed ? "items-center justify-center" : ""
      )}>
        <div className={cn(
          "flex items-center p-3 rounded-xl bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-background/70",
          collapsed ? "flex-col gap-2" : "gap-4"
        )}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-muted to-accent flex items-center justify-center shadow-lg">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-400 ring-2 ring-background"></div>
          </div>
          
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">Keval Mistry</p>
                <p className="text-xs text-muted-foreground truncate">keval@example.com</p>
              </div>
              <Button size="icon" variant="ghost" className="hover:bg-destructive/10 hover:text-destructive transition-colors rounded-xl">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}