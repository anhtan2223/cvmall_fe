import tl from "@/utils/locallize";
export const FUNC_NAME = 'role'

// ========================== ROUTER =============================
export const ROUTER_ROLE = [
  {
    path: "/role",
    name: "RoleList",
    component: () => import("@master/views/role/ListView.vue"),
  },
  {
    path: "/role/new",
    name: "RoleAddNew",
    component: () => import("@master/views/role/DetailView.vue"),
  },
  {
    path: "/role/:id/edit",
    name: "RoleEditByID",
    component: () => import("@master/views/role/DetailView.vue"),
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
}

// ========================== CONFIG TABLE ==========================

export const tableConfig = {
  checkbox: false,
  action: true,
  index: true,
  showPaging: true,
  dbClick: false,
};

export const colConfig = [
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
    key: "description",
    title: tl(FUNC_NAME, "Description"),
  },
];

export default { tableConfig, colConfig };