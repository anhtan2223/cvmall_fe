import tl from "@/utils/locallize";
export const FUNC_NAME = 'user'

// ========================== ROUTER =============================
export const ROUTER_USER = [
  {
    path: '/user',
    name: 'UserList',
    component: () => import('@master/views/user/ListView.vue'),
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
  EXPORT: `${FUNC_NAME}/export-excel`,
  RESET_PASSWORD: (id: string) => `${FUNC_NAME}/${id}/reset_password`,
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
    key: "user_name",
    title: tl(FUNC_NAME, "UserName"),
    is_sort: true,
    linked: true,
  },
  {
    key: "full_name",
    title: tl(FUNC_NAME, "FullName"),
    is_sort: true,
  },
  {
    key: "mail",
    title: tl(FUNC_NAME, "Email"),
  },
  {
    key: "phone",
    title: tl(FUNC_NAME, "Phone"),
  },
  {
    key: "role_names",
    title: tl(FUNC_NAME, "Role"),
  },
];

export default { tableConfig, colConfig };
