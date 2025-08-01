import { useState } from "react";
import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { StatsCard } from "./StatsCard";
import { SalesChart } from "./SalesChart";
import { RecentOrders } from "./RecentOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <DashboardSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
              <p className="text-muted-foreground">Here's what's happening with your store today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Sales"
                value="$24,532"
                change="12.3%"
                changeType="increase"
                icon={<DollarSign className="h-6 w-6" />}
                gradient="bg-gradient-to-br from-primary to-primary/80"
              />
              <StatsCard
                title="Pending Orders"
                value="23"
                change="5.1%"
                changeType="increase"
                icon={<ShoppingCart className="h-6 w-6" />}
                gradient="bg-gradient-to-br from-accent to-accent/80"
              />
              <StatsCard
                title="Earnings"
                value="$18,249"
                change="8.7%"
                changeType="increase"
                icon={<TrendingUp className="h-6 w-6" />}
                gradient="bg-gradient-to-br from-success to-success/80"
              />
              <StatsCard
                title="Top Products"
                value="127"
                change="2.3%"
                changeType="decrease"
                icon={<Package className="h-6 w-6" />}
                gradient="bg-gradient-to-br from-gold to-gold/80"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Chart */}
              <div className="lg:col-span-2">
                <SalesChart />
              </div>

              {/* Subscription Status */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Subscription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/20">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-gold text-gold-foreground">Gold Vendor Plan</Badge>
                      <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                        Active
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-foreground">
                        <strong>$99/month</strong>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Renews on December 15, 2024
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Products Listed:</span>
                      <span className="font-medium text-foreground">127 / 500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Sales:</span>
                      <span className="font-medium text-foreground">$24,532 / $50,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Commission Rate:</span>
                      <span className="font-medium text-success">5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <RecentOrders />
          </div>
        </main>
      </div>
    </div>
  );
}