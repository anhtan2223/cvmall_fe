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
  UPDATE_MULTI: `${FUNC_NAME}/update-multi`,
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
    width: 120,
  },
  {
    key: 'group',
    title: tl(FUNC_NAME, 'Nhóm'),
    width: 150,
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
    is_sort: true,
    width: 120,
    is_custom: true,
    // sort_method: () => true,
  },
  {
    key: 'consumed_hours',
    title: tl(FUNC_NAME, 'Công số tiêu thụ'),
    is_sort: true,
    width: 120,
    is_custom: true,
    // sort_method: () => true,
  },
  {
    key: 'late_early_departures',
    title: tl(FUNC_NAME, 'Số buổi đi muộn / về sớm '),
    is_sort: true,
    width: 140,
    is_custom: true,
    // sort_method: () => true,
  },
  {
    key: 'absence_hours',
    title: tl(FUNC_NAME, 'Số giờ xin nghỉ'),
    is_sort: true,
    width: 120,
    is_custom: true,
    // sort_method: () => true,
  },
]

export default { tableConfig, colConfig }
