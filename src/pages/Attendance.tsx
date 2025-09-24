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
import { Search, Filter, Download, Clock, MapPin, Calendar } from "lucide-react";

const attendanceData = [
  {
    id: 1,
    employeeName: "John Smith",
    department: "Engineering",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    hours: 9,
    status: "Present",
    location: "Office",
    date: "2024-02-15"
  },
  {
    id: 2,
    employeeName: "Sarah Johnson",
    department: "Marketing",
    checkIn: "09:15 AM",
    checkOut: "06:15 PM",
    hours: 9,
    status: "Present",
    location: "Office",
    date: "2024-02-15"
  },
  {
    id: 3,
    employeeName: "Mike Chen",
    department: "Sales",
    checkIn: "09:30 AM",
    checkOut: "07:00 PM",
    hours: 9.5,
    status: "Present",
    location: "Remote",
    date: "2024-02-15"
  },
  {
    id: 4,
    employeeName: "Emily Davis",
    department: "HR",
    checkIn: "-",
    checkOut: "-",
    hours: 0,
    status: "On Leave",
    location: "-",
    date: "2024-02-15"
  }
];

export default function Attendance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState("2024-02-15");

  const filteredAttendance = attendanceData.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Present":
        return <Badge className="bg-success text-success-foreground">Present</Badge>;
      case "Late":
        return <Badge className="bg-warning text-warning-foreground">Late</Badge>;
      case "Absent":
        return <Badge className="bg-destructive text-destructive-foreground">Absent</Badge>;
      case "On Leave":
        return <Badge className="bg-primary text-primary-foreground">On Leave</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const statusOptions = ["All", "Present", "Late", "Absent", "On Leave"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Tracking</h1>
          <p className="text-muted-foreground">
            Monitor daily attendance and working hours
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button className="hrms-button-primary">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">92.7%</p>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">1,156</p>
                <p className="text-sm text-muted-foreground">Present Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">23</p>
                <p className="text-sm text-muted-foreground">On Leave</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold text-secondary">8.2h</p>
                <p className="text-sm text-muted-foreground">Avg Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card className="hrms-card">
        <CardHeader>
          <CardTitle>Daily Attendance - {new Date(selectedDate).toLocaleDateString()}</CardTitle>
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
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
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
                <TableHead>Department</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="font-medium">{record.employeeName}</div>
                  </TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>{record.checkOut}</TableCell>
                  <TableCell>{record.hours}h</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{record.location}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="hrms-card">
          <CardHeader>
            <CardTitle>Weekly Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "Monday", present: 1200, absent: 47, percentage: 96.2 },
                { day: "Tuesday", present: 1185, absent: 62, percentage: 95.0 },
                { day: "Wednesday", present: 1195, absent: 52, percentage: 95.8 },
                { day: "Thursday", present: 1210, absent: 37, percentage: 97.0 },
                { day: "Friday", present: 1156, absent: 91, percentage: 92.7 },
              ].map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 text-sm font-medium">{day.day}</div>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${day.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground ml-4">
                    {day.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hrms-card">
          <CardHeader>
            <CardTitle>Department Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: "Engineering", present: 456, total: 480, color: "bg-primary" },
                { dept: "Sales", present: 234, total: 250, color: "bg-secondary" },
                { dept: "Marketing", present: 123, total: 130, color: "bg-accent" },
                { dept: "HR", present: 45, total: 48, color: "bg-success" },
                { dept: "Finance", present: 67, total: 70, color: "bg-warning" },
              ].map((dept) => (
                <div key={dept.dept} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`h-3 w-3 rounded-full ${dept.color}`}></div>
                    <span className="font-medium">{dept.dept}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {dept.present}/{dept.total} ({Math.round((dept.present/dept.total)*100)}%)
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}