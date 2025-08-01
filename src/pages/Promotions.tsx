import { useState } from "react";
import { Plus, Edit, Trash2, TrendingUp, Eye, Megaphone, Calendar } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock promotions data
const promotions = [
  {
    id: "PROMO-001",
    title: "Spring Sale 2024",
    description: "20% off on all electronics",
    discount: "20%",
    type: "percentage",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    status: "active",
    usedCount: 156,
    totalSavings: 3240.50,
    applicableProducts: ["Electronics"]
  },
  {
    id: "PROMO-002",
    title: "Free Shipping Weekend",
    description: "Free shipping on orders over $50",
    discount: "Free Shipping",
    type: "shipping",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    status: "active",
    usedCount: 89,
    totalSavings: 445.00,
    applicableProducts: ["All Products"]
  },
  {
    id: "PROMO-003",
    title: "New Customer Discount",
    description: "$10 off first order",
    discount: "$10",
    type: "fixed",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    usedCount: 234,
    totalSavings: 2340.00,
    applicableProducts: ["All Products"]
  },
  {
    id: "PROMO-004",
    title: "Valentine's Day Special",
    description: "15% off on selected items",
    discount: "15%",
    type: "percentage",
    startDate: "2024-02-10",
    endDate: "2024-02-14",
    status: "expired",
    usedCount: 67,
    totalSavings: 890.25,
    applicableProducts: ["Gift Items"]
  },
  {
    id: "PROMO-005",
    title: "Flash Sale",
    description: "24 hours only - 30% off",
    discount: "30%",
    type: "percentage",
    startDate: "2024-03-20",
    endDate: "2024-03-21",
    status: "scheduled",
    usedCount: 0,
    totalSavings: 0,
    applicableProducts: ["Clearance Items"]
  }
];

export default function Promotions() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/20 text-success border-success/30">Active</Badge>;
      case "scheduled":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Scheduled</Badge>;
      case "expired":
        return <Badge className="bg-muted text-muted-foreground">Expired</Badge>;
      case "paused":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Paused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDiscountBadge = (type: string, discount: string) => {
    switch (type) {
      case "percentage":
        return <Badge className="bg-gold/20 text-gold border-gold/30">{discount}</Badge>;
      case "fixed":
        return <Badge className="bg-accent/20 text-accent border-accent/30">{discount}</Badge>;
      case "shipping":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Free Ship</Badge>;
      default:
        return <Badge variant="outline">{discount}</Badge>;
    }
  };

  const activePromotions = promotions.filter(p => p.status === "active").length;
  const totalSavings = promotions.reduce((sum, p) => sum + p.totalSavings, 0);
  const totalUsage = promotions.reduce((sum, p) => sum + p.usedCount, 0);

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
                <h1 className="text-3xl font-bold text-foreground">Promotions</h1>
                <p className="text-muted-foreground">Create and manage promotional campaigns</p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Promotion
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Active Promotions</p>
                      <p className="text-2xl font-bold text-foreground">{activePromotions}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Megaphone className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Total Usage</p>
                      <p className="text-2xl font-bold text-foreground">{totalUsage}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Customer Savings</p>
                      <p className="text-2xl font-bold text-foreground">${totalSavings.toFixed(2)}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold text-foreground">23.5%</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-gold" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Megaphone className="h-6 w-6" />
                    <span>Flash Sale</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Calendar className="h-6 w-6" />
                    <span>Seasonal Campaign</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <TrendingUp className="h-6 w-6" />
                    <span>Customer Loyalty</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Promotions Table */}
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  All Promotions ({promotions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Promotion</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Savings</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promotions.map((promotion) => (
                      <TableRow key={promotion.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{promotion.title}</p>
                            <p className="text-sm text-muted-foreground">{promotion.description}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {promotion.applicableProducts.join(", ")}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getDiscountBadge(promotion.type, promotion.discount)}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm text-foreground">{promotion.startDate}</p>
                            <p className="text-sm text-muted-foreground">to {promotion.endDate}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          {promotion.usedCount} times
                        </TableCell>
                        <TableCell className="font-medium text-success">
                          ${promotion.totalSavings.toFixed(2)}
                        </TableCell>
                        <TableCell>{getStatusBadge(promotion.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Promotion
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <TrendingUp className="h-4 w-4 mr-2" />
                                View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}