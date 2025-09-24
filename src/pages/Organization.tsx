import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Plus, Users, MoreHorizontal, MapPin } from "lucide-react";

const departments = [
  {
    id: 1,
    name: "Engineering",
    head: "John Smith",
    employees: 456,
    description: "Software development and technical operations",
    location: "Floor 3-5",
    budget: 2800000
  },
  {
    id: 2,
    name: "Sales",
    head: "Sarah Johnson",
    employees: 234,
    description: "Revenue generation and client acquisition",
    location: "Floor 2",
    budget: 1200000
  },
  {
    id: 3,
    name: "Marketing",
    head: "Mike Chen",
    employees: 123,
    description: "Brand promotion and market research",
    location: "Floor 1",
    budget: 800000
  },
  {
    id: 4,
    name: "Human Resources",
    head: "Emily Davis",
    employees: 45,
    description: "Employee relations and organizational development",
    location: "Floor 1",
    budget: 400000
  },
  {
    id: 5,
    name: "Finance",
    head: "Alex Thompson",
    employees: 67,
    description: "Financial planning and accounting",
    location: "Floor 2",
    budget: 600000
  }
];

const designations = [
  { title: "Chief Executive Officer", level: 1, department: "Executive", count: 1 },
  { title: "Vice President", level: 2, department: "Executive", count: 4 },
  { title: "Director", level: 3, department: "All", count: 12 },
  { title: "Senior Manager", level: 4, department: "All", count: 34 },
  { title: "Manager", level: 5, department: "All", count: 67 },
  { title: "Team Lead", level: 6, department: "All", count: 89 },
  { title: "Senior Developer", level: 7, department: "Engineering", count: 123 },
  { title: "Developer", level: 8, department: "Engineering", count: 234 },
];

export default function Organization() {
  const [selectedDepartment, setSelectedDepartment] = useState<typeof departments[0] | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Organization Management</h1>
          <p className="text-muted-foreground">
            Manage departments, designations, and organizational structure
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Designation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Designation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Designation Title" />
                <Input placeholder="Level (1-10)" type="number" />
                <Input placeholder="Department" />
                <Textarea placeholder="Job Description" />
                <Button className="w-full hrms-button-primary">Add Designation</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hrms-button-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Department Name" />
                <Input placeholder="Department Head" />
                <Input placeholder="Location" />
                <Input placeholder="Budget" type="number" />
                <Textarea placeholder="Description" />
                <Button className="w-full hrms-button-primary">Add Department</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Organization Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{departments.length}</p>
                <p className="text-sm text-muted-foreground">Departments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">
                  {departments.reduce((sum, dept) => sum + dept.employees, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Employees</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">{designations.length}</p>
                <p className="text-sm text-muted-foreground">Designations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <MapPin className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold text-secondary">5</p>
                <p className="text-sm text-muted-foreground">Office Floors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      <Card className="hrms-card">
        <CardHeader>
          <CardTitle>Departments Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <Card 
                key={department.id} 
                className="hrms-card hrms-card-hover cursor-pointer"
                onClick={() => setSelectedDepartment(department)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Building2 className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold">{department.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {department.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Head:</span>
                          <span className="text-sm font-medium">{department.head}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Employees:</span>
                          <span className="text-sm font-medium">{department.employees}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Location:</span>
                          <span className="text-sm font-medium">{department.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Budget:</span>
                          <span className="text-sm font-medium">
                            ${(department.budget / 1000000).toFixed(1)}M
                          </span>
                        </div>
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

      {/* Organizational Hierarchy */}
      <Card className="hrms-card">
        <CardHeader>
          <CardTitle>Organizational Hierarchy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {designations.map((designation, index) => (
              <div 
                key={designation.title}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                style={{ marginLeft: `${(designation.level - 1) * 20}px` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`h-3 w-3 rounded-full ${
                    designation.level <= 2 ? 'bg-primary' :
                    designation.level <= 4 ? 'bg-secondary' :
                    designation.level <= 6 ? 'bg-accent' : 'bg-muted-foreground'
                  }`}></div>
                  <div>
                    <h4 className="font-medium">{designation.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Level {designation.level} • {designation.department}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{designation.count}</p>
                  <p className="text-sm text-muted-foreground">positions</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Detail Modal */}
      {selectedDepartment && (
        <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedDepartment.name} Department</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Department Head</label>
                  <p className="text-lg font-medium">{selectedDepartment.head}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Employees</label>
                  <p className="text-lg font-medium">{selectedDepartment.employees}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-lg font-medium">{selectedDepartment.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Annual Budget</label>
                  <p className="text-lg font-medium">${selectedDepartment.budget.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="mt-1">{selectedDepartment.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button className="hrms-button-primary">Edit Department</Button>
                <Button variant="outline">View Employees</Button>
                <Button variant="outline">Department Reports</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}