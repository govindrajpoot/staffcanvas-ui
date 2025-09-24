import { DashboardStats } from "@/components/Dashboard/DashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, FileText, BarChart3, Clock, UserPlus } from "lucide-react";
import heroImage from "@/assets/hrms-hero.jpg";

export default function Dashboard() {
  const quickActions = [
    { label: "Add Employee", icon: UserPlus, href: "/employees/new" },
    { label: "View Attendance", icon: Clock, href: "/attendance" },
    { label: "Manage Leaves", icon: Calendar, href: "/leave" },
    { label: "Generate Reports", icon: BarChart3, href: "/reports" },
    { label: "Payroll Center", icon: FileText, href: "/payroll" },
    { label: "Employee Directory", icon: Users, href: "/employees" },
  ];

  const recentActivities = [
    { 
      type: "leave", 
      message: "Sarah Johnson submitted a leave request",
      time: "2 minutes ago",
      status: "pending"
    },
    { 
      type: "attendance", 
      message: "Morning attendance report generated",
      time: "15 minutes ago",
      status: "completed"
    },
    { 
      type: "employee", 
      message: "New employee Alex Chen onboarded",
      time: "1 hour ago",
      status: "completed"
    },
    { 
      type: "payroll", 
      message: "Monthly payroll processing initiated",
      time: "2 hours ago",
      status: "in-progress"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 hrms-hero-gradient opacity-90"></div>
          <div className="relative z-10 flex h-full items-center justify-center text-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">Welcome to HRMS Pro</h1>
              <p className="text-xl opacity-90 mb-6">
                Streamline your human resource management with powerful tools and insights
              </p>
              <Button variant="secondary" size="lg" className="hrms-button-secondary">
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Overview</h2>
        <DashboardStats />
      </div>

      {/* Quick Actions & Recent Activities */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="hrms-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-auto flex-col space-y-2 p-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <action.icon className="h-6 w-6" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="hrms-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-secondary"></div>
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    activity.status === "completed" ? "bg-success" :
                    activity.status === "pending" ? "bg-warning" :
                    "bg-primary"
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Dashboard Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="hrms-card">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { dept: "Engineering", count: 456, color: "bg-primary" },
                { dept: "Sales", count: 234, color: "bg-secondary" },
                { dept: "Marketing", count: 123, color: "bg-accent" },
                { dept: "HR", count: 45, color: "bg-success" },
                { dept: "Finance", count: 67, color: "bg-warning" },
              ].map((item) => (
                <div key={item.dept} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium">{item.dept}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hrms-card">
          <CardHeader>
            <CardTitle>Leave Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: "Sick Leave", count: 12, color: "bg-destructive" },
                { type: "Annual Leave", count: 8, color: "bg-primary" },
                { type: "Personal Leave", count: 3, color: "bg-secondary" },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.count} pending</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hrms-card">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { event: "Team Building", date: "Tomorrow" },
                { event: "Payroll Processing", date: "Jan 30" },
                { event: "Performance Reviews", date: "Feb 1-15" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.event}</span>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}