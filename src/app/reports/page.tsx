"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockReports } from "@/lib/mock-data";
import { FileText, Download, Printer, Building2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ReportsPage() {
  const handleExport = () => {
    alert("导出功能已触发，实际项目中可导出为Excel或PDF文件");
  };

  const handlePrint = () => {
    window.print();
  };

  const totalArea = mockReports.reduce((sum, r) => sum + r.buildingArea, 0);
  const averageArea = totalArea / mockReports.length;
  const companies = new Set(mockReports.map(r => r.companyName)).size;
  const branches = new Set(mockReports.map(r => r.branchName)).size;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            常规报表展现
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            办公用房报表，展现内容：序号、公司名称、分公司名称、房产证、房产名称、建筑面积（平方米）、房产地址（省/直辖市、地级市/直辖市、县级市、街道/牌号）
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            打印
          </Button>
          <Button size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            导出报表
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              房产总数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              涵盖 {branches} 个分公司
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              总建筑面积
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArea.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">平方米</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              平均面积
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageArea.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <p className="text-xs text-muted-foreground mt-1">平方米/房产</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              最大房产
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">
              {mockReports.sort((a, b) => b.buildingArea - a.buildingArea)[0].propertyName}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockReports.sort((a, b) => b.buildingArea - a.buildingArea)[0].buildingArea.toLocaleString()} m²
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 报表标题 */}
      <Card className="mb-4">
        <CardHeader className="text-center pb-3">
          <CardTitle className="text-lg">办公用房情况报表</CardTitle>
          <div className="text-sm text-muted-foreground mt-2">
            统计时间：{new Date().toLocaleDateString("zh-CN", { year: 'numeric', month: '2-digit', day: '2-digit' })}
            <Badge variant="outline" className="ml-3">
              {mockReports.length} 项房产
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* 报表内容 */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center font-bold border">序号</TableHead>
                  <TableHead className="text-center font-bold border">公司名称</TableHead>
                  <TableHead className="text-center font-bold border">分公司名称</TableHead>
                  <TableHead className="text-center font-bold border">房产证</TableHead>
                  <TableHead className="text-center font-bold border">房产名称</TableHead>
                  <TableHead className="text-center font-bold border">
                    建筑面积（m²）
                  </TableHead>
                  <TableHead className="text-center font-bold border">
                    房产地址
                  </TableHead>
                  <TableHead className="text-center font-bold border">
                    占比
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="text-center border font-medium">
                      {report.sequence}
                    </TableCell>
                    <TableCell className="border">{report.companyName}</TableCell>
                    <TableCell className="border">{report.branchName || "-"}</TableCell>
                    <TableCell className="border font-mono text-sm">
                      {report.certificateNo}
                    </TableCell>
                    <TableCell className="border font-medium">
                      {report.propertyName}
                    </TableCell>
                    <TableCell className="text-right border">
                      {report.buildingArea.toLocaleString()}
                    </TableCell>
                    <TableCell className="border text-sm">{report.address}</TableCell>
                    <TableCell className="text-center border">
                      <Badge variant="outline">
                        {((report.buildingArea / totalArea) * 100).toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/30 font-bold">
                  <TableCell colSpan={5} className="text-right border">
                    合计：
                  </TableCell>
                  <TableCell className="text-right border">
                    {totalArea.toLocaleString()}
                  </TableCell>
                  <TableCell className="border">-</TableCell>
                  <TableCell className="text-center border">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 分布统计 */}
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">分公司分布统计</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from(new Set(mockReports.map(r => r.branchName))).map(branch => {
                const branchReports = mockReports.filter(r => r.branchName === branch);
                const branchArea = branchReports.reduce((sum, r) => sum + r.buildingArea, 0);
                return (
                  <div key={branch} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">{branch}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{branchArea.toLocaleString()} m²</span>
                      <Badge variant="secondary" className="text-xs">
                        {branchReports.length} 项
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">报表说明</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. 本报表统计了省公司所有办公用房的详细信息</p>
              <p>2. 建筑面积以房产证登记面积为准</p>
              <p>3. 占比列显示各房产占总面积的百分比</p>
              <p>4. 报表数据实时更新，确保信息准确性</p>
              <p>5. 如有疑问，请联系资产管理部门</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 打印样式 */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area,
          .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
