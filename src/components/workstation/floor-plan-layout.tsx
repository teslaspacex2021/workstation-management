'use client';

import { useState } from 'react';
import { Employee } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Users as UsersIcon } from 'lucide-react';
import { getFloorLayout, getFloorSVGSize, Room, WorkstationData } from '@/lib/floor-layouts';

interface FloorPlanLayoutProps {
  floorNumber: number;
  floorName: string;
  employees: Employee[];
}

interface BookingTarget {
  type: 'workstation' | 'meeting' | 'private';
  data: WorkstationData | Room;
  name: string;
}

export function FloorPlanLayout({ floorNumber, floorName, employees }: FloorPlanLayoutProps) {
  const [selectedTarget, setSelectedTarget] = useState<BookingTarget | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // 获取当前楼层的布局数据
  const rooms = getFloorLayout(floorNumber);
  const { width: svgWidth, height: svgHeight } = getFloorSVGSize(floorNumber);

  // 处理工位点击
  const handleWorkstationClick = (ws: WorkstationData, roomName: string) => {
    setSelectedTarget({
      type: 'workstation',
      data: ws,
      name: roomName
    });
  };

  // 处理会议室点击
  const handleMeetingRoomClick = (room: Room) => {
    setSelectedTarget({
      type: 'meeting',
      data: room,
      name: room.name
    });
  };

  // 处理独立办公室点击
  const handlePrivateOfficeClick = (room: Room) => {
    setSelectedTarget({
      type: 'private',
      data: room,
      name: room.name
    });
  };

  // 处理预订
  const handleBook = () => {
    if (!selectedTarget) return;
    
    if (selectedTarget.type === 'workstation') {
      const ws = selectedTarget.data as WorkstationData;
      alert(`工位 ${ws.code} 预订成功！`);
    } else if (selectedTarget.type === 'meeting') {
      const room = selectedTarget.data as Room;
      alert(`${room.name} 预订成功！`);
    } else if (selectedTarget.type === 'private') {
      const room = selectedTarget.data as Room;
      alert(`${room.name} 预订成功！`);
    }
    
    setSelectedTarget(null);
  };

  return (
    <>
      <div className="relative">
        <svg 
            width="100%" 
            height="100%" 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="bg-white border border-slate-200 shadow-2xl rounded-lg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7" stopOpacity="1" />
                <stop offset="100%" stopColor="#fef08a" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dbeafe" stopOpacity="1" />
                <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d1f4e0" stopOpacity="1" />
                <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e9d5ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* 标题 */}
            <text x={svgWidth / 2} y={30} textAnchor="middle" className="fill-slate-800 font-bold text-lg">
              {floorName}工位分布图
            </text>

            {/* 方向标识 - 北面 */}
            <text x={svgWidth / 2} y={80} textAnchor="middle" className="fill-slate-600 text-sm">
              北面（金水路）
            </text>

            {/* 绘制所有房间 */}
            {rooms.map((room) => {
              const isClickable = room.type === 'meeting' || room.type === 'private';
              const isHovered = hoveredId === room.id;
              
              return (
                <g key={room.id}>
                  {/* 房间背景 */}
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    fill={room.color?.includes('#fef') ? 'url(#yellowGradient)' : room.color?.includes('#dbe') ? 'url(#blueGradient)' : room.color?.includes('#e9d') ? 'url(#purpleGradient)' : room.color?.includes('#d1f') ? 'url(#greenGradient)' : room.color}
                    stroke={isHovered ? '#3b82f6' : '#64748b'}
                    strokeWidth={isHovered ? '3' : '2'}
                    rx="4"
                    className={isClickable ? 'cursor-pointer' : ''}
                    opacity={isHovered ? 1 : 0.95}
                    onMouseEnter={() => isClickable && setHoveredId(room.id)}
                    onMouseLeave={() => isClickable && setHoveredId(null)}
                    onClick={() => {
                      if (room.type === 'meeting') handleMeetingRoomClick(room);
                      if (room.type === 'private') handlePrivateOfficeClick(room);
                    }}
                  />

                  {/* 房间名称 */}
                  <text
                    x={room.x + room.width / 2}
                    y={room.y + 20}
                    textAnchor="middle"
                    className="fill-slate-700 font-semibold text-xs"
                  >
                    {room.name}
                  </text>

                  {/* 会议室图标 */}
                  {room.type === 'meeting' && (
                    <g>
                      <circle cx={room.x + room.width / 2} cy={room.y + room.height / 2} r="30" fill="#a855f7" opacity="0.2" />
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2 + 5}
                        textAnchor="middle"
                        className="fill-purple-700 font-semibold text-lg"
                      >
                        会议
                      </text>
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height - 15}
                        textAnchor="middle"
                        className="fill-purple-600 text-xs"
                      >
                        点击预订
                      </text>
                    </g>
                  )}

                  {/* 独立办公室展示工位 */}
                  {room.type === 'private' && room.workstations && room.workstations.map((ws) => (
                    <g
                      key={ws.id}
                      transform={`translate(${room.x + ws.x}, ${room.y + ws.y})`}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredId(ws.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWorkstationClick(ws, room.name);
                      }}
                    >
                      <rect
                        width="55"
                        height="35"
                        rx="3"
                        fill={ws.status === 'available' ? '#10b981' : '#60a5fa'}
                        stroke={hoveredId === ws.id ? '#3b82f6' : '#3b82f6'}
                        strokeWidth={hoveredId === ws.id ? '2' : '1'}
                        opacity={hoveredId === ws.id ? 1 : 0.9}
                      />
                      <text
                        x="27.5"
                        y="22"
                        textAnchor="middle"
                        className="fill-white font-medium text-[10px]"
                      >
                        {ws.employeeName || '空闲'}
                      </text>
                    </g>
                  ))}

                  {/* 普通办公区绘制工位 */}
                  {room.type === 'office' && room.workstations?.map((ws) => (
                    <g
                      key={ws.id}
                      transform={`translate(${room.x + ws.x}, ${room.y + ws.y})`}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredId(ws.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => handleWorkstationClick(ws, room.name)}
                    >
                      <rect
                        width="55"
                        height="35"
                        rx="3"
                        fill={ws.status === 'available' ? '#10b981' : '#94a3b8'}
                        stroke={hoveredId === ws.id ? '#3b82f6' : '#475569'}
                        strokeWidth={hoveredId === ws.id ? '2' : '1'}
                        opacity={hoveredId === ws.id ? 1 : 0.9}
                      />
                      <text
                        x="27.5"
                        y="22"
                        textAnchor="middle"
                        className="fill-white font-medium text-[10px]"
                      >
                        {ws.employeeName || '空'}
                      </text>
                    </g>
                  ))}

                  {/* 特殊标识：走廊 */}
                  {room.type === 'corridor' && (
                    <text
                      x={room.x + room.width / 2}
                      y={room.y + room.height / 2}
                      textAnchor="middle"
                      className="fill-slate-500 text-[10px]"
                      transform={`rotate(-90, ${room.x + room.width / 2}, ${room.y + room.height / 2})`}
                    >
                      过道
                    </text>
                  )}

                  {/* 特殊标识：门 */}
                  {room.type === 'door' && room.height < 150 && (
                    <text
                      x={room.x + room.width / 2}
                      y={room.y + room.height / 2 + 5}
                      textAnchor="middle"
                      className="fill-slate-600 text-xs"
                    >
                      部门
                    </text>
                  )}
                </g>
              );
            })}

            {/* 方向标识 - 南面 */}
            <text x={svgWidth / 2} y={385} textAnchor="middle" className="fill-slate-600 text-sm">
              南面
            </text>

            {/* 西侧标识 */}
            <text
              x={40}
              y={250}
              textAnchor="middle"
              className="fill-slate-600 text-sm"
              transform="rotate(-90, 40, 250)"
            >
              西
            </text>

            {/* 东侧标识（走廊） */}
            <text
              x={1190}
              y={250}
              textAnchor="middle"
              className="fill-slate-600 text-sm"
              transform="rotate(90, 1190, 250)"
            >
              走廊
            </text>

            {/* 底部剩余工位提示 */}
            <g transform="translate(190, 365)">
              <rect width="200" height="25" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
              <text x="100" y="17" textAnchor="middle" className="fill-red-600 text-xs font-semibold">
                剩余工位5个
              </text>
            </g>

            <g transform="translate(810, 365)">
              <rect width="200" height="25" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
              <text x="100" y="17" textAnchor="middle" className="fill-red-600 text-xs font-semibold">
                剩余工位1个
              </text>
            </g>
          </svg>
      </div>

      {/* 预订详情弹窗 */}
      <Dialog open={!!selectedTarget} onOpenChange={() => setSelectedTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedTarget?.type === 'workstation' && <User className="h-5 w-5 text-primary" />}
              {selectedTarget?.type === 'meeting' && <UsersIcon className="h-5 w-5 text-purple-600" />}
              {selectedTarget?.type === 'private' && <User className="h-5 w-5 text-blue-600" />}
              {selectedTarget?.type === 'workstation' && '工位详情'}
              {selectedTarget?.type === 'meeting' && '会议室详情'}
              {selectedTarget?.type === 'private' && '独立办公室详情'}
            </DialogTitle>
            <DialogDescription>
              {selectedTarget?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedTarget && (
            <div className="space-y-4 py-4">
              {selectedTarget.type === 'workstation' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">工位编号</p>
                      <p className="font-medium">{(selectedTarget.data as WorkstationData).code}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">状态</p>
                      <Badge variant={(selectedTarget.data as WorkstationData).status === 'available' ? 'default' : 'secondary'}>
                        {(selectedTarget.data as WorkstationData).status === 'available' ? '空闲' : '已占用'}
                      </Badge>
                    </div>
                  </div>

                  {(selectedTarget.data as WorkstationData).employeeName && (
                    <div className="p-3 bg-muted rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">当前使用人</span>
                      </div>
                      <div className="pl-6 space-y-1 text-sm">
                        <p><span className="text-muted-foreground">姓名：</span>{(selectedTarget.data as WorkstationData).employeeName}</p>
                        {(selectedTarget.data as WorkstationData).department && (
                          <p><span className="text-muted-foreground">部门：</span>{(selectedTarget.data as WorkstationData).department}</p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {selectedTarget.type === 'meeting' && (
                <div className="space-y-3">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-900">会议室预订</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      该会议室可供多人使用，适合团队会议和培训。
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UsersIcon className="h-4 w-4" />
                    <span>点击下方按钮即可预订此会议室</span>
                  </div>
                </div>
              )}

              {selectedTarget.type === 'private' && (
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">独立办公室</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      该办公室为独立空间，适合需要安静工作环境的人员。
                    </p>
                  </div>
                  {(selectedTarget.data as Room).workstations && (selectedTarget.data as Room).workstations![0].status === 'occupied' && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">
                        <span className="text-muted-foreground">当前使用人：</span>
                        <span className="font-medium">{(selectedTarget.data as Room).workstations![0].employeeName}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedTarget(null)}>
              关闭
            </Button>
            {selectedTarget && (
              (selectedTarget.type === 'workstation' && (selectedTarget.data as WorkstationData).status === 'available') ||
              selectedTarget.type === 'meeting' ||
              (selectedTarget.type === 'private' && (selectedTarget.data as Room).workstations?.[0]?.status === 'available')
            ) && (
              <Button onClick={handleBook}>
                <Calendar className="h-4 w-4 mr-2" />
                立即预订
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

