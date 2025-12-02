// 楼层布局数据配置

export interface Room {
  id: string;
  name: string;
  type: 'office' | 'meeting' | 'reception' | 'corridor' | 'door' | 'private';
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  workstations?: WorkstationData[];
}

export interface WorkstationData {
  id: string;
  code: string;
  employeeName?: string;
  department?: string;
  x: number;
  y: number;
  status: 'occupied' | 'available';
}

// 3楼布局配置
export const floor3Layout: Room[] = [
  // 开放办公区
  {
    id: 'room-3-open',
    name: '3楼开放办公区',
    type: 'office',
    x: 80,
    y: 100,
    width: 450,
    height: 280,
    color: '#fef3c7',
    workstations: [
      { id: 'ws-3-1', code: '3-A01', employeeName: '张伟', department: '技术部', x: 30, y: 40, status: 'occupied' },
      { id: 'ws-3-2', code: '3-A02', employeeName: '李娜', department: '技术部', x: 100, y: 40, status: 'occupied' },
      { id: 'ws-3-3', code: '3-A03', employeeName: '王强', department: '技术部', x: 170, y: 40, status: 'occupied' },
      { id: 'ws-3-4', code: '3-A04', employeeName: '刘芳', department: '技术部', x: 240, y: 40, status: 'occupied' },
      { id: 'ws-3-5', code: '3-A05', employeeName: '', x: 310, y: 40, status: 'available' },
      { id: 'ws-3-6', code: '3-A06', employeeName: '', x: 380, y: 40, status: 'available' },
      
      { id: 'ws-3-7', code: '3-B01', employeeName: '赵敏', department: '产品部', x: 30, y: 100, status: 'occupied' },
      { id: 'ws-3-8', code: '3-B02', employeeName: '孙杰', department: '产品部', x: 100, y: 100, status: 'occupied' },
      { id: 'ws-3-9', code: '3-B03', employeeName: '周琳', department: '产品部', x: 170, y: 100, status: 'occupied' },
      { id: 'ws-3-10', code: '3-B04', employeeName: '吴昊', department: '产品部', x: 240, y: 100, status: 'occupied' },
      { id: 'ws-3-11', code: '3-B05', employeeName: '', x: 310, y: 100, status: 'available' },
      { id: 'ws-3-12', code: '3-B06', employeeName: '', x: 380, y: 100, status: 'available' },
      
      { id: 'ws-3-13', code: '3-C01', employeeName: '郑磊', department: '市场部', x: 30, y: 160, status: 'occupied' },
      { id: 'ws-3-14', code: '3-C02', employeeName: '冯静', department: '市场部', x: 100, y: 160, status: 'occupied' },
      { id: 'ws-3-15', code: '3-C03', employeeName: '陈辉', department: '市场部', x: 170, y: 160, status: 'occupied' },
      { id: 'ws-3-16', code: '3-C04', employeeName: '黄丽', department: '市场部', x: 240, y: 160, status: 'occupied' },
      { id: 'ws-3-17', code: '3-C05', employeeName: '林峰', department: '市场部', x: 310, y: 160, status: 'occupied' },
      { id: 'ws-3-18', code: '3-C06', employeeName: '袁莹', department: '市场部', x: 380, y: 160, status: 'occupied' },
      
      { id: 'ws-3-19', code: '3-D01', employeeName: '何涛', department: '运营部', x: 30, y: 220, status: 'occupied' },
      { id: 'ws-3-20', code: '3-D02', employeeName: '徐佳', department: '运营部', x: 100, y: 220, status: 'occupied' },
    ],
  },
  // 301独立办公室
  {
    id: 'room-301',
    name: '301部门经理室',
    type: 'private',
    x: 550,
    y: 100,
    width: 180,
    height: 130,
    color: '#dbeafe',
    workstations: [
      { id: 'ws-301', code: '301', employeeName: '张部长', department: '技术部', x: 60, y: 60, status: 'occupied' },
    ],
  },
  // 302独立办公室
  {
    id: 'room-302',
    name: '302财务室',
    type: 'private',
    x: 550,
    y: 250,
    width: 180,
    height: 130,
    color: '#dbeafe',
    workstations: [
      { id: 'ws-302', code: '302', employeeName: '', x: 60, y: 60, status: 'available' },
    ],
  },
  // 大会议室
  {
    id: 'room-3-meeting',
    name: '3楼大会议室(20人)',
    type: 'meeting',
    x: 750,
    y: 100,
    width: 280,
    height: 280,
    color: '#e9d5ff',
  },
  // 走廊
  {
    id: 'corridor-3',
    name: '走廊',
    type: 'corridor',
    x: 530,
    y: 100,
    width: 20,
    height: 280,
    color: '#f1f5f9',
  },
  // 底部门标识
  {
    id: 'door-3-1',
    name: '309',
    type: 'door',
    x: 80,
    y: 410,
    width: 120,
    height: 90,
    color: '#fef3c7',
  },
  {
    id: 'door-3-2',
    name: '308',
    type: 'door',
    x: 220,
    y: 410,
    width: 120,
    height: 90,
    color: '#fef3c7',
  },
  {
    id: 'door-3-3',
    name: '307',
    type: 'door',
    x: 360,
    y: 410,
    width: 120,
    height: 90,
    color: '#fef3c7',
  },
];

