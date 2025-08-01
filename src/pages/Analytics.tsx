import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock analytics data
const salesData = [
  { month: "Jan", sales: 4000, orders: 24, customers: 12 },
  { month: "Feb", sales: 3000, orders: 18, customers: 15 },
  { month: "Mar", sales: 5000, orders: 32, customers: 20 },
  { month: "Apr", sales: 4500, orders: 28, customers: 18 },
  { month: "May", sales: 6000, orders: 38, customers: 25 },
  { month: "Jun", sales: 5500, orders: 35, customers: 22 },
];

const categoryData = [
  { name: "Electronics", value: 35, sales: 15400 },
  { name: "Clothing", value: 25, sales: 11200 },
  { name: "Home & Garden", value: 20, sales: 8900 },
  { name: "Sports", value: 12, sales: 5300 },
  { name: "Books", value: 8, sales: 3600 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--gold))', 'hsl(var(--success))', 'hsl(var(--warning))'];

const topProducts = [
  { name: "Wireless Headphones", sales: 156, revenue: 13940 },
  { name: "Smart Watch", sales: 89, revenue: 26670 },
  { name: "Coffee Beans", sales: 234, revenue: 5850 },
  { name: "Yoga Mat", sales: 67, revenue: 2680 },
  { name: "Laptop Stand", sales: 45, revenue: 2250 },
];

export default function Analytics() {
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
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
                <p className="text-muted-foreground">Track your business performance and insights</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Report
                </Button>
                <Button>Export Data</Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold text-foreground">$28,000</p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-success" />
                        <span className="text-xs font-medium text-success">+12.5%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold text-foreground">175</p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-success" />
                        <span className="text-xs font-medium text-success">+8.2%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">New Customers</p>
                      <p className="text-2xl font-bold text-foreground">112</p>
                      <div className="flex items-center space-x-1">
                        <TrendingDown className="h-3 w-3 text-destructive" />
                        <span className="text-xs font-medium text-destructive">-2.4%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
                      <Users className="h-6 w-6 text-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Avg. Order Value</p>
                      <p className="text-2xl font-bold text-foreground">$160</p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-success" />
                        <span className="text-xs font-medium text-success">+5.8%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-gold" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Trend */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Sales Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          color: "hsl(var(--foreground))"
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Volume */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Monthly Order Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          color: "hsl(var(--foreground))"
                        }}
                      />
                      <Bar dataKey="orders" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">${product.revenue.toLocaleString()}</p>
                        <Badge variant="outline" className="text-xs">
                          {((product.revenue / 47390) * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}