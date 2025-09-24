import { create } from 'zustand';

// Employee Management Store
interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  joinDate: string;
  avatar?: string;
  phone?: string;
  address?: string;
  salary?: number;
}

interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: number, employee: Partial<Employee>) => void;
  deleteEmployee: (id: number) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      department: "Engineering",
      position: "Senior Developer",
      status: "Active",
      joinDate: "2021-03-15",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345",
      salary: 85000
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Marketing",
      position: "Marketing Manager",
      status: "Active",
      joinDate: "2020-08-22",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e7bb82?w=32",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, City, State 12345",
      salary: 75000
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      department: "Sales",
      position: "Sales Representative",
      status: "Active",
      joinDate: "2022-01-10",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32",
      phone: "+1 (555) 345-6789",
      address: "789 Pine St, City, State 12345",
      salary: 65000
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      department: "HR",
      position: "HR Specialist",
      status: "On Leave",
      joinDate: "2021-11-05",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32",
      phone: "+1 (555) 456-7890",
      address: "321 Elm St, City, State 12345",
      salary: 70000
    },
    {
      id: 5,
      name: "Alex Thompson",
      email: "alex.thompson@company.com",
      department: "Engineering",
      position: "Frontend Developer",
      status: "Active",
      joinDate: "2023-02-14",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32",
      phone: "+1 (555) 567-8901",
      address: "654 Maple Ave, City, State 12345",
      salary: 80000
    }
  ],
  addEmployee: (employee) => set((state) => ({
    employees: [...state.employees, employee]
  })),
  updateEmployee: (id, updatedEmployee) => set((state) => ({
    employees: state.employees.map(emp => 
      emp.id === id ? { ...emp, ...updatedEmployee } : emp
    )
  })),
  deleteEmployee: (id) => set((state) => ({
    employees: state.employees.filter(emp => emp.id !== id)
  }))
}));

// Leave Management Store
interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
}

interface LeaveStore {
  leaveRequests: LeaveRequest[];
  addLeaveRequest: (request: LeaveRequest) => void;
  updateLeaveStatus: (id: number, status: 'Approved' | 'Rejected') => void;
}

export const useLeaveStore = create<LeaveStore>((set) => ({
  leaveRequests: [
    {
      id: 1,
      employeeId: 1,
      employeeName: "John Smith",
      leaveType: "Annual Leave",
      startDate: "2024-02-15",
      endDate: "2024-02-19",
      days: 5,
      reason: "Family vacation",
      status: "Pending",
      appliedDate: "2024-02-01"
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: "Sarah Johnson",
      leaveType: "Sick Leave",
      startDate: "2024-02-10",
      endDate: "2024-02-12",
      days: 3,
      reason: "Medical appointment",
      status: "Approved",
      appliedDate: "2024-02-08"
    }
  ],
  addLeaveRequest: (request) => set((state) => ({
    leaveRequests: [...state.leaveRequests, request]
  })),
  updateLeaveStatus: (id, status) => set((state) => ({
    leaveRequests: state.leaveRequests.map(req =>
      req.id === id ? { ...req, status } : req
    )
  }))
}));

// Asset Management Store
interface Asset {
  id: number;
  name: string;
  type: string;
  serialNumber: string;
  assignedTo?: number;
  assignedToName?: string;
  status: 'Available' | 'Assigned' | 'Maintenance';
  purchaseDate: string;
  value: number;
}

interface AssetStore {
  assets: Asset[];
  addAsset: (asset: Asset) => void;
  assignAsset: (assetId: number, employeeId: number, employeeName: string) => void;
  unassignAsset: (assetId: number) => void;
}

export const useAssetStore = create<AssetStore>((set) => ({
  assets: [
    {
      id: 1,
      name: "MacBook Pro 16\"",
      type: "Laptop",
      serialNumber: "MP16-2023-001",
      assignedTo: 1,
      assignedToName: "John Smith",
      status: "Assigned",
      purchaseDate: "2023-01-15",
      value: 2500
    },
    {
      id: 2,
      name: "Dell Monitor 27\"",
      type: "Monitor",
      serialNumber: "DM27-2023-002",
      status: "Available",
      purchaseDate: "2023-02-10",
      value: 300
    }
  ],
  addAsset: (asset) => set((state) => ({
    assets: [...state.assets, asset]
  })),
  assignAsset: (assetId, employeeId, employeeName) => set((state) => ({
    assets: state.assets.map(asset =>
      asset.id === assetId 
        ? { ...asset, assignedTo: employeeId, assignedToName: employeeName, status: 'Assigned' as const }
        : asset
    )
  })),
  unassignAsset: (assetId) => set((state) => ({
    assets: state.assets.map(asset =>
      asset.id === assetId
        ? { ...asset, assignedTo: undefined, assignedToName: undefined, status: 'Available' as const }
        : asset
    )
  }))
}));