// 5楼布局配置
export const floor5Layout: Room[] = [
  // 开放办公区
  {
    id: 'room-5-open',
    name: '5楼开放办公区',
    type: 'office',
    x: 80,
    y: 100,
    width: 500,
    height: 280,
    color: '#fef3c7',
    workstations: [
      { id: 'ws-5-1', code: '5-A01', employeeName: '马超', department: '销售部', x: 30, y: 40, status: 'occupied' },
      { id: 'ws-5-2', code: '5-A02', employeeName: '许晴', department: '销售部', x: 110, y: 40, status: 'occupied' },
      { id: 'ws-5-3', code: '5-A03', employeeName: '唐明', department: '销售部', x: 190, y: 40, status: 'occupied' },
      { id: 'ws-5-4', code: '5-A04', employeeName: '宋洁', department: '销售部', x: 270, y: 40, status: 'occupied' },
      { id: 'ws-5-5', code: '5-A05', employeeName: '韩冰', department: '销售部', x: 350, y: 40, status: 'occupied' },
      { id: 'ws-5-6', code: '5-A06', employeeName: '', x: 430, y: 40, status: 'available' },
      
      { id: 'ws-5-7', code: '5-B01', employeeName: '曹阳', department: '客服部', x: 30, y: 100, status: 'occupied' },
      { id: 'ws-5-8', code: '5-B02', employeeName: '邓丽', department: '客服部', x: 110, y: 100, status: 'occupied' },
      { id: 'ws-5-9', code: '5-B03', employeeName: '潘涛', department: '客服部', x: 190, y: 100, status: 'occupied' },
      { id: 'ws-5-10', code: '5-B04', employeeName: '叶萍', department: '客服部', x: 270, y: 100, status: 'occupied' },
      { id: 'ws-5-11', code: '5-B05', employeeName: '', x: 350, y: 100, status: 'available' },
      { id: 'ws-5-12', code: '5-B06', employeeName: '', x: 430, y: 100, status: 'available' },
      
      { id: 'ws-5-13', code: '5-C01', employeeName: '梁伟', department: '行政部', x: 30, y: 160, status: 'occupied' },
      { id: 'ws-5-14', code: '5-C02', employeeName: '谢娟', department: '行政部', x: 110, y: 160, status: 'occupied' },
      { id: 'ws-5-15', code: '5-C03', employeeName: '汪峰', department: '行政部', x: 190, y: 160, status: 'occupied' },
      { id: 'ws-5-16', code: '5-C04', employeeName: '沈丽', department: '行政部', x: 270, y: 160, status: 'occupied' },
      { id: 'ws-5-17', code: '5-C05', employeeName: '', x: 350, y: 160, status: 'available' },
      { id: 'ws-5-18', code: '5-C06', employeeName: '', x: 430, y: 160, status: 'available' },
      
      { id: 'ws-5-19', code: '5-D01', employeeName: '蒋辉', department: '人事部', x: 30, y: 220, status: 'occupied' },
      { id: 'ws-5-20', code: '5-D02', employeeName: '董芳', department: '人事部', x: 110, y: 220, status: 'occupied' },
      { id: 'ws-5-21', code: '5-D03', employeeName: '范磊', department: '人事部', x: 190, y: 220, status: 'occupied' },
      { id: 'ws-5-22', code: '5-D04', employeeName: '胡静', department: '人事部', x: 270, y: 220, status: 'occupied' },
      { id: 'ws-5-23', code: '5-D05', employeeName: '罗涛', department: '人事部', x: 350, y: 220, status: 'occupied' },
      { id: 'ws-5-24', code: '5-D06', employeeName: '钟琳', department: '人事部', x: 430, y: 220, status: 'occupied' },
    ],
  },
  // 501总经理室
  {
    id: 'room-501',
    name: '501总经理室',
    type: 'private',
    x: 600,
    y: 100,
    width: 200,
    height: 130,
    color: '#dbeafe',
    workstations: [
      { id: 'ws-501', code: '501', employeeName: '李总', department: '总经理', x: 80, y: 60, status: 'occupied' },
    ],
  },
  // 502副总经理室
  {
    id: 'room-502',
    name: '502副总经理室',
    type: 'private',
    x: 600,
    y: 250,
    width: 200,
    height: 130,
    color: '#dbeafe',
    workstations: [
      { id: 'ws-502', code: '502', employeeName: '王副总', department: '副总经理', x: 80, y: 60, status: 'occupied' },
    ],
  },
  // 会议室A
  {
    id: 'room-5-meeting-a',
    name: '5楼会议室A(12人)',
    type: 'meeting',
    x: 820,
    y: 100,
    width: 220,
    height: 130,
    color: '#e9d5ff',
  },
  // 会议室B
  {
    id: 'room-5-meeting-b',
    name: '5楼会议室B(8人)',
    type: 'meeting',
    x: 820,
    y: 250,
    width: 220,
    height: 130,
    color: '#e9d5ff',
  },
  // 走廊
  {
    id: 'corridor-5',
    name: '走廊',
    type: 'corridor',
    x: 580,
    y: 100,
    width: 20,
    height: 280,
    color: '#f1f5f9',
  },
];

