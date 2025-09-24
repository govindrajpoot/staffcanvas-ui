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
import { Search, Plus, MoreHorizontal, Filter, Download, DollarSign, FileText } from "lucide-react";

const payrollData = [
  {
    id: 1,
    employeeName: "John Smith",
    employeeId: "EMP001",
    department: "Engineering",
    basicSalary: 85000,
    allowances: 12000,
    deductions: 8500,
    netSalary: 88500,
    status: "Processed",
    month: "February 2024"
  },
  {
    id: 2,
    employeeName: "Sarah Johnson",
    employeeId: "EMP002",
    department: "Marketing",
    basicSalary: 75000,
    allowances: 10000,
    deductions: 7500,
    netSalary: 77500,
    status: "Processed",
    month: "February 2024"
  },
  {
    id: 3,
    employeeName: "Mike Chen",
    employeeId: "EMP003",
    department: "Sales",
    basicSalary: 65000,
    allowances: 8000,
    deductions: 6500,
    netSalary: 66500,
    status: "Pending",
    month: "February 2024"
  }
];

export default function Payroll() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPayroll = payrollData.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processed":
        return <Badge className="bg-success text-success-foreground">Processed</Badge>;
      case "Pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "Failed":
        return <Badge className="bg-destructive text-destructive-foreground">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const statusOptions = ["All", "Processed", "Pending", "Failed"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
          <p className="text-muted-foreground">
            Manage salary structures and payroll processing
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Salary Structure
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Salary Structure</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Structure Name" />
                <Input placeholder="Basic Salary" type="number" />
                <Input placeholder="HRA" type="number" />
                <Input placeholder="Transport Allowance" type="number" />
                <Input placeholder="Medical Allowance" type="number" />
                <Input placeholder="Other Allowances" type="number" />
                <div className="col-span-2">
                  <Button className="w-full hrms-button-primary">Create Structure</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="hrms-button-primary">
            <DollarSign className="mr-2 h-4 w-4" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">$2.4M</p>
                <p className="text-sm text-muted-foreground">Monthly Payroll</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">1,156</p>
                <p className="text-sm text-muted-foreground">Payslips Generated</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">23</p>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold text-secondary">$72K</p>
                <p className="text-sm text-muted-foreground">Avg Monthly Salary</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Table */}
      <Card className="hrms-card">
        <CardHeader>
          <CardTitle>Payroll Records - February 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
            <div className="flex flex-1 space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
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
              Export Payslips
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Basic Salary</TableHead>
                <TableHead>Allowances</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayroll.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.employeeName}</div>
                      <div className="text-sm text-muted-foreground">{record.employeeId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>${record.basicSalary.toLocaleString()}</TableCell>
                  <TableCell>${record.allowances.toLocaleString()}</TableCell>
                  <TableCell>${record.deductions.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">${record.netSalary.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover border shadow-lg z-50">
                        <DropdownMenuItem className="hover:bg-muted cursor-pointer">
                          View Payslip
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-muted cursor-pointer">
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-muted cursor-pointer">
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-muted cursor-pointer">
                          Edit Details
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

      {/* Salary Structures */}
      <Card className="hrms-card">
        <CardHeader>
          <CardTitle>Salary Structures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                name: "Senior Developer", 
                basicSalary: 85000, 
                allowances: 15000,
                employees: 45,
                color: "bg-primary" 
              },
              { 
                name: "Marketing Manager", 
                basicSalary: 75000, 
                allowances: 12000,
                employees: 23,
                color: "bg-secondary" 
              },
              { 
                name: "Sales Representative", 
                basicSalary: 65000, 
                allowances: 10000,
                employees: 67,
                color: "bg-accent" 
              },
            ].map((structure) => (
              <Card key={structure.name} className="hrms-card hrms-card-hover">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`h-3 w-3 rounded-full ${structure.color} mt-1`}></div>
                      <div>
                        <p className="font-medium">{structure.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Basic: ${structure.basicSalary.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Allowances: ${structure.allowances.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {structure.employees} employees
                        </p>
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