import { Property, Office, Workstation, Employee, Assignment, Report } from '@/types';

// 模拟房产数据
export const mockProperties: Property[] = [
  {
    id: '1',
    code: 'FC001',
    name: '省公司综合生产楼',
    type: '办公楼',
    region: '广东省广州市',
    address: '广州市天河区天河路123号',
    area: 8500,
    floors: 10,
    certificateNo: 'YUE2023001234',
    company: '广东省公司',
  },
  {
    id: '2',
    code: 'FC002',
    name: '技术研发中心',
    type: '研发楼',
    region: '广东省深圳市',
    address: '深圳市南山区科技园南路56号',
    area: 6200,
    floors: 8,
    certificateNo: 'YUE2023005678',
    company: '广东省公司',
  },
  {
    id: '3',
    code: 'FC003',
    name: '客户服务中心',
    type: '服务中心',
    region: '广东省广州市',
    address: '广州市越秀区中山五路89号',
    area: 4500,
    floors: 6,
    certificateNo: 'YUE2023009012',
    company: '广东省公司',
  },
];

// 模拟办公区数据
export const mockOffices: Office[] = [
  // 3楼办公区
  {
    id: '1',
    name: '3楼开放办公区',
    floor: 3,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 20,
    occupiedWorkstations: 16,
    type: 'open',
  },
  {
    id: '3',
    name: '301独立办公室',
    floor: 3,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 1,
    occupiedWorkstations: 1,
    type: 'private',
  },
  {
    id: '4',
    name: '302独立办公室',
    floor: 3,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 1,
    occupiedWorkstations: 0,
    type: 'private',
  },
  {
    id: '5',
    name: '3楼大会议室',
    floor: 3,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 20,
    occupiedWorkstations: 0,
    type: 'special',
  },
  // 5楼办公区
  {
    id: '6',
    name: '5楼开放办公区',
    floor: 5,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 24,
    occupiedWorkstations: 18,
    type: 'open',
  },
  {
    id: '7',
    name: '501总经理室',
    floor: 5,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 1,
    occupiedWorkstations: 1,
    type: 'private',
  },
  {
    id: '8',
    name: '502副总经理室',
    floor: 5,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 1,
    occupiedWorkstations: 1,
    type: 'private',
  },
  {
    id: '9',
    name: '5楼会议室A',
    floor: 5,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 12,
    occupiedWorkstations: 0,
    type: 'special',
  },
  {
    id: '10',
    name: '5楼会议室B',
    floor: 5,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 8,
    occupiedWorkstations: 0,
    type: 'special',
  },
  // 12楼办公区（保留）
  {
    id: '11',
    name: '1210办公室',
    floor: 12,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 12,
    occupiedWorkstations: 10,
    type: 'open',
  },
  {
    id: '12',
    name: '1211接待室党群部',
    floor: 12,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 0,
    occupiedWorkstations: 0,
    type: 'special',
  },
  {
    id: '13',
    name: '1212办公室',
    floor: 12,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 4,
    occupiedWorkstations: 3,
    type: 'open',
  },
  {
    id: '14',
    name: '1213会议室',
    floor: 12,
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    totalWorkstations: 0,
    occupiedWorkstations: 0,
    type: 'special',
  },
];

