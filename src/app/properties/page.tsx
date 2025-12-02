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
import { mockProperties } from "@/lib/mock-data";
import { Property } from "@/types";
import { Plus, Pencil, Trash2, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<Partial<Property>>({
    code: "",
    name: "",
    type: "",
    region: "",
    address: "",
    area: 0,
    floors: 0,
    certificateNo: "",
    company: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProperty) {
      // 编辑
      setProperties(
        properties.map((p) =>
          p.id === editingProperty.id ? { ...editingProperty, ...formData } : p
        )
      );
    } else {
      // 新增
      const newProperty: Property = {
        id: `${Date.now()}`,
        ...formData as Property,
      };
      setProperties([...properties, newProperty]);
    }
    handleCloseDialog();
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData(property);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("确定要删除这条房产信息吗？")) {
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProperty(null);
    setFormData({
      code: "",
      name: "",
      type: "",
      region: "",
      address: "",
      area: 0,
      floors: 0,
      certificateNo: "",
      company: "",
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            房产信息管理
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            管理房产的纳管信息，支持纳管房产编号、房产名称、房产类型、地区、地址、面积、楼层数等信息
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              新增房产
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProperty ? "编辑房产信息" : "新增房产信息"}
              </DialogTitle>
              <DialogDescription>
                请填写房产的详细信息
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">房产编号 *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">房产名称 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">房产类型 *</Label>
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      placeholder="如：办公楼、研发楼"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">地区 *</Label>
                    <Input
                      id="region"
                      value={formData.region}
                      onChange={(e) =>
                        setFormData({ ...formData, region: e.target.value })
                      }
                      placeholder="省/直辖市、地级市/直辖市、县级市"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">详细地址 *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">建筑面积 (m²) *</Label>
                    <Input
                      id="area"
                      type="number"
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: Number(e.target.value) })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floors">楼层数 *</Label>
                    <Input
                      id="floors"
                      type="number"
                      value={formData.floors}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          floors: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="certificateNo">房产证号</Label>
                    <Input
                      id="certificateNo"
                      value={formData.certificateNo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          certificateNo: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">公司名称</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                </div>
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
                  {editingProperty ? "保存" : "创建"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">房产列表 ({properties.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>房产编号</TableHead>
                <TableHead>房产名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>地区</TableHead>
                <TableHead>地址</TableHead>
                <TableHead>面积 (m²)</TableHead>
                <TableHead>楼层数</TableHead>
                <TableHead>房产证号</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.code}</TableCell>
                  <TableCell>{property.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{property.type}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{property.region}</TableCell>
                  <TableCell className="max-w-xs truncate" title={property.address}>
                    {property.address}
                  </TableCell>
                  <TableCell>{property.area.toLocaleString()}</TableCell>
                  <TableCell>{property.floors}</TableCell>
                  <TableCell className="text-sm">{property.certificateNo}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(property)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(property.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

