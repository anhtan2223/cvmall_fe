import tl from "@/utils/locallize";
export const FUNC_NAME = 'cv_info'

// ========================== ROUTER =============================
export const ROUTER_CV = [
  {
    path: "/cv/new",
    name: "CvAddNew",
    component: () => import("@master/views/cv/CvView.vue"),
    props: {type: "new"},
  },
  {
    path: "/cv/:id/edit",
    name: "CvEditById",
    component: () => import("@master/views/cv/CvView.vue"),
    props: {type: "edit"},
  },
]

// ========================== PATH API =============================
export const API = {
  LIST: `/${FUNC_NAME}`,
  CREATE: `/${FUNC_NAME}`,
  DETAIL: (id: string) => `${FUNC_NAME}/${id}`,
  UPDATE: (id: string) => `${FUNC_NAME}/${id}`,
  DELETE: (id: string | string[]) => `${FUNC_NAME}/${id}`,
  EXPORT_DETAIL: (id: string) => `${FUNC_NAME}/${id}/export`,
  EXPORT_TEMPLATE: () => `${FUNC_NAME}/export_template`,
  EXPORT_ALL: () => `${FUNC_NAME}/export_all`,
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
