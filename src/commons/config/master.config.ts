import tl from "@/utils/locallize";
export const FUNC_NAME = 'master_code'

// ========================== ROUTER =============================
export const ROUTER_MASTER = [
  {
    path: "/master",
    name: "MasterCodeList",
    component: () => import("@master/views/master-code/ListView.vue"),
  },
  {
    path: "/master/create",
    name: "MasterCodeAddNew",
    component: () => import("@master/views/master-code/DetailView.vue"),
  },
  {
    path: "/master/:id/edit",
    name: "MasterCodeEditByID",
    component: () => import("@master/views/master-code/DetailView.vue"),
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
  GET_BY_TYPE: `/${FUNC_NAME}/get_by_type`,
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
    key: "type",
    title: tl(FUNC_NAME, "Type"),
    is_sort: true,
  },
  {
    key: "key",
    title: tl(FUNC_NAME, "Key"),
    is_sort: true,
  },
  {
    key: "value",
    title: tl(FUNC_NAME, "Value"),
    is_sort: true,
  },
];

export default { tableConfig, colConfig };