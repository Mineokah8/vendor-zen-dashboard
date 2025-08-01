import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock product data
const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    category: "Electronics",
    price: 89.99,
    stock: 45,
    status: "active",
    image: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Premium Coffee Beans - 1kg",
    sku: "PCB-002",
    category: "Food & Beverage",
    price: 24.99,
    stock: 12,
    status: "active",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Yoga Mat Pro",
    sku: "YMP-003",
    category: "Sports & Fitness",
    price: 39.99,
    stock: 0,
    status: "out_of_stock",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Smart Watch Series X",
    sku: "SWX-004",
    category: "Electronics",
    price: 299.99,
    stock: 23,
    status: "active",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Organic Hand Cream",
    sku: "OHC-005",
    category: "Beauty & Health",
    price: 15.99,
    stock: 67,
    status: "active",
    image: "/placeholder.svg"
  }
];

export default function Products() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/20 text-success border-success/30">Active</Badge>;
      case "out_of_stock":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Out of Stock</Badge>;
      case "draft":
        return <Badge className="bg-muted text-muted-foreground">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category))];

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
                <h1 className="text-3xl font-bold text-foreground">Products</h1>
                <p className="text-muted-foreground">Manage your product inventory and listings</p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                    <p className="text-2xl font-bold text-foreground">{products.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Active Products</p>
                    <p className="text-2xl font-bold text-foreground">
                      {products.filter(p => p.status === "active").length}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                    <p className="text-2xl font-bold text-destructive">
                      {products.filter(p => p.status === "out_of_stock").length}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search products by name or SKU..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Table */}
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Product Inventory ({filteredProducts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-8 h-8 rounded object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{product.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                        <TableCell className="text-muted-foreground">{product.category}</TableCell>
                        <TableCell className="font-medium text-foreground">${product.price}</TableCell>
                        <TableCell>
                          <span className={product.stock === 0 ? "text-destructive" : "text-foreground"}>
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(product.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Product
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