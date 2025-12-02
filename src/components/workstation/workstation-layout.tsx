'use client';

import { useState } from 'react';
import { Office, Workstation, Employee } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Building2 } from 'lucide-react';

interface WorkstationLayoutProps {
  office: Office;
  workstations: Workstation[];
  employees: Employee[];
  onBook?: (workstation: Workstation) => void;
}

export function WorkstationLayout({ office, workstations, employees, onBook }: WorkstationLayoutProps) {
  const [selectedWorkstation, setSelectedWorkstation] = useState<Workstation | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // 找到工位对应的员工
  const getEmployeeByWorkstation = (workstationId: string) => {
    return employees.find(emp => emp.workstationId === workstationId);
  };

  const handleWorkstationClick = (ws: Workstation) => {
    setSelectedWorkstation(ws);
  };

  const handleBookWorkstation = () => {
    if (selectedWorkstation && onBook) {
      onBook(selectedWorkstation);
    }
    setSelectedWorkstation(null);
  };

  // 渲染开放区域办公区（按行列展示）
  const renderOpenOffice = () => {
    if (!office.layout) return null;
    
    const { rows, columns } = office.layout;
    const cellWidth = 70;
    const cellHeight = 60;
    const gapX = 12;
    const gapY = 12;
    const padding = 30;

    // 每4列添加一个走廊
    const aisleWidth = 40;
    const calculateX = (col: number) => {
      const aisleCount = Math.floor((col - 1) / 4);
      return padding + (col - 1) * (cellWidth + gapX) + aisleCount * aisleWidth;
    };

    const calculateY = (row: number) => {
      return padding + (row - 1) * (cellHeight + gapY);
    };

    const totalWidth = calculateX(columns) + cellWidth + padding;
    const totalHeight = calculateY(rows) + cellHeight + padding;

    const officeWorkstations = workstations.filter(ws => ws.officeId === office.id);

    return (
      <svg width={totalWidth} height={totalHeight} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg border border-slate-200">
        <defs>
          {/* 定义渐变和阴影 */}
          <linearGradient id="availableGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="occupiedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#475569" stopOpacity="0.9" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 标题 */}
        <text x={totalWidth / 2} y={20} textAnchor="middle" className="fill-slate-700 font-semibold text-sm">
          {office.name} - {office.floor}楼
        </text>

        {/* 绘制走廊标记 */}
        {[...Array(Math.floor((columns - 1) / 4) + 1)].map((_, i) => {
          const x = padding + i * 4 * (cellWidth + gapX) + i * aisleWidth + cellWidth * 2 - 10;
          return (
            <g key={`aisle-${i}`}>
              <rect
                x={x + cellWidth + gapX}
                y={padding}
                width={aisleWidth}
                height={totalHeight - padding * 2}
                fill="#e2e8f0"
                opacity="0.5"
                rx="4"
              />
              <text
                x={x + cellWidth + gapX + aisleWidth / 2}
                y={padding - 10}
                textAnchor="middle"
                className="fill-slate-400 text-xs"
              >
                过道
              </text>
            </g>
          );
        })}

        {/* 绘制工位 */}
        {officeWorkstations.map((ws) => {
          if (!ws.position) return null;
          
          const x = calculateX(ws.position.column);
          const y = calculateY(ws.position.row);
          const isHovered = hoveredId === ws.id;
          const isAvailable = ws.status === 'available';
          const employee = getEmployeeByWorkstation(ws.id);

          return (
            <g
              key={ws.id}
              transform={`translate(${x}, ${y})`}
              className="cursor-pointer transition-transform"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
              onMouseEnter={() => setHoveredId(ws.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleWorkstationClick(ws)}
              filter={isHovered ? "url(#shadow)" : undefined}
            >
              {/* 工位背景 */}
              <rect
                width={cellWidth}
                height={cellHeight}
                rx="6"
                fill={isAvailable ? "url(#availableGradient)" : "url(#occupiedGradient)"}
                stroke={isHovered ? "#3b82f6" : "#cbd5e1"}
                strokeWidth={isHovered ? "3" : "1.5"}
                opacity={isHovered ? 1 : 0.95}
              />

              {/* 工位编号 */}
              <text
                x={cellWidth / 2}
                y={20}
                textAnchor="middle"
                className="fill-white font-semibold text-xs"
              >
                {ws.code}
              </text>

              {/* 状态指示器 */}
              <circle
                cx={cellWidth - 10}
                cy={10}
                r="4"
                fill={isAvailable ? "#fbbf24" : "#ef4444"}
                stroke="white"
                strokeWidth="1"
              />

              {/* 员工信息或状态 */}
              {employee ? (
                <>
                  <text
                    x={cellWidth / 2}
                    y={38}
                    textAnchor="middle"
                    className="fill-white text-xs"
                  >
                    {employee.name}
                  </text>
                  <text
                    x={cellWidth / 2}
                    y={50}
                    textAnchor="middle"
                    className="fill-white text-[10px] opacity-80"
                  >
                    {employee.department}
                  </text>
                </>
              ) : (
                <text
                  x={cellWidth / 2}
                  y={40}
                  textAnchor="middle"
                  className="fill-white text-xs"
                >
                  空闲
                </text>
              )}
            </g>
          );
        })}

        {/* 方向指示 */}
        <g transform={`translate(${totalWidth - 80}, ${totalHeight - 30})`}>
          <rect width="70" height="20" rx="4" fill="#3b82f6" opacity="0.1" />
          <text x="35" y="14" textAnchor="middle" className="fill-slate-600 text-xs font-medium">
            北 ↑
          </text>
        </g>
      </svg>
    );
  };

  // 渲染独立办公室
  const renderPrivateOffice = () => {
    const width = 200;
    const height = 150;
    const officeWorkstations = workstations.filter(ws => ws.officeId === office.id);
    const ws = officeWorkstations[0];
    const employee = ws ? getEmployeeByWorkstation(ws.id) : null;

    return (
      <svg width={width} height={height} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg border border-blue-200">
        <defs>
          <linearGradient id="privateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* 房间轮廓 */}
        <rect
          x="10"
          y="30"
          width={width - 20}
          height={height - 40}
          rx="8"
          fill="url(#privateGradient)"
          stroke="#3b82f6"
          strokeWidth="2"
          className="cursor-pointer"
          onClick={() => ws && handleWorkstationClick(ws)}
        />

        {/* 标题 */}
        <text x={width / 2} y={20} textAnchor="middle" className="fill-blue-700 font-semibold text-sm">
          {office.name}
        </text>

        {/* 办公桌 */}
        <rect x="50" y="60" width="100" height="50" rx="4" fill="#1e40af" opacity="0.3" />

        {/* 信息 */}
        {employee ? (
          <>
            <text x={width / 2} y={95} textAnchor="middle" className="fill-blue-700 font-medium text-sm">
              {employee.name}
            </text>
            <text x={width / 2} y={110} textAnchor="middle" className="fill-blue-600 text-xs">
              {employee.department}
            </text>
          </>
        ) : (
          <text x={width / 2} y={95} textAnchor="middle" className="fill-blue-700 text-sm">
            空闲
          </text>
        )}

        {/* 状态 */}
        <circle
          cx={width - 20}
          cy={40}
          r="6"
          fill={ws?.status === 'available' ? "#10b981" : "#ef4444"}
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    );
  };

  // 渲染特殊办公室（会议室等）
  const renderSpecialOffice = () => {
    const width = 280;
    const height = 180;
    const officeWorkstations = workstations.filter(ws => ws.officeId === office.id);

    return (
      <svg width={width} height={height} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg border border-purple-200">
        <defs>
          <linearGradient id="specialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* 房间轮廓 */}
        <rect
          x="10"
          y="30"
          width={width - 20}
          height={height - 40}
          rx="8"
          fill="url(#specialGradient)"
          stroke="#a855f7"
          strokeWidth="2"
        />

        {/* 标题 */}
        <text x={width / 2} y={20} textAnchor="middle" className="fill-purple-700 font-semibold text-sm">
          {office.name} ({office.totalWorkstations}人)
        </text>

        {/* 会议桌 */}
        <ellipse cx={width / 2} cy="95" rx="80" ry="40" fill="#7c3aed" opacity="0.3" />

        {/* 座位 */}
        {[...Array(Math.min(8, office.totalWorkstations))].map((_, i) => {
          const angle = (i * 360) / 8;
          const x = width / 2 + Math.cos((angle * Math.PI) / 180) * 60;
          const y = 95 + Math.sin((angle * Math.PI) / 180) * 30;
          
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="8"
              fill="#a855f7"
              opacity="0.6"
              stroke="white"
              strokeWidth="1"
            />
          );
        })}

        {/* 状态信息 */}
        <text x={width / 2} y={height - 20} textAnchor="middle" className="fill-purple-700 text-xs">
          容纳 {office.totalWorkstations} 人
        </text>

        {/* 状态指示 */}
        <circle
          cx={width - 20}
          cy={40}
          r="6"
          fill={office.occupiedWorkstations === 0 ? "#10b981" : "#f59e0b"}
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    );
  };

  return (
    <>
      <div className="flex items-center justify-center p-4">
        {office.type === 'open' && renderOpenOffice()}
        {office.type === 'private' && renderPrivateOffice()}
        {office.type === 'special' && renderSpecialOffice()}
      </div>

      {/* 工位详情弹窗 */}
      <Dialog open={!!selectedWorkstation} onOpenChange={() => setSelectedWorkstation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              工位详情
            </DialogTitle>
            <DialogDescription>
              查看和管理工位信息
            </DialogDescription>
          </DialogHeader>

          {selectedWorkstation && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">工位编号</p>
                  <p className="font-medium">{selectedWorkstation.code}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">状态</p>
                  <Badge variant={selectedWorkstation.status === 'available' ? 'default' : 'secondary'}>
                    {selectedWorkstation.status === 'available' ? '空闲' : '已占用'}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">办公区</p>
                  <p className="font-medium">{selectedWorkstation.officeName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">楼层</p>
                  <p className="font-medium">{selectedWorkstation.floor}楼</p>
                </div>
              </div>

              {selectedWorkstation.position && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">位置</p>
                  <p className="font-medium">
                    第{selectedWorkstation.position.row}排 第{selectedWorkstation.position.column}列
                  </p>
                </div>
              )}

              {(() => {
                const employee = getEmployeeByWorkstation(selectedWorkstation.id);
                return employee ? (
                  <div className="p-3 bg-muted rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">当前使用人</span>
                    </div>
                    <div className="pl-6 space-y-1 text-sm">
                      <p><span className="text-muted-foreground">姓名：</span>{employee.name}</p>
                      <p><span className="text-muted-foreground">部门：</span>{employee.department}</p>
                      <p><span className="text-muted-foreground">工号：</span>{employee.employeeNo}</p>
                      <p>
                        <span className="text-muted-foreground">类型：</span>
                        <Badge variant="outline" className="ml-1">
                          {employee.type === 'internal' ? '本部人员' : '外派人员'}
                        </Badge>
                      </p>
                    </div>
                  </div>
                ) : null;
              })()}

              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                <Building2 className="h-4 w-4" />
                <span>{selectedWorkstation.propertyName}</span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedWorkstation(null)}>
              关闭
            </Button>
            {selectedWorkstation?.status === 'available' && (
              <Button onClick={handleBookWorkstation}>
                预订工位
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

