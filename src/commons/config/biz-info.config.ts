import tl from "@/utils/locallize";
export const FUNC_NAME = 'biz_info'

// ========================== PATH API =============================
export const API = {
  LIST: `/${FUNC_NAME}`,
  // CREATE: `/${FUNC_NAME}`,
  // DETAIL: (id: string) => `${FUNC_NAME}/${id}`,
  // UPDATE: (id: string) => `${FUNC_NAME}/${id}`,
  // DELETE: (id: string | string[]) => `${FUNC_NAME}/${id}`,
  // DELETE_MULTI: `${FUNC_NAME}/delete-multi`,
  // EXPORT: `${FUNC_NAME}/export-excel`,
}

// ========================== CONFIG TABLE ==========================

interface BizColConfig {
  key : string | null,
  title: string | null,
  is_sort?: boolean | null,
  linked?: boolean | null,
  width?: number
  is_custom?: boolean | null
}

export const tableConfig = {
  checkbox: false,
  action: true,
  showPaging: false,
  dbClick: false,
  index: true,
};

export const colConfig : BizColConfig[] = [
  {
    key: "prj_name",
    title: tl(FUNC_NAME, "Project"),
    linked: true,
    width: 300,
  },
  {
    key: "prj_content",
    title: tl(FUNC_NAME, "Duties / Comments"),
    linked: false,
    width: 300,
  },
  {
    key: "period",
    title: tl(FUNC_NAME, "Period"),
  },
  {
    key: "system_analysis",
    title: tl(FUNC_NAME, "System analysis"),
    width: 85,
    is_custom: true
  },
  {
    key: "overview_design",
    title: tl(FUNC_NAME, "Overview design"),
    width: 90,
    is_custom: true
  },
  {
    key: "basic_design",
    title: tl(FUNC_NAME, "Basic design"),
    width: 85,
    is_custom: true
  },
  {
    key: "function_design",
    title: tl(FUNC_NAME, "Function design"),
    width: 85,
    is_custom: true
  },
  {
    key: "detail_design",
    title: tl(FUNC_NAME, "Detail design"),
    width: 85,
    is_custom: true
  },
  {
    key: "coding",
    title: tl(FUNC_NAME, "Coding"),
    width: 85,
    is_custom: true
  },
  {
    key: "unit_test",
    title: tl(FUNC_NAME, "Unit Test"),
    width: 85,
    is_custom: true
  },
  {
    key: "operation",
    title: tl(FUNC_NAME, "Operation"),
    width: 95,
    is_custom: true
  },
  {
    key: "os_db",
    title: tl(FUNC_NAME, "OS・DB"),
    width: 120,
  },
  {
    key: "language",
    title: tl(FUNC_NAME, "Language"),
    width: 120,
  },
  {
    key: "role",
    title: tl(FUNC_NAME, "Role"),
    width: 120,
  }
];

export default { tableConfig, colConfig };
