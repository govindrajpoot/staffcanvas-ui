import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  description 
}: MetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="hrms-card hrms-card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Icon className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold text-foreground">{value}</p>
              {change && (
                <p className={`text-sm ${getChangeColor()}`}>
                  {change}
                </p>
              )}
              {description && (
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}