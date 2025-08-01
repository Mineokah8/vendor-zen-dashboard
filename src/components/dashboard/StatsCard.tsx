import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: ReactNode;
  gradient?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "increase", 
  icon, 
  gradient 
}: StatsCardProps) {
  return (
    <Card className="border-border shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <div className="flex items-center space-x-1">
                <span
                  className={cn(
                    "text-xs font-medium",
                    changeType === "increase" ? "text-success" : "text-destructive"
                  )}
                >
                  {changeType === "increase" ? "+" : ""}{change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center text-white",
            gradient || "bg-primary"
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}