// 房产信息
export interface Property {
  id: string;
  code: string; // 房产编号
  name: string; // 房产名称
  type: string; // 房产类型
  region: string; // 地区
  address: string; // 地址
  area: number; // 面积（平方米）
  floors: number; // 楼层数
  certificateNo?: string; // 房产证号
  company?: string; // 公司名称
}

// 办公区信息
export interface Office {
  id: string;
  name: string; // 办公区名称
  floor: number; // 所在楼层
  propertyId: string; // 所在房产ID
  propertyName: string; // 所在房产名称
  totalWorkstations: number; // 总工位数
  occupiedWorkstations: number; // 已占用工位数
  type: 'open' | 'private' | 'special'; // 办公区类型：开放区域、独立办公室、特殊办公室
  layout?: {
    rows: number; // 排数
    columns: number; // 列数
  };
}

// 工位信息
export interface Workstation {
  id: string;
  code: string; // 工位编号
  officeId: string; // 所属办公区ID
  officeName: string; // 所属办公区名称
  floor: number; // 所在楼层
  propertyId: string; // 所属房产ID
  propertyName: string; // 所属房产名称
  position?: {
    row: number; // 行位置
    column: number; // 列位置
  };
  status: 'available' | 'occupied' | 'reserved'; // 工位状态
  assignedTo?: string; // 分配给的员工ID
}

// 员工信息
export interface Employee {
  id: string;
  name: string; // 姓名
  department: string; // 部门
  company: string; // 公司
  employeeNo: string; // 工号
  type: 'internal' | 'external'; // 本部人员 | 外派人员
  workstationId?: string; // 分配的工位ID
}

// 工位分配记录
export interface Assignment {
  id: string;
  workstationId: string;
  employeeId: string;
  employeeName: string;
  assignedBy: string; // 分配人
  assignedAt: string; // 分配时间
  status: 'active' | 'inactive';
}

// 报表数据
export interface Report {
  id: string;
  sequence: number; // 序号
  companyName: string; // 公司名称
  branchName?: string; // 分公司名称
  certificateNo: string; // 房产证
  propertyName: string; // 房产名称
  buildingArea: number; // 建筑面积（平方米）
  address: string; // 房产地址
}

