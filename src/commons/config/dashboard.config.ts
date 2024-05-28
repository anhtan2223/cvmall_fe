import tl from "@/utils/locallize";
export const FUNC_NAME = 'dashboard'

// ========================== ROUTER =============================
export const ROUTER_USER = [
  {
    path: '/dashboard',
    name: 'DashboardList',
    component: () => import('@master/views/static/DashboardView.vue'),
  },
]

// ========================== PATH API =============================
export const API = {
  // LIST: `/${FUNC_NAME}`,
  // CREATE: `/${FUNC_NAME}`,
  // DETAIL: (id: string) => `${FUNC_NAME}/${id}`,
  // UPDATE: (id: string) => `${FUNC_NAME}/${id}`,
  // DELETE: (id: string | string[]) => `${FUNC_NAME}/${id}`,
  // DELETE_MULTI: `${FUNC_NAME}/delete-multi`,
  // EXPORT: `${FUNC_NAME}/export-excel`,
}

// ========================== CONFIG TABLE ==========================

interface DashboardColConfig {
  key : string | null,
  title: string | null,
  is_sort: boolean | null,
  linked: boolean | null,
  width?: number
  child?: DashboardColConfig[] | null
  is_custom?: boolean | null
}

export const tableConfig = {
  checkbox: false,
  action: true,
  showPaging: true,
  dbClick: false,
  index: true,
};

export const colConfig : DashboardColConfig[] = [
  {
    key: "user_code",
    title: tl(FUNC_NAME, "ID"),
    is_sort: true,
    linked: false,
    child: null
  },
  {
    key: "branch",
    title: tl(FUNC_NAME, "Chi nhánh"),
    width: 120,
    is_sort: true,
    linked: false,
    child: null
  },
  {
    key: "is_actived",
    title: tl(FUNC_NAME, "Tình trạng"),
    is_sort: false,
    linked: false,
    child: null
  },
  {
    key: "name",
    title: tl(FUNC_NAME, "Họ tên"),
    is_sort: true,
    width: 200,
    linked: false,
    child: null,
  }
];

export default { tableConfig, colConfig, FUNC_NAME };
