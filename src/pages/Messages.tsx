import { useState } from "react";
import { Send, Search, Filter, MoreHorizontal, MessageCircle, Mail, Star } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

// Mock messages data
const messages = [
  {
    id: "1",
    customer: "Sarah Johnson",
    email: "sarah.j@email.com",
    subject: "Question about product availability",
    message: "Hi, I was wondering if the wireless headphones will be back in stock soon?",
    date: "2024-03-15",
    time: "10:30 AM",
    status: "unread",
    priority: "medium",
    type: "inquiry"
  },
  {
    id: "2",
    customer: "Mike Chen",
    email: "mike.chen@email.com",
    subject: "Order delivery issue",
    message: "My order hasn't arrived yet and it's been over a week. Can you help?",
    date: "2024-03-14",
    time: "2:15 PM",
    status: "read",
    priority: "high",
    type: "complaint"
  },
  {
    id: "3",
    customer: "Emma Davis",
    email: "emma.d@email.com",
    subject: "Product review",
    message: "I absolutely love the yoga mat I purchased! Quality is excellent.",
    date: "2024-03-14",
    time: "9:45 AM",
    status: "replied",
    priority: "low",
    type: "review"
  },
  {
    id: "4",
    customer: "Alex Wilson",
    email: "alex.w@email.com",
    subject: "Bulk order inquiry",
    message: "I'm interested in placing a bulk order for our company. Can we discuss pricing?",
    date: "2024-03-13",
    time: "4:20 PM",
    status: "unread",
    priority: "high",
    type: "inquiry"
  },
  {
    id: "5",
    customer: "Lisa Brown",
    email: "lisa.b@email.com",
    subject: "Return request",
    message: "I need to return the coffee beans as they were damaged during shipping.",
    date: "2024-03-12",
    time: "11:55 AM",
    status: "read",
    priority: "medium",
    type: "return"
  }
];

export default function Messages() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Unread</Badge>;
      case "read":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Read</Badge>;
      case "replied":
        return <Badge className="bg-success/20 text-success border-success/30">Replied</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">High</Badge>;
      case "medium":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Medium</Badge>;
      case "low":
        return <Badge className="bg-success/20 text-success border-success/30">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "inquiry":
        return <MessageCircle className="h-4 w-4 text-primary" />;
      case "complaint":
        return <Mail className="h-4 w-4 text-destructive" />;
      case "review":
        return <Star className="h-4 w-4 text-gold" />;
      case "return":
        return <Mail className="h-4 w-4 text-warning" />;
      default:
        return <MessageCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
                <h1 className="text-3xl font-bold text-foreground">Messages</h1>
                <p className="text-muted-foreground">Manage customer communications and inquiries</p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                    <p className="text-2xl font-bold text-foreground">{messages.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Unread</p>
                    <p className="text-2xl font-bold text-destructive">
                      {messages.filter(m => m.status === "unread").length}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                    <p className="text-2xl font-bold text-foreground">
                      {messages.filter(m => m.priority === "high").length}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                    <p className="text-2xl font-bold text-success">94%</p>
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
                        placeholder="Search messages by customer or subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Message Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Messages</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
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

            {/* Messages Table */}
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Customer Messages ({filteredMessages.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.map((message) => (
                      <TableRow key={message.id} className={message.status === "unread" ? "bg-muted/30" : ""}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg`} />
                              <AvatarFallback className="text-xs">{getInitials(message.customer)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{message.customer}</p>
                              <p className="text-xs text-muted-foreground">{message.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{message.subject}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-xs">
                              {message.message}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(message.type)}
                            <span className="text-sm capitalize">{message.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getPriorityBadge(message.priority)}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm text-foreground">{message.date}</p>
                            <p className="text-xs text-muted-foreground">{message.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(message.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Reply</DropdownMenuItem>
                              <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                              <DropdownMenuItem>Forward</DropdownMenuItem>
                              <DropdownMenuItem>Archive</DropdownMenuItem>
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