import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Search, Plus, MoreHorizontal, Filter, Download } from "lucide-react";

// Sample employee data
const employees = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    department: "Engineering",
    position: "Senior Developer",
    status: "Active",
    joinDate: "2021-03-15",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    status: "Active",
    joinDate: "2020-08-22",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e7bb82?w=32"
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@company.com",
    department: "Sales",
    position: "Sales Representative",
    status: "Active",
    joinDate: "2022-01-10",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    department: "HR",
    position: "HR Specialist",
    status: "On Leave",
    joinDate: "2021-11-05",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32"
  },
  {
    id: 5,
    name: "Alex Thompson",
    email: "alex.thompson@company.com",
    department: "Engineering",
    position: "Frontend Developer",
    status: "Active",
    joinDate: "2023-02-14",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32"
  }
];

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "All" || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case "On Leave":
        return <Badge className="bg-warning text-warning-foreground">On Leave</Badge>;
      case "Inactive":
        return <Badge className="bg-destructive text-destructive-foreground">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const departments = ["All", ...Array.from(new Set(employees.map(emp => emp.department)))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Management</h1>
          <p className="text-muted-foreground">
            Manage your workforce and employee information
          </p>
        </div>
        <Button className="hrms-button-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">1,247</p>
              <p className="text-sm text-muted-foreground">Total Employees</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-success">1,156</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-warning">23</p>
              <p className="text-sm text-muted-foreground">On Leave</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-destructive">68</p>
              <p className="text-sm text-muted-foreground">Inactive</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="hrms-card">
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
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
                    {filterDepartment}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {departments.map(dept => (
                    <DropdownMenuItem
                      key={dept}
                      onClick={() => setFilterDepartment(dept)}
                    >
                      {dept}
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

          {/* Employee Table */}
          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback>
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{getStatusBadge(employee.status)}</TableCell>
                    <TableCell>{new Date(employee.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Documents</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}