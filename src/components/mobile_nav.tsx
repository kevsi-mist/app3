import { Home, PieChart, User, BarChart3, Newspaper, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const MobileNav = () => {
    const { pathname } = useLocation();

    const navItems = [
        { to: "/dashboard", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
        { to: "/portfolio", icon: <PieChart className="h-5 w-5" />, label: "Portfolio" },
        { to: "/insights", icon: <BarChart3 className="h-5 w-5" />, label: "Insights" },
        { to: "/reports", icon: <PieChart className="h-5 w-5" />, label: "Reports" },
        { to: "/news", icon: <Newspaper className="h-5 w-5" />, label: "News" },
        { to: "/settings", icon: <Settings className="h-5 w-5" />, label: "Settings" },
        { to: "/billings", icon: <User className="h-5 w-5" />, label: "Billing" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t flex justify-around py-2 md:hidden">
            {navItems.map((item) => (
                <Link
                    key={item.to}
                    to={item.to}
                    className={`flex flex-col items-center text-sm ${
                        pathname === item.to ? "text-blue-500" : "text-muted-foreground"
                    }`}
                >
                    {item.icon}
                    <span>{item.label}</span>
                </Link>
            ))}
        </div>
    );
};