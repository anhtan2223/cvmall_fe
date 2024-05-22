import tl from "@/utils/locallize";
export const FUNC_NAME = 'function'

// ========================== ROUTER =============================
export const ROUTER_FUNCTION = [
  {
    path: "/function",
    name: "FunctionList",
    component: () => import("@master/views/function/ListView.vue"),
  },
  {
    path: "/function/new",
    name: "FunctionAddNew",
    component: () => import("@master/views/function/DetailView.vue"),
  },
  {
    path: "/function/:id/edit",
    name: "FunctionEditById",
    component: () => import("@master/views/function/DetailView.vue"),
  },
]

// ========================== PATH API =============================
export const API = {
  LIST: `/${FUNC_NAME}`,
  CREATE: `/${FUNC_NAME}`,
  MENU: `/${FUNC_NAME}/menu`,
  DETAIL: (id: string) => `${FUNC_NAME}/${id}`,
  UPDATE: (id: string) => `${FUNC_NAME}/${id}`,
  DELETE: (id: string | string[]) => `${FUNC_NAME}/${id}`,
  DELETE_MULTI: `${FUNC_NAME}/delete-multi`,
}

// ========================== CONFIG TABLE ==========================
export const tableConfig = {
  checkbox: false,
  action: true,
  showPaging: true,
  dbClick: false,
};

export const colConfig = [
  {
    key: "module",
    title: tl(FUNC_NAME, "Module"),
    is_sort: true,
  },
  {
    key: "code",
    title: tl(FUNC_NAME, "Code"),
    is_sort: true,
  },
  {
    key: "name",
    title: tl(FUNC_NAME, "Name"),
    is_sort: true,
  },
  {
    key: "parent",
    title: tl(FUNC_NAME, "Parent"),
    is_sort: true,
  },
  {
    key: "url",
    title: tl(FUNC_NAME, "Url"),
    is_sort: true,
  },
  {
    key: "path",
    title: tl(FUNC_NAME, "Api"),
    is_sort: true,
  },
  {
    key: "method",
    title: tl(FUNC_NAME, "Method"),
  },
];

export default { tableConfig, colConfig };
