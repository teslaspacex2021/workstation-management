'use client';

import { useState } from 'react';
import { WorkstationLayout } from '@/components/workstation/workstation-layout';
import { mockOffices, mockWorkstations, mockEmployees, mockProperties } from '@/lib/mock-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Layers, MapPin, Users, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { Workstation } from '@/types';

export default function DisplayPage() {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(mockProperties[0].id);
  const [selectedFloor, setSelectedFloor] = useState<number>(3);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* 头部标题 */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white mb-1">
          工位布局大屏展示
        </h1>
        <p className="text-slate-400 text-sm">
          {selectedProperty?.name} - 实时监控与管理
        </p>
      </div>

      {/* 紧凑布局：选择器和统计 */}
      <div className="grid grid-cols-12 gap-3 mb-4">
        {/* 选择器区域 */}
        <div className="col-span-12 lg:col-span-4 space-y-3">
          <Card className="p-3 bg-slate-800/50 border-slate-700 backdrop-blur">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  选择房产
                </label>
                <Select value={selectedPropertyId} onValueChange={setSelectedPropertyId}>
                  <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white h-9">
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

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" />
                  选择楼层
                </label>
                <Select 
                  value={selectedFloor.toString()} 
                  onValueChange={(value) => setSelectedFloor(Number(value))}
                >
                  <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white h-9">
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
          </Card>
        </div>

        {/* 统计信息区域 - 紧凑卡片 */}
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 总工位数 */}
            <Card className="p-3 bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-700/50 backdrop-blur">
              <div className="flex items-center justify-between mb-1">
                <MapPin className="h-4 w-4 text-blue-400" />
                <Badge variant="outline" className="bg-blue-950/50 text-blue-300 border-blue-700 text-[10px] px-1.5 py-0">
                  总计
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">
                {totalWorkstations}
              </div>
              <div className="text-xs text-blue-300">
                工位总数
              </div>
            </Card>

            {/* 已占用 */}
            <Card className="p-3 bg-gradient-to-br from-red-900/40 to-red-800/40 border-red-700/50 backdrop-blur">
              <div className="flex items-center justify-between mb-1">
                <CheckCircle2 className="h-4 w-4 text-red-400" />
                <Badge variant="outline" className="bg-red-950/50 text-red-300 border-red-700 text-[10px] px-1.5 py-0">
                  占用
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">
                {occupiedWorkstations}
              </div>
              <div className="text-xs text-red-300">
                已占用工位
              </div>
            </Card>

            {/* 空闲 */}
            <Card className="p-3 bg-gradient-to-br from-green-900/40 to-green-800/40 border-green-700/50 backdrop-blur">
              <div className="flex items-center justify-between mb-1">
                <Circle className="h-4 w-4 text-green-400" />
                <Badge variant="outline" className="bg-green-950/50 text-green-300 border-green-700 text-[10px] px-1.5 py-0">
                  空闲
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">
                {availableWorkstations}
              </div>
              <div className="text-xs text-green-300">
                可用工位
              </div>
            </Card>

            {/* 利用率 */}
            <Card className="p-3 bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-purple-700/50 backdrop-blur">
              <div className="flex items-center justify-between mb-1">
                <AlertCircle className="h-4 w-4 text-purple-400" />
                <Badge variant="outline" className="bg-purple-950/50 text-purple-300 border-purple-700 text-[10px] px-1.5 py-0">
                  效率
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">
                {utilizationRate}%
              </div>
              <div className="text-xs text-purple-300">
                利用率
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* 当前楼层统计 */}
      <Card className="p-3 bg-slate-800/50 border-slate-700 backdrop-blur mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-slate-400" />
              <span className="text-white font-medium">当前楼层：{selectedFloor}楼</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-400">
                总工位: <span className="text-white font-semibold">{currentFloorTotal}</span>
              </span>
              <span className="text-slate-400">
                已占用: <span className="text-red-400 font-semibold">{currentFloorOccupied}</span>
              </span>
              <span className="text-slate-400">
                空闲: <span className="text-green-400 font-semibold">{currentFloorTotal - currentFloorOccupied}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-green-500"></div>
              <span className="text-slate-400">空闲</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-slate-500"></div>
              <span className="text-slate-400">已占用</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-blue-500"></div>
              <span className="text-slate-400">独立办公室</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-purple-500"></div>
              <span className="text-slate-400">特殊办公室</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 工位布局图 - 主要展示区域 */}
      <Card className="bg-slate-800/30 border-slate-700 backdrop-blur">
        {currentFloorOffices.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4">
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
            <p>该楼层暂无办公区数据</p>
          </div>
        )}
      </Card>

      {/* 底部信息 */}
      <div className="mt-4 text-center text-xs text-slate-500">
        <p>省公司综合生产楼房间及工位信息管理系统 © 2024</p>
      </div>
    </div>
  );
}

