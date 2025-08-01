import { useState } from "react";
import { Download, Calendar, DollarSign, TrendingUp, Clock, CreditCard } from "lucide-react";
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

// Mock payouts data
const payouts = [
  {
    id: "PAY-001",
    amount: 1250.99,
    fees: 37.53,
    netAmount: 1213.46,
    date: "2024-03-15",
    status: "completed",
    method: "Bank Transfer",
    orders: 12,
    period: "Mar 1-7, 2024"
  },
  {
    id: "PAY-002",
    amount: 890.45,
    fees: 26.71,
    netAmount: 863.74,
    date: "2024-03-08",
    status: "completed",
    method: "PayPal",
    orders: 8,
    period: "Feb 22-28, 2024"
  },
  {
    id: "PAY-003",
    amount: 1580.20,
    fees: 47.41,
    netAmount: 1532.79,
    date: "2024-03-01",
    status: "processing",
    method: "Bank Transfer",
    orders: 15,
    period: "Feb 15-21, 2024"
  },
  {
    id: "PAY-004",
    amount: 2100.75,
    fees: 63.02,
    netAmount: 2037.73,
    date: "2024-02-22",
    status: "completed",
    method: "Bank Transfer",
    orders: 18,
    period: "Feb 8-14, 2024"
  },
  {
    id: "PAY-005",
    amount: 945.60,
    fees: 28.37,
    netAmount: 917.23,
    date: "2024-02-15",
    status: "completed",
    method: "PayPal",
    orders: 10,
    period: "Feb 1-7, 2024"
  }
];

export default function Payouts() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/20 text-success border-success/30">Completed</Badge>;
      case "processing":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Processing</Badge>;
      case "pending":
        return <Badge className="bg-muted text-muted-foreground">Pending</Badge>;
      case "failed":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalEarnings = payouts.reduce((sum, payout) => sum + payout.amount, 0);
  const totalFees = payouts.reduce((sum, payout) => sum + payout.fees, 0);
  const netEarnings = payouts.reduce((sum, payout) => sum + payout.netAmount, 0);

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
                <h1 className="text-3xl font-bold text-foreground">Payouts</h1>
                <p className="text-muted-foreground">Track your earnings and payout history</p>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Statement
              </Button>
            </div>

            {/* Current Balance */}
            <Card className="border-border shadow-sm bg-gradient-to-r from-primary/10 to-accent/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Available Balance</p>
                    <p className="text-4xl font-bold text-foreground">$2,847.32</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Next payout: March 22, 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Request Payout
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Minimum payout: $50
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                      <p className="text-2xl font-bold text-foreground">${totalEarnings.toFixed(2)}</p>
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
                      <p className="text-sm font-medium text-muted-foreground">Platform Fees</p>
                      <p className="text-2xl font-bold text-foreground">${totalFees.toFixed(2)}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Net Earnings</p>
                      <p className="text-2xl font-bold text-foreground">${netEarnings.toFixed(2)}</p>
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
                      <p className="text-sm font-medium text-muted-foreground">Avg. Payout Time</p>
                      <p className="text-2xl font-bold text-foreground">2.5 days</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payout Methods */}
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Payout Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Bank Transfer</p>
                          <p className="text-sm text-muted-foreground">****1234 - Primary</p>
                        </div>
                      </div>
                      <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">PayPal</p>
                          <p className="text-sm text-muted-foreground">john@vendorshop.com</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Add Method</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payout History */}
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Payout History ({payouts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payout ID</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Gross Amount</TableHead>
                      <TableHead>Fees</TableHead>
                      <TableHead>Net Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts.map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell className="font-medium text-foreground">{payout.id}</TableCell>
                        <TableCell className="text-muted-foreground">{payout.period}</TableCell>
                        <TableCell className="text-muted-foreground">{payout.orders}</TableCell>
                        <TableCell className="font-medium text-foreground">${payout.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-muted-foreground">-${payout.fees.toFixed(2)}</TableCell>
                        <TableCell className="font-medium text-success">${payout.netAmount.toFixed(2)}</TableCell>
                        <TableCell className="text-muted-foreground">{payout.method}</TableCell>
                        <TableCell className="text-muted-foreground">{payout.date}</TableCell>
                        <TableCell>{getStatusBadge(payout.status)}</TableCell>
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