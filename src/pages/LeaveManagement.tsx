import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus, MoreHorizontal, Filter, Download, Check, X } from "lucide-react";
import { useLeaveStore } from "@/store/hrmsStore";

export default function LeaveManagement() {
  const { leaveRequests, updateLeaveStatus } = useLeaveStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.leaveType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case "Pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "Rejected":
        return <Badge className="bg-destructive text-destructive-foreground">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const statusOptions = ["All", "Pending", "Approved", "Rejected"];

  const handleApprove = (id: number) => {
    updateLeaveStatus(id, "Approved");
  };

  const handleReject = (id: number) => {
    updateLeaveStatus(id, "Rejected");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground">
            Manage employee leave requests and policies
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Leave Policy</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Policy Name" />
                <Input placeholder="Days Allowed" type="number" />
                <Button className="w-full hrms-button-primary">Add Policy</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="hrms-button-primary">
            <Plus className="mr-2 h-4 w-4" />
            Apply Leave
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-warning">23</p>
              <p className="text-sm text-muted-foreground">Pending Requests</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-success">156</p>
              <p className="text-sm text-muted-foreground">Approved This Month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-destructive">8</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">2.3</p>
              <p className="text-sm text-muted-foreground">Avg Days/Request</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Table */}
      <Card className="hrms-card">
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
            <div className="flex flex-1 space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    {statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover border shadow-lg z-50">
                  {statusOptions.map(status => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className="hover:bg-muted cursor-pointer"
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.employeeName}</div>
                      <div className="text-sm text-muted-foreground">{request.reason}</div>
                    </div>
                  </TableCell>
                  <TableCell>{request.leaveType}</TableCell>
                  <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{request.days}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{new Date(request.appliedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {request.status === "Pending" ? (
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApprove(request.id)}
                          className="h-8 w-8 p-0 hover:bg-success hover:text-success-foreground"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(request.id)}
                          className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover border shadow-lg z-50">
                          <DropdownMenuItem className="hover:bg-muted cursor-pointer">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-muted cursor-pointer">
                            Download Request
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Leave Policies */}
      <Card className="hrms-card">
        <CardHeader>
          <CardTitle>Leave Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Annual Leave", days: 21, color: "bg-primary" },
              { name: "Sick Leave", days: 10, color: "bg-success" },
              { name: "Personal Leave", days: 5, color: "bg-warning" },
              { name: "Maternity Leave", days: 90, color: "bg-secondary" },
              { name: "Paternity Leave", days: 14, color: "bg-accent" },
            ].map((policy) => (
              <Card key={policy.name} className="hrms-card hrms-card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`h-3 w-3 rounded-full ${policy.color}`}></div>
                      <div>
                        <p className="font-medium">{policy.name}</p>
                        <p className="text-sm text-muted-foreground">{policy.days} days/year</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}