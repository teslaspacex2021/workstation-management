"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockOffices, mockWorkstations, mockProperties } from "@/lib/mock-data";
import { MonitorPlay, Building2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [selectedProperty, setSelectedProperty] = useState(mockProperties[0].id);
  const [selectedOffice, setSelectedOffice] = useState(mockOffices[0].id);

  const property = mockProperties.find((p) => p.id === selectedProperty);
  const officesInProperty = mockOffices.filter(
    (office) => office.propertyId === selectedProperty
  );
  const office = mockOffices.find((o) => o.id === selectedOffice);
  const workstationsInOffice = mockWorkstations.filter(
    (ws) => ws.officeId === selectedOffice
  );

  // 渲染工位网格 - 开放区域
  const renderOpenAreaGrid = () => {
    if (!office || !office.layout || office.type !== "open") {
      return null;
    }

    const { rows, columns } = office.layout;
    const grid: React.ReactNode[][] = [];

    for (let row = 1; row <= rows; row++) {
      const rowElements: React.ReactNode[] = [];
      for (let col = 1; col <= columns; col++) {
        const workstation = workstationsInOffice.find(
          (ws) => ws.position?.row === row && ws.position?.column === col
        );

        rowElements.push(
          <div
            key={`${row}-${col}`}
            className={`
              aspect-square rounded-lg border-2 flex flex-col items-center justify-center p-2 text-xs transition-all hover:shadow-lg cursor-pointer
              ${
                workstation?.status === "occupied"
                  ? "bg-orange-100 border-orange-400 dark:bg-orange-900/20"
                  : workstation?.status === "reserved"
                  ? "bg-blue-100 border-blue-400 dark:bg-blue-900/20"
                  : "bg-green-100 border-green-400 dark:bg-green-900/20"
              }
            `}
            title={
              workstation
                ? `${workstation.code} - ${workstation.status === "occupied" ? "已占用" : workstation.status === "reserved" ? "预留" : "可用"}`
                : "空位"
            }
          >
            {workstation && (
              <>
                <div className="font-semibold">{workstation.code}</div>
                <div className="text-[10px] mt-1 text-center">
                  {workstation.status === "occupied"
                    ? "已占用"
                    : workstation.status === "reserved"
                    ? "预留"
                    : "可用"}
                </div>
              </>
            )}
          </div>
        );
      }
      grid.push(rowElements);
    }

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold">开放区域办公区（列、排）</div>
          <div className="flex gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 border border-green-400 rounded"></div>
              <span>可用</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-100 border border-orange-400 rounded"></div>
              <span>已占用</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-100 border border-blue-400 rounded"></div>
              <span>预留</span>
            </div>
          </div>
        </div>
        {grid.map((row, index) => (
          <div key={index} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {row}
          </div>
        ))}
      </div>
    );
  };

  // 渲染独立办公室
  const renderPrivateOffice = () => {
    if (office?.type !== "private") return null;

    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-full max-w-md border-2 border-purple-400 bg-purple-50 dark:bg-purple-900/20">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center">
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-300" />
            </div>
            <h3 className="text-xl font-bold mb-2">独立办公室</h3>
            <p className="text-sm text-muted-foreground mb-4">{office.name}</p>
            <div className="flex justify-center gap-4">
              <Badge variant="secondary" className="text-base px-4 py-1">
                总工位: {office.totalWorkstations}
              </Badge>
              <Badge 
                variant={office.occupiedWorkstations > 0 ? "destructive" : "default"} 
                className="text-base px-4 py-1"
              >
                已占用: {office.occupiedWorkstations}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // 渲染特殊办公室（支持多人）
  const renderSpecialOffice = () => {
    if (office?.type !== "special") return null;

    const capacity = office.totalWorkstations;
    const occupied = office.occupiedWorkstations;
    const available = capacity - occupied;

    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-full max-w-2xl border-2 border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-lg bg-indigo-200 dark:bg-indigo-800 flex items-center justify-center">
                <Users className="h-10 w-10 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">特殊办公室（支持多人）</h3>
                <p className="text-sm text-muted-foreground mb-4">{office.name}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">总容量</div>
                    <div className="text-2xl font-bold">{capacity}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">已占用</div>
                    <div className="text-2xl font-bold text-orange-600">{occupied}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">可用</div>
                    <div className="text-2xl font-bold text-green-600">{available}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                    <div 
                      className="bg-indigo-600 h-3 rounded-full transition-all" 
                      style={{ width: `${(occupied / capacity) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 text-right">
                    占用率: {((occupied / capacity) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const totalWorkstations = workstationsInOffice.length;
  const occupiedWorkstations = workstationsInOffice.filter(
    (ws) => ws.status === "occupied"
  ).length;
  const availableWorkstations = workstationsInOffice.filter(
    (ws) => ws.status === "available"
  ).length;
  const reservedWorkstations = workstationsInOffice.filter(
    (ws) => ws.status === "reserved"
  ).length;

  return (
    <div className="p-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="mb-6">
        <h1 className="text-base font-bold flex items-center gap-2 mb-1">
          <MonitorPlay className="h-5 w-5 text-primary" />
          房间和工位大屏展示
        </h1>
        <p className="text-sm text-muted-foreground">
          工位数据转换成图形进行展示：包含开放区域的办公区展示（列、排）、独立办公室、特殊办公室（支持多人）
        </p>
      </div>

      {/* 选择器 */}
      <div className="grid gap-4 md:grid-cols-2 mb-4">
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium">选择房产</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockProperties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {property.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium">选择办公区</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedOffice} onValueChange={setSelectedOffice}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {officesInProperty.map((office) => (
                  <SelectItem key={office.id} value={office.id}>
                    {office.name} ({office.floor}楼) - {office.type === "open" ? "开放区域" : office.type === "private" ? "独立办公室" : "特殊办公室"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* 房产信息卡片 */}
      {property && (
        <Card className="mb-4 border-2 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Building2 className="h-5 w-5 text-primary" />
              {property.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground mb-1">房产编号</div>
                <div className="font-semibold">{property.code}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">建筑面积</div>
                <div className="font-semibold">
                  {property.area.toLocaleString()} m²
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">楼层数</div>
                <div className="font-semibold">{property.floors} 层</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">地址</div>
                <div className="text-xs font-medium truncate" title={property.address}>
                  {property.address}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 统计信息 */}
      {office && (
        <div className="grid gap-4 md:grid-cols-5 mb-4">
          <Card className="border-2 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                办公区名称
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{office.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {office.floor} 楼
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                总工位数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWorkstations || office.totalWorkstations}</div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                可用工位
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {availableWorkstations || (office.totalWorkstations - office.occupiedWorkstations)}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                已占用
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {occupiedWorkstations || office.occupiedWorkstations}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                预留
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {reservedWorkstations}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 工位布局图 */}
      <Card className="border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">工位布局图</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/30 rounded-lg min-h-[300px]">
            {office?.type === "open" && renderOpenAreaGrid()}
            {office?.type === "private" && renderPrivateOffice()}
            {office?.type === "special" && renderSpecialOffice()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
