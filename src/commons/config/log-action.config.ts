import tl from "@/utils/locallize";
export const FUNC_NAME = 'LogActionSystem'

// ========================== ROUTER =============================
export const ROUTER_LOG_ACTION = [
]

// ========================== PATH API =============================
export const API = {
  LIST: FUNC_NAME,
  CREATE: (feature: string) => `${FUNC_NAME}/${feature}`,
}

// ========================== CONFIG TABLE ==========================
export const tableConfig = {
  checkbox: false,
  action: false,
  showPaging: true,
  dbClick: false,
  index: true,
}

export const colConfig = [
  {
    key: 'user_name',
    title: tl(FUNC_NAME, 'UserName'),
    is_sort: true,
    width: 150,
  },
  {
    key: 'method',
    title: tl(FUNC_NAME, 'Method'),
    is_sort: true,
    width: 150,
  },
  {
    key: 'body',
    title: tl(FUNC_NAME, 'Body'),
    is_sort: true,
  },
  {
    key: 'description',
    title: tl(FUNC_NAME, 'Description'),
    is_sort: true,
  },
  {
    key: 'created_at_format',
    title: tl(FUNC_NAME, 'CreatedAt'),
    is_sort: true,
    width: 200,
  },
]

export default { tableConfig, colConfig }
