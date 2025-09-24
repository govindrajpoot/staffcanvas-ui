import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  Clock,
  DollarSign,
  FileText,
  Package,
  Receipt,
  FolderOpen,
  BarChart3,
  UserPlus,
  Bell,
  Settings,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Employee Management", href: "/employees", icon: Users },
  { name: "Organization", href: "/organization", icon: Building2 },
  { name: "Leave Management", href: "/leave", icon: CalendarDays },
  { name: "Attendance", href: "/attendance", icon: Clock },
  { name: "Payroll", href: "/payroll", icon: DollarSign },
  { name: "Timesheet", href: "/timesheet", icon: FileText },
  { name: "Asset Management", href: "/assets", icon: Package },
  { name: "Expense Management", href: "/expenses", icon: Receipt },
  { name: "Documents", href: "/documents", icon: FolderOpen },
  { name: "Reports & Analytics", href: "/reports", icon: BarChart3 },
  { name: "Onboarding", href: "/onboarding", icon: UserPlus },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 z-30 h-full w-64 transform bg-card border-r border-border shadow-xl transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg hrms-gradient-bg"></div>
            <span className="text-xl font-bold text-foreground">HRMS Pro</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `hrms-nav-item ${
                    isActive 
                      ? 'hrms-nav-item-active' 
                      : 'hrms-nav-item-inactive'
                  }`
                }
                onClick={() => {
                  // Close mobile sidebar on navigation
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}