import tl from "@/utils/locallize";
export const FUNC_NAME = 'resource'

// ========================== ROUTER =============================
export const ROUTER_RESOURCE  = [
  {
    path: "/resource",
    name: "ResourceList",
    component: () => import("@master/views/resource/ListView.vue"),
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
  LIST_SCREEN: `${FUNC_NAME}/screens`,
  SEARCH_RESOURCE: `${FUNC_NAME}/search_resource`,
}

// ========================== CONFIG TABLE ==========================
export const tableConfig = {
  showPaging: true,
  index: true,
  dbClick: true,
};

export const colConfig = [
  {
    key: "key",
    title: tl("Resource", "Key"),
    is_sort: true,
  },
  {
    key: "text",
    title: tl("Resource", "Value"),
    is_sort: true,
  },
];

export default { tableConfig, colConfig };