// 12楼布局配置（保留原有）
export const floor12Layout: Room[] = [
  // 1210办公室
  {
    id: 'room-1210',
    name: '1210办公室',
    type: 'office',
    x: 80,
    y: 100,
    width: 280,
    height: 250,
    color: '#fef3c7',
    workstations: [
      { id: 'ws-12-1-1', code: '第一列-1', employeeName: '杨林英', x: 20, y: 40, status: 'occupied' },
      { id: 'ws-12-1-2', code: '第一列-2', employeeName: '郑宏伟', x: 20, y: 90, status: 'occupied' },
      { id: 'ws-12-2-1', code: '第二列-1', employeeName: '余明董', x: 90, y: 40, status: 'occupied' },
      { id: 'ws-12-2-2', code: '第二列-2', employeeName: '', x: 90, y: 90, status: 'available' },
      { id: 'ws-12-2-3', code: '第二列-3', employeeName: '郭彦民', x: 90, y: 140, status: 'occupied' },
      { id: 'ws-12-2-4', code: '第二列-4', employeeName: '张媛媛', x: 90, y: 190, status: 'occupied' },
      { id: 'ws-12-3-1', code: '第三列-1', employeeName: '', x: 160, y: 90, status: 'available' },
      { id: 'ws-12-3-2', code: '第三列-2', employeeName: '冯元', x: 160, y: 140, status: 'occupied' },
      { id: 'ws-12-4-1', code: '第四列-1', employeeName: '柜子隔断', x: 230, y: 40, status: 'occupied' },
      { id: 'ws-12-4-2', code: '第四列-2', employeeName: '孙言波', x: 230, y: 90, status: 'occupied' },
      { id: 'ws-12-4-3', code: '第四列-3', employeeName: '黄桂芬', x: 230, y: 140, status: 'occupied' },
      { id: 'ws-12-4-4', code: '第四列-4', employeeName: '乔小兰', x: 230, y: 190, status: 'occupied' },
    ],
  },
  // 1211接待室党群部
  {
    id: 'room-1211',
    name: '1211接待室党群部',
    type: 'reception',
    x: 380,
    y: 100,
    width: 180,
    height: 250,
    color: '#fef3c7',
  },
  // 1212办公室
  {
    id: 'room-1212',
    name: '1212办公室',
    type: 'office',
    x: 580,
    y: 100,
    width: 180,
    height: 250,
    color: '#dbeafe',
    workstations: [
      { id: 'ws-12-5-1', code: '第一列', employeeName: '', x: 30, y: 60, status: 'available' },
      { id: 'ws-12-5-2', code: '第二列', employeeName: '朱琳', x: 110, y: 60, status: 'occupied' },
      { id: 'ws-12-6-1', code: '第一列-2', employeeName: '许兆阳', x: 30, y: 150, status: 'occupied' },
      { id: 'ws-12-6-2', code: '第二列-2', employeeName: '胡西溪', x: 110, y: 150, status: 'occupied' },
    ],
  },
  // 1213会议室
  {
    id: 'room-1213',
    name: '1213会议室',
    type: 'meeting',
    x: 780,
    y: 100,
    width: 260,
    height: 250,
    color: '#fef3c7',
  },
  // 1216会议室（右上角）
  {
    id: 'room-1216',
    name: '1216会议室',
    type: 'meeting',
    x: 1060,
    y: 40,
    width: 120,
    height: 80,
    color: '#fef3c7',
  },
  // 1215部门（右上角）
  {
    id: 'room-1215',
    name: '1215部门',
    type: 'office',
    x: 1060,
    y: 140,
    width: 120,
    height: 80,
    color: '#fef3c7',
  },
  // 廖树锋、陈玉姻区域（右侧绿色）
  {
    id: 'room-green',
    name: '办公区',
    type: 'office',
    x: 1060,
    y: 240,
    width: 120,
    height: 110,
    color: '#d1f4e0',
    workstations: [
      { id: 'ws-12-7-1', code: '廖树锋', employeeName: '廖树锋', x: 20, y: 30, status: 'occupied' },
      { id: 'ws-12-7-2', code: '陈玉姻', employeeName: '陈玉姻', x: 20, y: 70, status: 'occupied' },
    ],
  },
  // 走廊
  {
    id: 'corridor-1',
    name: '过道',
    type: 'corridor',
    x: 360,
    y: 100,
    width: 20,
    height: 250,
    color: '#f1f5f9',
  },
  // 底部房间区域
  {
    id: 'room-1209',
    name: '1209',
    type: 'door',
    x: 80,
    y: 400,
    width: 100,
    height: 100,
    color: '#fef3c7',
  },
  {
    id: 'room-1208',
    name: '1208',
    type: 'door',
    x: 220,
    y: 400,
    width: 100,
    height: 100,
    color: '#fef3c7',
  },
  {
    id: 'room-1207',
    name: '1207',
    type: 'door',
    x: 360,
    y: 400,
    width: 100,
    height: 100,
    color: '#fef3c7',
  },
  {
    id: 'room-1206',
    name: '1206',
    type: 'door',
    x: 500,
    y: 400,
    width: 100,
    height: 100,
    color: '#fef3c7',
  },
  {
    id: 'room-1205',
    name: '1205',
    type: 'door',
    x: 640,
    y: 400,
    width: 100,
    height: 100,
    color: '#fef3c7',
  },
  {
    id: 'room-1203',
    name: '1203',
    type: 'door',
    x: 780,
    y: 400,
    width: 100,
    height: 100,
    color: '#fef3c7',
  },
  {
    id: 'room-1202',
    name: '1202',
    type: 'door',
    x: 920,
    y: 400,
    width: 100,
    height: 100,
    color: '#fef3c7',
  },
  {
    id: 'room-1201',
    name: '1201',
    type: 'door',
    x: 1060,
    y: 400,
    width: 60,
    height: 100,
    color: '#fef3c7',
  },
  {
    id: 'room-1217',
    name: '1217',
    type: 'door',
    x: 1140,
    y: 400,
    width: 60,
    height: 100,
    color: '#fef3c7',
  },
];

// 根据楼层获取布局
export function getFloorLayout(floor: number): Room[] {
  switch (floor) {
    case 3:
      return floor3Layout;
    case 5:
      return floor5Layout;
    case 12:
      return floor12Layout;
    default:
      return [];
  }
}

// 获取SVG尺寸
export function getFloorSVGSize(floor: number): { width: number; height: number } {
  switch (floor) {
    case 3:
      return { width: 1080, height: 540 };
    case 5:
      return { width: 1080, height: 540 };
    case 12:
      return { width: 1220, height: 540 };
    default:
      return { width: 1080, height: 540 };
  }
}