// 生成工位数据
// 生成工位数据的辅助函数
function generateWorkstations(): Workstation[] {
  const workstations: Workstation[] = [];
  let wsCounter = 1;

  // 3楼开放办公区 - 20个工位
  for (let i = 1; i <= 20; i++) {
    workstations.push({
      id: `ws-3-open-${i}`,
      code: `WS-3-${String(i).padStart(3, '0')}`,
      officeId: '1',
      officeName: '3楼开放办公区',
      propertyId: '1',
      propertyName: '省公司综合生产楼',
      floor: 3,
      status: i <= 16 ? 'occupied' : 'available',
      position: { row: Math.floor((i - 1) / 5) + 1, column: ((i - 1) % 5) + 1 },
      assignedTo: i <= 16 ? `emp-${i}` : undefined,
    });
  }

  // 3楼独立办公室
  workstations.push({
    id: 'ws-3-301',
    code: 'WS-3-301',
    officeId: '3',
    officeName: '301独立办公室',
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    floor: 3,
    status: 'occupied',
    assignedTo: 'emp-17',
  });

  workstations.push({
    id: 'ws-3-302',
    code: 'WS-3-302',
    officeId: '4',
    officeName: '302独立办公室',
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    floor: 3,
    status: 'available',
  });

  // 5楼开放办公区 - 24个工位
  for (let i = 1; i <= 24; i++) {
    workstations.push({
      id: `ws-5-open-${i}`,
      code: `WS-5-${String(i).padStart(3, '0')}`,
      officeId: '6',
      officeName: '5楼开放办公区',
      propertyId: '1',
      propertyName: '省公司综合生产楼',
      floor: 5,
      status: i <= 18 ? 'occupied' : 'available',
      position: { row: Math.floor((i - 1) / 6) + 1, column: ((i - 1) % 6) + 1 },
      assignedTo: i <= 18 ? `emp-${20 + i}` : undefined,
    });
  }

  // 5楼独立办公室
  workstations.push({
    id: 'ws-5-501',
    code: 'WS-5-501',
    officeId: '7',
    officeName: '501总经理室',
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    floor: 5,
    status: 'occupied',
    assignedTo: 'emp-45',
  });

  workstations.push({
    id: 'ws-5-502',
    code: 'WS-5-502',
    officeId: '8',
    officeName: '502副总经理室',
    propertyId: '1',
    propertyName: '省公司综合生产楼',
    floor: 5,
    status: 'occupied',
    assignedTo: 'emp-46',
  });

  // 12楼工位（保持原有数据）
  for (let i = 1; i <= 30; i++) {
    workstations.push({
      id: `ws-12-${i}`,
      code: `WS-12-${String(i).padStart(3, '0')}`,
      officeId: '9',
      officeName: '12楼综合办公区',
      propertyId: '1',
      propertyName: '省公司综合生产楼',
      floor: 12,
      status: i <= 20 ? 'occupied' : 'available',
      position: { row: Math.floor((i - 1) / 6) + 1, column: ((i - 1) % 6) + 1 },
      assignedTo: i <= 20 ? `emp-${50 + i}` : undefined,
    });
  }

  // 技术研发中心 - 2楼
  for (let i = 1; i <= 30; i++) {
    workstations.push({
      id: `ws-tech-2-${i}`,
      code: `WS-T2-${String(i).padStart(3, '0')}`,
      officeId: '11',
      officeName: '技术研发区',
      propertyId: '2',
      propertyName: '技术研发中心',
      floor: 2,
      status: i <= 22 ? 'occupied' : 'available',
      position: { row: Math.floor((i - 1) / 6) + 1, column: ((i - 1) % 6) + 1 },
      assignedTo: i <= 22 ? `emp-tech-${i}` : undefined,
    });
  }

  // 客户服务中心 - 1楼
  for (let i = 1; i <= 25; i++) {
    workstations.push({
      id: `ws-service-1-${i}`,
      code: `WS-S1-${String(i).padStart(3, '0')}`,
      officeId: '12',
      officeName: '客服大厅',
      propertyId: '3',
      propertyName: '客户服务中心',
      floor: 1,
      status: i <= 20 ? 'occupied' : 'available',
      position: { row: Math.floor((i - 1) / 5) + 1, column: ((i - 1) % 5) + 1 },
      assignedTo: i <= 20 ? `emp-service-${i}` : undefined,
    });
  }

  return workstations;
}

export const mockWorkstations: Workstation[] = generateWorkstations();

