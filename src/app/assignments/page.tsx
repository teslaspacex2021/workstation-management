"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  mockWorkstations,
  mockEmployees,
  mockAssignments,
} from "@/lib/mock-data";
import { Assignment, Employee, Workstation } from "@/types";
import { UserCog, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [workstations, setWorkstations] = useState<Workstation[]>(mockWorkstations);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWorkstation, setSelectedWorkstation] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const availableWorkstations = workstations.filter(
    (ws) => ws.status === "available" && !ws.assignedTo
  );

  const unassignedEmployees = employees.filter((emp) => !emp.workstationId);

  const handleAssign = () => {
    if (!selectedWorkstation || !selectedEmployee) {
      alert("请选择工位和员工");
      return;
    }

    const workstation = workstations.find((ws) => ws.id === selectedWorkstation);
    const employee = employees.find((emp) => emp.id === selectedEmployee);

    if (!workstation || !employee) return;

    const newAssignment: Assignment = {
      id: `asg-${Date.now()}`,
      workstationId: workstation.id,
      employeeId: employee.id,
      employeeName: employee.name,
      assignedBy: "管理员",
      assignedAt: new Date().toLocaleString("zh-CN"),
      status: "active",
    };

    setWorkstations(
      workstations.map((ws) =>
        ws.id === selectedWorkstation
          ? { ...ws, status: "occupied" as const, assignedTo: selectedEmployee }
          : ws
      )
    );

    setEmployees(
      employees.map((emp) =>
        emp.id === selectedEmployee
          ? { ...emp, workstationId: selectedWorkstation }
          : emp
      )
    );

    setAssignments([...assignments, newAssignment]);
    setSelectedWorkstation("");
    setSelectedEmployee("");
    setIsDialogOpen(false);
  };

  const handleUnassign = (assignmentId: string) => {
    if (!confirm("确定要取消这个工位分配吗？")) return;

    const assignment = assignments.find((a) => a.id === assignmentId);
    if (!assignment) return;

    setWorkstations(
      workstations.map((ws) =>
        ws.id === assignment.workstationId
          ? { ...ws, status: "available" as const, assignedTo: undefined }
          : ws
      )
    );

    setEmployees(
      employees.map((emp) =>
        emp.id === assignment.employeeId
          ? { ...emp, workstationId: undefined }
          : emp
      )
    );

    setAssignments(assignments.filter((a) => a.id !== assignmentId));
  };

  const getWorkstationCode = (workstationId: string) => {
    const ws = workstations.find((w) => w.id === workstationId);
    return ws ? ws.code : "-";
  };

  const getEmployee = (employeeId: string) => {
    return employees.find((e) => e.id === employeeId);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold flex items-center gap-2">
            <UserCog className="h-5 w-5 text-primary" />
            工位分配管理
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            支持导入人员信息（支持本部人员及外派人员）；支持管理员选中工位，并将该工位分配给指定员工
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              分配工位
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>分配工位给员工</DialogTitle>
              <DialogDescription>
                选择一个可用工位和一个未分配工位的员工
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="workstation">选择工位 *</Label>
                <Select
                  value={selectedWorkstation}
                  onValueChange={setSelectedWorkstation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择可用工位" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableWorkstations.length === 0 ? (
                      <div className="p-2 text-sm text-muted-foreground">
                        暂无可用工位
                      </div>
                    ) : (
                      availableWorkstations.map((ws) => (
                        <SelectItem key={ws.id} value={ws.id}>
                          {ws.code} - {ws.officeName} ({ws.floor}楼)
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee">选择员工 *</Label>
                <Select
                  value={selectedEmployee}
                  onValueChange={setSelectedEmployee}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择员工" />
                  </SelectTrigger>
                  <SelectContent>
                    {unassignedEmployees.length === 0 ? (
                      <div className="p-2 text-sm text-muted-foreground">
                        暂无待分配员工
                      </div>
                    ) : (
                      unassignedEmployees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name} - {emp.department} ({emp.employeeNo})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                取消
              </Button>
              <Button onClick={handleAssign}>确认分配</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              已分配工位
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              可用工位
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {availableWorkstations.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              待分配员工
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {unassignedEmployees.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              工位利用率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((assignments.length / workstations.length) * 100).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">工位分配记录 ({assignments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>员工姓名</TableHead>
                <TableHead>员工信息</TableHead>
                <TableHead>工位编号</TableHead>
                <TableHead>工位位置</TableHead>
                <TableHead>人员类型</TableHead>
                <TableHead>分配人</TableHead>
                <TableHead>分配时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => {
                const employee = getEmployee(assignment.employeeId);
                return (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">
                      {assignment.employeeName}
                    </TableCell>
                    <TableCell className="text-sm">
                      {employee?.department} / {employee?.employeeNo}
                    </TableCell>
                    <TableCell className="font-medium">
                      {getWorkstationCode(assignment.workstationId)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {workstations.find((w) => w.id === assignment.workstationId)?.officeName}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee?.type === "internal" ? "default" : "secondary"
                        }
                      >
                        {employee?.type === "internal" ? "本部人员" : "外派人员"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {assignment.assignedBy}
                    </TableCell>
                    <TableCell className="text-sm">
                      {assignment.assignedAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUnassign(assignment.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
