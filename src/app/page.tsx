'use client';

import { useState } from 'react';
import { WorkstationLayout } from '@/components/workstation/workstation-layout';
import { FloorPlanLayout } from '@/components/workstation/floor-plan-layout';
import { mockOffices, mockWorkstations, mockEmployees, mockProperties } from '@/lib/mock-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Layers, MapPin, Users, CheckCircle2, Circle, AlertCircle, LayoutGrid, MonitorPlay } from 'lucide-react';
import { Workstation } from '@/types';

export default function Home() {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(mockProperties[0].id);
  const [selectedFloor, setSelectedFloor] = useState<number>(3);
  const [viewMode, setViewMode] = useState<'grid' | 'floorplan'>('floorplan');

  // 获取选中房产
  const selectedProperty = mockProperties.find(p => p.id === selectedPropertyId);
  
  // 获取选中房产的楼层列表
  const floors = selectedProperty 
    ? Array.from(new Set(mockOffices
        .filter(o => o.propertyId === selectedPropertyId)
        .map(o => o.floor)
      )).sort((a, b) => a - b)
    : [];

  // 获取当前楼层的办公区
  const currentFloorOffices = mockOffices.filter(
    o => o.propertyId === selectedPropertyId && o.floor === selectedFloor
  );

  // 统计数据
  const totalWorkstations = mockWorkstations.filter(ws => ws.propertyId === selectedPropertyId).length;
  const occupiedWorkstations = mockWorkstations.filter(
    ws => ws.propertyId === selectedPropertyId && ws.status === 'occupied'
  ).length;
  const availableWorkstations = totalWorkstations - occupiedWorkstations;
  const utilizationRate = totalWorkstations > 0 
    ? ((occupiedWorkstations / totalWorkstations) * 100).toFixed(1) 
    : '0';

  const currentFloorTotal = mockWorkstations.filter(
    ws => ws.propertyId === selectedPropertyId && ws.floor === selectedFloor
  ).length;
  const currentFloorOccupied = mockWorkstations.filter(
    ws => ws.propertyId === selectedPropertyId && ws.floor === selectedFloor && ws.status === 'occupied'
  ).length;

  const handleBookWorkstation = (workstation: Workstation) => {
    // 这里可以实现预订逻辑
    alert(`工位 ${workstation.code} 预订成功！`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3">
      {/* 第一行：标题和选择器 - 居中横向排列 */}
      <div className="flex items-center justify-center gap-6 mb-3">
        {/* 标题 */}
        <div className="flex items-center gap-2">
          <MonitorPlay className="h-5 w-5 text-blue-400" />
          <h1 className="text-xl font-bold text-white">工位布局大屏展示</h1>
        </div>

        {/* 房产选择器 */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 flex items-center gap-1 whitespace-nowrap">
            <Building2 className="h-3.5 w-3.5" />
            房产
          </label>
          <Select value={selectedPropertyId} onValueChange={setSelectedPropertyId}>
            <SelectTrigger className="w-[200px] bg-slate-800/50 border-slate-600 text-white h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockProperties.map(property => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 楼层选择器 */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 flex items-center gap-1 whitespace-nowrap">
            <Layers className="h-3.5 w-3.5" />
            楼层
          </label>
          <Select 
            value={selectedFloor.toString()} 
            onValueChange={(value) => setSelectedFloor(Number(value))}
          >
            <SelectTrigger className="w-[120px] bg-slate-800/50 border-slate-600 text-white h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {floors.map(floor => (
                <SelectItem key={floor} value={floor.toString()}>
                  {floor} 楼
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 第二行：统计信息卡片 */}
      <div className="mb-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {/* 总工位数 */}
          <Card className="p-2 bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-700/50 backdrop-blur">
              <div className="flex items-center justify-between mb-0.5">
                <MapPin className="h-3.5 w-3.5 text-blue-400" />
                <Badge variant="outline" className="bg-blue-950/50 text-blue-300 border-blue-700 text-[9px] px-1 py-0">
                  总计
                </Badge>
              </div>
              <div className="text-xl font-bold text-white mb-0">
                {totalWorkstations}
              </div>
              <div className="text-[10px] text-blue-300">
                工位总数
              </div>
          </Card>

          {/* 已占用 */}
          <Card className="p-2 bg-gradient-to-br from-red-900/40 to-red-800/40 border-red-700/50 backdrop-blur">
              <div className="flex items-center justify-between mb-0.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-red-400" />
                <Badge variant="outline" className="bg-red-950/50 text-red-300 border-red-700 text-[9px] px-1 py-0">
                  占用
                </Badge>
              </div>
              <div className="text-xl font-bold text-white mb-0">
                {occupiedWorkstations}
              </div>
              <div className="text-[10px] text-red-300">
                已占用工位
              </div>
          </Card>

          {/* 空闲 */}
          <Card className="p-2 bg-gradient-to-br from-green-900/40 to-green-800/40 border-green-700/50 backdrop-blur">
              <div className="flex items-center justify-between mb-0.5">
                <Circle className="h-3.5 w-3.5 text-green-400" />
                <Badge variant="outline" className="bg-green-950/50 text-green-300 border-green-700 text-[9px] px-1 py-0">
                  空闲
                </Badge>
              </div>
              <div className="text-xl font-bold text-white mb-0">
                {availableWorkstations}
              </div>
              <div className="text-[10px] text-green-300">
                可用工位
              </div>
          </Card>

          {/* 利用率 */}
          <Card className="p-2 bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-purple-700/50 backdrop-blur">
              <div className="flex items-center justify-between mb-0.5">
                <AlertCircle className="h-3.5 w-3.5 text-purple-400" />
                <Badge variant="outline" className="bg-purple-950/50 text-purple-300 border-purple-700 text-[9px] px-1 py-0">
                  效率
                </Badge>
              </div>
              <div className="text-xl font-bold text-white mb-0">
                {utilizationRate}%
              </div>
              <div className="text-[10px] text-purple-300">
                利用率
              </div>
          </Card>
        </div>
      </div>

      {/* 当前楼层统计和视图切换 - 合并为一行 */}
      <Card className="p-2 bg-slate-800/50 border-slate-700 backdrop-blur mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-white font-medium">{selectedFloor}楼</span>
            </div>
            <span className="text-slate-400">
              总: <span className="text-white font-semibold">{currentFloorTotal}</span>
            </span>
            <span className="text-slate-400">
              占用: <span className="text-red-400 font-semibold">{currentFloorOccupied}</span>
            </span>
            <span className="text-slate-400">
              空闲: <span className="text-green-400 font-semibold">{currentFloorTotal - currentFloorOccupied}</span>
            </span>
            <div className="flex items-center gap-2 ml-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-green-500"></div>
                <span className="text-slate-400 text-[10px]">空闲</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-slate-500"></div>
                <span className="text-slate-400 text-[10px]">占用</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-blue-500"></div>
                <span className="text-slate-400 text-[10px]">独立</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-purple-500"></div>
                <span className="text-slate-400 text-[10px]">会议</span>
              </div>
            </div>
          </div>
          
          {/* 视图切换按钮 */}
          <div className="flex items-center gap-1.5">
            <Button
              variant={viewMode === 'floorplan' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('floorplan')}
              className="h-7 text-xs bg-slate-700 border-slate-600 hover:bg-slate-600"
            >
              <LayoutGrid className="h-3 w-3 mr-1" />
              平面图
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-7 text-xs bg-slate-700 border-slate-600 hover:bg-slate-600"
            >
              <Layers className="h-3 w-3 mr-1" />
              网格
            </Button>
          </div>
        </div>
      </Card>

      {/* 工位布局图 - 主要展示区域 */}
      <Card className="bg-slate-800/30 border-slate-700 backdrop-blur p-3">
        {viewMode === 'floorplan' && (selectedFloor === 3 || selectedFloor === 5 || selectedFloor === 12) ? (
          <FloorPlanLayout
            floorNumber={selectedFloor}
            floorName={selectedFloor === 3 ? '三楼' : selectedFloor === 5 ? '五楼' : '十二楼'}
            employees={mockEmployees}
          />
        ) : currentFloorOffices.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {currentFloorOffices.map(office => {
              const officeWorkstations = mockWorkstations.filter(ws => ws.officeId === office.id);
              return (
                <div key={office.id} className="relative">
                  <div className="absolute top-2 left-2 z-10">
                    <Badge 
                      variant="secondary" 
                      className={`
                        ${office.type === 'open' ? 'bg-slate-700 text-slate-200' : ''}
                        ${office.type === 'private' ? 'bg-blue-700 text-blue-200' : ''}
                        ${office.type === 'special' ? 'bg-purple-700 text-purple-200' : ''}
                      `}
                    >
                      {office.type === 'open' && '开放区域'}
                      {office.type === 'private' && '独立办公室'}
                      {office.type === 'special' && '特殊办公室'}
                    </Badge>
                  </div>
                  <WorkstationLayout
                    office={office}
                    workstations={officeWorkstations}
                    employees={mockEmployees}
                    onBook={handleBookWorkstation}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">
            <Layers className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>该楼层暂无办公区数据，请切换到3楼、5楼或12楼查看详细平面图</p>
            <div className="flex gap-2 justify-center mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedFloor(3)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                切换到3楼
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedFloor(5)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                切换到5楼
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedFloor(12)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                切换到12楼
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* 底部信息 */}
      <div className="mt-2 text-center text-[10px] text-slate-500">
        <p>省公司综合生产楼房间及工位信息管理系统 © 2024</p>
      </div>
    </div>
  );
}
