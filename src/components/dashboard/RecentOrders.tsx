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

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "Sarah Johnson",
    status: "completed",
    total: "$129.99",
    date: "2024-01-15",
  },
  {
    id: "#ORD-002",
    customer: "Mike Chen",
    status: "processing",
    total: "$89.50",
    date: "2024-01-15",
  },
  {
    id: "#ORD-003",
    customer: "Emma Davis",
    status: "shipped",
    total: "$245.00",
    date: "2024-01-14",
  },
  {
    id: "#ORD-004",
    customer: "John Smith",
    status: "pending",
    total: "$67.25",
    date: "2024-01-14",
  },
  {
    id: "#ORD-005",
    customer: "Lisa Wilson",
    status: "completed",
    total: "$189.99",
    date: "2024-01-13",
  },
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    completed: { variant: "default" as const, className: "bg-success text-success-foreground" },
    processing: { variant: "secondary" as const, className: "bg-warning/20 text-warning border-warning/30" },
    shipped: { variant: "outline" as const, className: "bg-accent/20 text-accent border-accent/30" },
    pending: { variant: "outline" as const, className: "bg-muted text-muted-foreground" },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  
  return (
    <Badge variant={config.variant} className={config.className}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export function RecentOrders() {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Order ID</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Total</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/50">
                <TableCell className="font-medium text-primary">{order.id}</TableCell>
                <TableCell className="text-foreground">{order.customer}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="font-semibold text-foreground">{order.total}</TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}