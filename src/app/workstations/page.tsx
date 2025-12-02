"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockWorkstations, mockOffices, mockProperties } from "@/lib/mock-data";
import { Workstation } from "@/types";
import { MapPin, Filter, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WorkstationsPage() {
  const [workstations] = useState<Workstation[]>(mockWorkstations);
  const [filterProperty, setFilterProperty] = useState<string>("all");
  const [filterOffice, setFilterOffice] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchCode, setSearchCode] = useState("");

  // 过滤工位
  const filteredWorkstations = workstations.filter((ws) => {
    if (filterProperty !== "all" && ws.propertyId !== filterProperty)
      return false;
    if (filterOffice !== "all" && ws.officeId !== filterOffice) return false;
    if (filterStatus !== "all" && ws.status !== filterStatus) return false;
    if (searchCode && !ws.code.toLowerCase().includes(searchCode.toLowerCase()))
      return false;
    return true;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "可用";
      case "occupied":
        return "已占用";
      case "reserved":
        return "预留";
      default:
        return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "available":
        return "default";
      case "occupied":
        return "secondary";
      case "reserved":
        return "outline";
      default:
        return "default";
    }
  };

  // 统计信息
  const totalWorkstations = filteredWorkstations.length;
  const availableWorkstations = filteredWorkstations.filter(
    (ws) => ws.status === "available"
  ).length;
  const occupiedWorkstations = filteredWorkstations.filter(
    (ws) => ws.status === "occupied"
  ).length;

  // 导出数据
  const handleExport = () => {
    // 模拟导出功能
    alert("导出功能已触发，实际项目中可导出为Excel或CSV文件");
  };

  // 重置过滤
  const handleResetFilters = () => {
    setFilterProperty("all");
    setFilterOffice("all");
    setFilterStatus("all");
    setSearchCode("");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-base font-bold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          工位规划信息管理
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          支持跨房产、楼层进行工位规划，将工位规划关联到部门操作员，授权操作员进行工位的分配
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-3 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              总工位数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkstations}</div>
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
              {availableWorkstations}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              已占用工位
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {occupiedWorkstations}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选区域 */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">筛选条件</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleResetFilters}>
                重置
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <FileDown className="mr-2 h-4 w-4" />
                导出
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>工位编号</Label>
              <Input
                placeholder="搜索工位编号"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>所在房产</Label>
              <Select value={filterProperty} onValueChange={setFilterProperty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部房产</SelectItem>
                  {mockProperties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>所在办公区</Label>
              <Select value={filterOffice} onValueChange={setFilterOffice}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部办公区</SelectItem>
                  {mockOffices
                    .filter(
                      (office) =>
                        filterProperty === "all" ||
                        office.propertyId === filterProperty
                    )
                    .map((office) => (
                      <SelectItem key={office.id} value={office.id}>
                        {office.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>工位状态</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="available">可用</SelectItem>
                  <SelectItem value="occupied">已占用</SelectItem>
                  <SelectItem value="reserved">预留</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 工位列表 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">工位列表 ({filteredWorkstations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>工位编号</TableHead>
                  <TableHead>所在房产</TableHead>
                  <TableHead>所在办公区</TableHead>
                  <TableHead>楼层</TableHead>
                  <TableHead>位置</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>分配情况</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkstations.map((ws) => (
                  <TableRow key={ws.id}>
                    <TableCell className="font-medium">{ws.code}</TableCell>
                    <TableCell className="text-sm">{ws.propertyName}</TableCell>
                    <TableCell className="text-sm">{ws.officeName}</TableCell>
                    <TableCell>{ws.floor} 楼</TableCell>
                    <TableCell>
                      {ws.position
                        ? `第${ws.position.row}行 第${ws.position.column}列`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(ws.status) as any}>
                        {getStatusLabel(ws.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {ws.assignedTo ? (
                        <span className="text-sm text-muted-foreground">
                          已分配
                        </span>
                      ) : (
                        <span className="text-sm text-green-600">未分配</span>
                      )}
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

