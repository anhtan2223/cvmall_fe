import tl from "@/utils/locallize";
export const FUNC_NAME = 'cv_info'

// ========================== ROUTER =============================
export const ROUTER_USER = [
  {
    path: '/cv',
    name: 'CV',
    component: () => import('@master/views/cv/ListView.vue'),
  },
]

// ========================== PATH API =============================
export const API = {
  LIST: `/${FUNC_NAME}`,
  DELETE: (id: string | string[]) => `${FUNC_NAME}/${id}`,
}

// ========================== CONFIG TABLE ==========================

export const tableConfig = {
  checkbox: false,
  action: true,
  showPaging: true,
  dbClick: false,
  index: true,
};

export const colConfig = [
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
    is_sort: true,
    linked: false,
    child: null
  },
  {
    key: "is_actived",
    title: tl(FUNC_NAME, "Tình trạng"),
    is_sort: false,
    linked: false,
    // is_custom: true,
    child: null
  },
  {
    key: "name",
    title: tl(FUNC_NAME, "Họ tên"),
    is_sort: true,
    linked: false,
    child: null,
  }
];

export default { tableConfig, colConfig };
