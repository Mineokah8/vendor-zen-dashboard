import { useState } from "react";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  MessageSquare,
  DollarSign,
  Megaphone,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const menuItems = [
  { icon: BarChart3, label: "Dashboard", path: "/" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: ShoppingCart, label: "Orders", path: "/orders" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: TrendingUp, label: "Analytics", path: "/analytics" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: DollarSign, label: "Payouts", path: "/payouts" },
  { icon: Megaphone, label: "Promotions", path: "/promotions" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function DashboardSidebar({ collapsed, onToggle }: DashboardSidebarProps) {
  const location = useLocation();
  
  return (
    <aside
      className={cn(
        "bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col h-full",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant={location.pathname === item.path ? "default" : "ghost"}
            className={cn(
              "w-full justify-start h-10 transition-all duration-200",
              collapsed ? "px-2" : "px-3",
              location.pathname === item.path && "bg-primary text-primary-foreground"
            )}
            onClick={() => window.location.href = item.path}
          >
            <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Button>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <div className={cn(
          "p-3 rounded-lg bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/20",
          collapsed && "p-2"
        )}>
          {!collapsed ? (
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs font-medium text-foreground">Gold Vendor Plan</span>
              </div>
              <p className="text-xs text-muted-foreground">Active until Dec 2024</p>
            </div>
          ) : (
            <div className="w-2 h-2 bg-success rounded-full mx-auto"></div>
          )}
        </div>
      </div>
    </aside>
  );
}