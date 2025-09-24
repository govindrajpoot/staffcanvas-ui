import { Users, UserCheck, Calendar, DollarSign, Clock, TrendingUp } from "lucide-react";
import { MetricCard } from "./MetricCard";

export function DashboardStats() {
  const stats = [
    {
      title: "Total Employees",
      value: "1,247",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: Users,
      description: "Active workforce"
    },
    {
      title: "Present Today",
      value: "1,156",
      change: "92.7% attendance",
      changeType: "positive" as const,
      icon: UserCheck,
      description: "Currently at work"
    },
    {
      title: "Pending Leaves",
      value: "23",
      change: "5 urgent approvals",
      changeType: "neutral" as const,
      icon: Calendar,
      description: "Requires attention"
    },
    {
      title: "Monthly Payroll",
      value: "$2.4M",
      change: "+8% from last month",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "Current month"
    },
    {
      title: "Avg. Work Hours",
      value: "8.2h",
      change: "+0.3h from last week",
      changeType: "positive" as const,
      icon: Clock,
      description: "Daily average"
    },
    {
      title: "Employee Satisfaction",
      value: "4.6/5",
      change: "+0.2 from last quarter",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Latest survey"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <MetricCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
          icon={stat.icon}
          description={stat.description}
        />
      ))}
    </div>
  );
}