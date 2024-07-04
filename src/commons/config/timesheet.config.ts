import tl from '@/utils/locallize'
export const FUNC_NAME = 'timesheet'

// ========================== ROUTER =============================
export const ROUTER_TIMESHEET = [
  {
    path: '/timesheet',
    name: 'TimesheetList',
    component: () => import('@master/views/timesheet/ListView.vue'),
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
  EXPORT_ALL_EXCEL_BY_MONTH_YEAR: `${FUNC_NAME}/export-all-excel-by-month-year`,
  RESET_PASSWORD: (id: string) => `${FUNC_NAME}/${id}/reset_password`,
}

// ========================== CONFIG TABLE ==========================
export const tableConfig = {
  checkbox: false,
  action: false,
  showPaging: true,
  dbClick: false,
  index: true,
}

export const colConfig : any[] = [
  {
    key: 'employee_code',
    title: tl(FUNC_NAME, 'Mã nhân sự '),
    is_sort: true,
    width: 120,
  },
  {
    key: 'full_name',
    title: tl(FUNC_NAME, 'Họ và tên'),
    is_sort: true,
    width: 120,
  },
  {
    key: 'initial_name',
    title: tl(FUNC_NAME, 'Tên viết tắt'),
    is_sort: true,
    width: 120,
  },
  {
    key: 'branch',
    title: tl(FUNC_NAME, 'Chi nhánh	'),
    is_sort: true,
    width: 120,
  },
  {
    key: 'group',
    title: tl(FUNC_NAME, 'Nhóm'),
    width: 120,
    is_custom: true,
  },
  {
    key: 'state',
    title: tl(FUNC_NAME, 'Thực trạng'),
    width: 120,
    is_custom: true,
  },
  {
    key: 'project_participation_hours',
    title: tl(FUNC_NAME, 'Công số tham gia dự án'),
    width: 120,
    is_custom: true,
  },
  {
    key: 'consumed_hours',
    title: tl(FUNC_NAME, 'Công số tiêu thụ'),
    is_sort: true,
    width: 120,
    is_custom: true,
  },
  {
    key: 'late_early_departure',
    title: tl(FUNC_NAME, 'Số buổi đi muộn / về sớm '),
    is_sort: true,
    width: 140,
    is_custom: true,
  },
  {
    key: 'absence_hours',
    title: tl(FUNC_NAME, 'Số giờ xin nghỉ'),
    is_sort: true,
    width: 120,
    is_custom: true,
  },
]

export default { tableConfig, colConfig }
