import tl from "@/utils/locallize";
import { layouts } from "chart.js";
export const FUNC_NAME = 'employee'

// ========================== ROUTER =============================
export const ROUTER_EMPLOYEE = [
  {
    path: '/employee',
    name: 'EmployeeList',
    component: () => import('@master/views/employee/ListView.vue'),
  },
]

// ========================== PATH API =============================
export const API = {
  LIST: `/${FUNC_NAME}`,
  CREATE: `/${FUNC_NAME}`,
  DETAIL: (id: string) => `${FUNC_NAME}/${id}`,
  UPDATE: (id: string) => `${FUNC_NAME}/${id}`,
  DELETE: (id: string | string[]) => `${FUNC_NAME}/${id}`,
  DELETE_MULTI: `${FUNC_NAME}/delete-multi`,
  EXPORT: `${FUNC_NAME}/export-excel`
}

// ========================== CONFIG TABLE ==========================
interface Filter {
  text: string;
  value: string;
}

const EMPLOYEE_STATE = ["Đang làm việc", "Đang thử việc", "Đang thực tập", "Đã nghĩ việc"]

export const tableConfig = {
  checkbox: false,
  action: true,
  showPaging: true,
  dbClick: false,
  index: true,
};

export const colConfig: {
  key: string;
  title: string;
  is_sort?: boolean;
  linked?: boolean;
  width?: number;
  filters?: Filter[] | null;
  filterMethod?: Function | null;
  formatter?: Function | null;
}[] = [
  {
    key: "employee_code",
    title: tl(FUNC_NAME, "Mã nhân sự"),
    is_sort: true,
    linked: true,
    width: 100,
  },
  {
    key: "full_name",
    title: tl(FUNC_NAME, "Họ và tên"),
    is_sort: true,
    width: 200,
  },
  {
    key: "initial_name",
    title: tl(FUNC_NAME, "Tên viết tắt"),
    is_sort: true,
    width: 120,
  },
  {
    key: "branch",
    title: tl(FUNC_NAME, "Chi nhánh"),
    is_sort: true,
  },
  {
    key: "department",
    title: tl(FUNC_NAME, "Phòng ban"),
    is_sort: true,
    width: 150,
    formatter: (data: any) =>
      data.employeeDepartments
      .map((dept: any) => `• ${dept.department.name}`)
      .join('\n')
  },
  {
    key: "current_group",
    title: tl(FUNC_NAME, "Nhóm"),
    is_sort: true,
  },
  {
    key: "position",
    title: tl(FUNC_NAME, "Vị trí"),
    is_sort: true,
    formatter: (data: any) =>
      data.employeePositions
      .map((dept: any) => `• ${dept.position.name}`)
      .join('\n')
  },
  {
    key: "state",
    title: tl(FUNC_NAME, "Thực trạng"),
    is_sort: true,
    width: 120,
    formatter: (data: any) => 
      EMPLOYEE_STATE[data.state]
  },
  {
    key: "phone",
    title: tl(FUNC_NAME, "SĐT"),
    width: 110
  },
  {
    key: "company_email",
    title: tl(FUNC_NAME, "Email (công ty)"),
    width: 150,
  },
  {
    key: "personal_email",
    title: tl(FUNC_NAME, "Email (cá nhân)"),
    width: 150,
  },
  {
    key: "birthday",
    title: tl(FUNC_NAME, "Ngày sinh"),
    is_sort: true,
    width: 100,
    formatter: (data: any) => 
      new Date(data.birthday).toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit', year: 'numeric'})
  },
  {
    key: "permanent_address",
    title: tl(FUNC_NAME, "Địa chỉ thường trú"),
    width: 200,
  },
  {
    key: "current_address",
    title: tl(FUNC_NAME, "Địa chỉ hiện tại"),
    width: 200,
  },
  {
    key: "id_number",
    title: tl(FUNC_NAME, "Số CCCD"),
    width: 130
  },
  {
    key: "date_issue",
    title: tl(FUNC_NAME, "Ngày cấp CCCD"),
    width: 100,
    formatter: (data: any) => 
      new Date(data.birthday).toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit', year: 'numeric'})
  },
  {
    key: "location_issue",
    title: tl(FUNC_NAME, "Nơi cấp CCCD"),
    width: 200,
  },
  {
    key: "is_married",
    title: tl(FUNC_NAME, "Tình trạng hôn nhân"),
    width: 150,
    formatter: (value:boolean) =>
      value ? "Đã kết hôn" : "Độc thân"
  },
];

export default { tableConfig, colConfig };