// 模拟员工数据 - 扩展更多员工
export const mockEmployees: Employee[] = [
  { id: 'emp-1', name: '杨林英', department: '技术部', company: '广东省公司', employeeNo: 'E001', type: 'internal', workstationId: 'ws-1-1-1' },
  { id: 'emp-2', name: '郑宏伟', department: '技术部', company: '广东省公司', employeeNo: 'E002', type: 'internal', workstationId: 'ws-1-1-2' },
  { id: 'emp-3', name: '余明董', department: '技术部', company: '广东省公司', employeeNo: 'E003', type: 'internal', workstationId: 'ws-1-2-1' },
  { id: 'emp-4', name: '郭彦民', department: '技术部', company: '广东省公司', employeeNo: 'E004', type: 'internal', workstationId: 'ws-1-3-1' },
  { id: 'emp-5', name: '张媛媛', department: '产品部', company: '广东省公司', employeeNo: 'E005', type: 'internal', workstationId: 'ws-1-3-2' },
  { id: 'emp-6', name: '冯元', department: '产品部', company: '广东省公司', employeeNo: 'E006', type: 'internal', workstationId: 'ws-1-4-2' },
  { id: 'emp-7', name: '柜子隔断', department: '行政部', company: '广东省公司', employeeNo: 'E007', type: 'internal', workstationId: 'ws-1-2-3' },
  { id: 'emp-8', name: '孙言波', department: '财务部', company: '广东省公司', employeeNo: 'E008', type: 'internal', workstationId: 'ws-1-2-4' },
  { id: 'emp-9', name: '黄桂芬', department: '财务部', company: '广东省公司', employeeNo: 'E009', type: 'internal', workstationId: 'ws-1-2-5' },
  { id: 'emp-10', name: '乔小兰', department: '人力资源部', company: '广东省公司', employeeNo: 'E010', type: 'internal', workstationId: 'ws-1-3-4' },
  { id: 'emp-11', name: '朱琳', department: '市场部', company: '广东省公司', employeeNo: 'E011', type: 'internal', workstationId: 'ws-1-1-5' },
  { id: 'emp-12', name: '许兆阳', department: '市场部', company: '广东省公司', employeeNo: 'E012', type: 'internal', workstationId: 'ws-1-2-7' },
  { id: 'emp-13', name: '胡西溪', department: '运营部', company: '广东省公司', employeeNo: 'E013', type: 'internal', workstationId: 'ws-1-2-8' },
  { id: 'emp-14', name: '廖树锋', department: '技术部', company: '广东省公司', employeeNo: 'E014', type: 'internal', workstationId: 'ws-12-1-1' },
  { id: 'emp-15', name: '陈玉姻', department: '技术部', company: '广东省公司', employeeNo: 'E015', type: 'internal', workstationId: 'ws-12-1-2' },
];

// 模拟分配记录
export const mockAssignments: Assignment[] = [
  {
    id: 'asg-1',
    workstationId: 'ws-1-1-1',
    employeeId: 'emp-1',
    employeeName: '张三',
    assignedBy: '管理员A',
    assignedAt: '2024-01-15 10:30:00',
    status: 'active',
  },
  {
    id: 'asg-2',
    workstationId: 'ws-1-1-2',
    employeeId: 'emp-2',
    employeeName: '李四',
    assignedBy: '管理员A',
    assignedAt: '2024-01-15 10:35:00',
    status: 'active',
  },
];

// 模拟报表数据 - 添加更多数据
export const mockReports: Report[] = [
  {
    id: '1',
    sequence: 1,
    companyName: '广东省公司',
    branchName: '总部',
    certificateNo: 'YUE2023001234',
    propertyName: '省公司综合生产楼',
    buildingArea: 8500,
    address: '广州市天河区天河路123号',
  },
  {
    id: '2',
    sequence: 2,
    companyName: '广东省公司',
    branchName: '深圳分公司',
    certificateNo: 'YUE2023005678',
    propertyName: '技术研发中心',
    buildingArea: 6200,
    address: '深圳市南山区科技园南路56号',
  },
  {
    id: '3',
    sequence: 3,
    companyName: '广东省公司',
    branchName: '客户服务分公司',
    certificateNo: 'YUE2023009012',
    propertyName: '客户服务中心',
    buildingArea: 4500,
    address: '广州市越秀区中山五路89号',
  },
  {
    id: '4',
    sequence: 4,
    companyName: '广东省公司',
    branchName: '珠海分公司',
    certificateNo: 'YUE2023012345',
    propertyName: '珠海办事处',
    buildingArea: 3200,
    address: '珠海市香洲区吉大路88号',
  },
  {
    id: '5',
    sequence: 5,
    companyName: '广东省公司',
    branchName: '东莞分公司',
    certificateNo: 'YUE2023023456',
    propertyName: '东莞营业厅',
    buildingArea: 2800,
    address: '东莞市南城区鸿福路168号',
  },
  {
    id: '6',
    sequence: 6,
    companyName: '广东省公司',
    branchName: '佛山分公司',
    certificateNo: 'YUE2023034567',
    propertyName: '佛山客服中心',
    buildingArea: 3500,
    address: '佛山市禅城区季华五路55号',
  },
  {
    id: '7',
    sequence: 7,
    companyName: '广东省公司',
    branchName: '惠州分公司',
    certificateNo: 'YUE2023045678',
    propertyName: '惠州办公楼',
    buildingArea: 2600,
    address: '惠州市惠城区麦地路99号',
  },
  {
    id: '8',
    sequence: 8,
    companyName: '广东省公司',
    branchName: '中山分公司',
    certificateNo: 'YUE2023056789',
    propertyName: '中山营业点',
    buildingArea: 2200,
    address: '中山市东区中山三路66号',
  },
];
