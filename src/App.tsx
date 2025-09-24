import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Organization from "./pages/Organization";
import LeaveManagement from "./pages/LeaveManagement";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import AssetManagement from "./pages/AssetManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="organization" element={<Organization />} />
            <Route path="leave" element={<LeaveManagement />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="timesheet" element={<div className="p-8 text-center text-muted-foreground">Timesheet Management - Coming Soon</div>} />
            <Route path="assets" element={<AssetManagement />} />
            <Route path="expenses" element={<div className="p-8 text-center text-muted-foreground">Expense Management - Coming Soon</div>} />
            <Route path="documents" element={<div className="p-8 text-center text-muted-foreground">Document Management - Coming Soon</div>} />
            <Route path="reports" element={<div className="p-8 text-center text-muted-foreground">Reports & Analytics - Coming Soon</div>} />
            <Route path="onboarding" element={<div className="p-8 text-center text-muted-foreground">Onboarding - Coming Soon</div>} />
            <Route path="notifications" element={<div className="p-8 text-center text-muted-foreground">Notifications - Coming Soon</div>} />
            <Route path="settings" element={<div className="p-8 text-center text-muted-foreground">System Settings - Coming Soon</div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
