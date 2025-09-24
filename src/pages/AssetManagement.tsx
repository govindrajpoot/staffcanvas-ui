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
import { Search, Plus, MoreHorizontal, Filter, Download, Package, User } from "lucide-react";
import { useAssetStore } from "@/store/hrmsStore";

export default function AssetManagement() {
  const { assets, assignAsset, unassignAsset } = useAssetStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge className="bg-success text-success-foreground">Available</Badge>;
      case "Assigned":
        return <Badge className="bg-primary text-primary-foreground">Assigned</Badge>;
      case "Maintenance":
        return <Badge className="bg-warning text-warning-foreground">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const statusOptions = ["All", "Available", "Assigned", "Maintenance"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Asset Management</h1>
          <p className="text-muted-foreground">
            Manage company assets and assignments
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <User className="mr-2 h-4 w-4" />
                Assign Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Assign Asset</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Asset</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        Select Asset
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-popover border shadow-lg z-50">
                      {assets.filter(a => a.status === "Available").map(asset => (
                        <DropdownMenuItem key={asset.id} className="hover:bg-muted cursor-pointer">
                          {asset.name} - {asset.serialNumber}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <label className="text-sm font-medium">Employee</label>
                  <Input placeholder="Search employee..." />
                </div>
                <Button className="w-full hrms-button-primary">Assign Asset</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="hrms-button-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">234</p>
              <p className="text-sm text-muted-foreground">Total Assets</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-success">156</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-warning">67</p>
              <p className="text-sm text-muted-foreground">Assigned</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hrms-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-destructive">11</p>
              <p className="text-sm text-muted-foreground">Maintenance</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets Table */}
      <Card className="hrms-card">
        <CardHeader>
          <CardTitle>Asset Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
            <div className="flex flex-1 space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
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
                <TableHead>Asset Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <div className="font-medium">{asset.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell className="font-mono text-sm">{asset.serialNumber}</TableCell>
                  <TableCell>
                    {asset.assignedToName ? (
                      <div className="font-medium">{asset.assignedToName}</div>
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(asset.status)}</TableCell>
                  <TableCell>{new Date(asset.purchaseDate).toLocaleDateString()}</TableCell>
                  <TableCell>${asset.value.toLocaleString()}</TableCell>
                  <TableCell>
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
                          Edit Asset
                        </DropdownMenuItem>
                        {asset.status === "Assigned" ? (
                          <DropdownMenuItem 
                            onClick={() => unassignAsset(asset.id)}
                            className="hover:bg-muted cursor-pointer"
                          >
                            Unassign
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="hover:bg-muted cursor-pointer">
                            Assign to Employee
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="hover:bg-muted cursor-pointer">
                          Mark for Maintenance
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

      {/* Asset Categories */}
      <Card className="hrms-card">
        <CardHeader>
          <CardTitle>Asset Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Laptops", count: 89, value: 234000, color: "bg-primary" },
              { name: "Monitors", count: 156, value: 78000, color: "bg-secondary" },
              { name: "Furniture", count: 234, value: 125000, color: "bg-accent" },
              { name: "Software", count: 45, value: 89000, color: "bg-success" },
            ].map((category) => (
              <Card key={category.name} className="hrms-card hrms-card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {category.count} items • ${category.value.toLocaleString()}
                      </p>
                    </div>
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