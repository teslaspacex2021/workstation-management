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
import { mockOffices, mockProperties } from "@/lib/mock-data";
import { Office } from "@/types";
import { Plus, Pencil, Trash2, Boxes } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function OfficesPage() {
  const [offices, setOffices] = useState<Office[]>(mockOffices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOffice, setEditingOffice] = useState<Office | null>(null);
  const [formData, setFormData] = useState<Partial<Office>>({
    name: "",
    floor: 1,
    propertyId: "",
    propertyName: "",
    totalWorkstations: 0,
    occupiedWorkstations: 0,
    type: "open",
    layout: { rows: 0, columns: 0 },
  });

  // 筛选状态
  const [filterProperty, setFilterProperty] = useState<string>("all");
  const [filterFloor, setFilterFloor] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchName, setSearchName] = useState("");

  // 过滤办公区
  const filteredOffices = offices.filter((office) => {
    if (filterProperty !== "all" && office.propertyId !== filterProperty)
      return false;
    if (filterFloor !== "all" && office.floor.toString() !== filterFloor)
      return false;
    if (filterType !== "all" && office.type !== filterType) return false;
    if (searchName && !office.name.toLowerCase().includes(searchName.toLowerCase()))
      return false;
    return true;
  });

  // 获取所有楼层
  const allFloors = Array.from(new Set(offices.map(o => o.floor))).sort((a, b) => a - b);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProperty = mockProperties.find(
      (p) => p.id === formData.propertyId
    );
    if (editingOffice) {
      // 编辑
      setOffices(
        offices.map((o) =>
          o.id === editingOffice.id
            ? {
                ...editingOffice,
                ...formData,
                propertyName: selectedProperty?.name || "",
              }
            : o
        )
      );
    } else {
      // 新增
      const newOffice: Office = {
        id: `${Date.now()}`,
        ...formData,
        propertyName: selectedProperty?.name || "",
      } as Office;
      setOffices([...offices, newOffice]);
    }
    handleCloseDialog();
  };

  const handleEdit = (office: Office) => {
    setEditingOffice(office);
    setFormData(office);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("确定要删除这个办公区吗？")) {
      setOffices(offices.filter((o) => o.id !== id));
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingOffice(null);
    setFormData({
      name: "",
      floor: 1,
      propertyId: "",
      propertyName: "",
      totalWorkstations: 0,
      occupiedWorkstations: 0,
      type: "open",
      layout: { rows: 0, columns: 0 },
    });
  };

  // 重置筛选
  const handleResetFilters = () => {
    setFilterProperty("all");
    setFilterFloor("all");
    setFilterType("all");
    setSearchName("");
  };

  const getOfficeTypeLabel = (type: string) => {
    switch (type) {
      case "open":
        return "开放区域";
      case "private":
        return "独立办公室";
      case "special":
        return "特殊办公室";
      default:
        return type;
    }
  };

  const getOfficeTypeVariant = (type: string) => {
    switch (type) {
      case "open":
        return "default";
      case "private":
        return "secondary";
      case "special":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold flex items-center gap-2">
            <Boxes className="h-5 w-5 text-primary" />
            办公区信息管理
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            将房产数据规划为版工具，并关联房产数据，支持每个房产每个楼层规划多个办公区，支持纳管办公区名称、所在楼层、所在房产、总工位数等信息
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              新增办公区
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingOffice ? "编辑办公区信息" : "新增办公区信息"}
              </DialogTitle>
              <DialogDescription>请填写办公区的详细信息</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">办公区名称 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">办公区类型 *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          type: value as "open" | "private" | "special",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">开放区域</SelectItem>
                        <SelectItem value="private">独立办公室</SelectItem>
                        <SelectItem value="special">特殊办公室</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyId">所在房产 *</Label>
                    <Select
                      value={formData.propertyId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, propertyId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择房产" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProperties.map((property) => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">所在楼层 *</Label>
                    <Input
                      id="floor"
                      type="number"
                      value={formData.floor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          floor: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalWorkstations">总工位数 *</Label>
                    <Input
                      id="totalWorkstations"
                      type="number"
                      value={formData.totalWorkstations}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalWorkstations: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupiedWorkstations">已占用工位数</Label>
                    <Input
                      id="occupiedWorkstations"
                      type="number"
                      value={formData.occupiedWorkstations}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          occupiedWorkstations: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                {formData.type === "open" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rows">布局 - 行数</Label>
                      <Input
                        id="rows"
                        type="number"
                        value={formData.layout?.rows || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            layout: {
                              rows: Number(e.target.value),
                              columns: formData.layout?.columns || 0,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="columns">布局 - 列数</Label>
                      <Input
                        id="columns"
                        type="number"
                        value={formData.layout?.columns || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            layout: {
                              rows: formData.layout?.rows || 0,
                              columns: Number(e.target.value),
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                >
                  取消
                </Button>
                <Button type="submit">
                  {editingOffice ? "保存" : "创建"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 筛选区域 */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">筛选条件</CardTitle>
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              重置筛选
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>办公区名称</Label>
              <Input
                placeholder="搜索办公区名称"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
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
              <Label>所在楼层</Label>
              <Select value={filterFloor} onValueChange={setFilterFloor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部楼层</SelectItem>
                  {allFloors.map((floor) => (
                    <SelectItem key={floor} value={floor.toString()}>
                      {floor} 楼
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>办公区类型</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="open">开放区域</SelectItem>
                  <SelectItem value="private">独立办公室</SelectItem>
                  <SelectItem value="special">特殊办公室</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">办公区列表 ({filteredOffices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>办公区名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>所在房产</TableHead>
                  <TableHead>所在楼层</TableHead>
                  <TableHead>总工位数</TableHead>
                  <TableHead>已占用</TableHead>
                  <TableHead>利用率</TableHead>
                  <TableHead>布局</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffices.map((office) => (
                <TableRow key={office.id}>
                  <TableCell className="font-medium">{office.name}</TableCell>
                  <TableCell>
                    <Badge variant={getOfficeTypeVariant(office.type) as any}>
                      {getOfficeTypeLabel(office.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>{office.propertyName}</TableCell>
                  <TableCell>{office.floor} 楼</TableCell>
                  <TableCell>{office.totalWorkstations}</TableCell>
                  <TableCell>{office.occupiedWorkstations}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        office.occupiedWorkstations / office.totalWorkstations >
                        0.8
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {(
                        (office.occupiedWorkstations /
                          office.totalWorkstations) *
                        100
                      ).toFixed(1)}
                      %
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {office.layout
                      ? `${office.layout.rows}行 × ${office.layout.columns}列`
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(office)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(office.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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

