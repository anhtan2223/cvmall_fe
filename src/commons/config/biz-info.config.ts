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
    is_custom: true
  },
  {
    key: "prj_content",
    title: tl(FUNC_NAME, "Duties / Comments"),
    linked: false,
    is_custom: true
  },
  {
    key: "period",
    title: tl(FUNC_NAME, "Period"),
    is_custom: true
  },
  {
    key: "system_analysis",
    title: tl(FUNC_NAME, "System analysis"),
    is_custom: true
  },
  {
    key: "basic_design",
    title: tl(FUNC_NAME, "Basic design"),
    is_custom: true
  },
  {
    key: "functional_design",
    title: tl(FUNC_NAME, "Function design"),
    is_custom: true
  },
  {
    key: "detailed_design",
    title: tl(FUNC_NAME, "Detail design"),
    is_custom: true
  },
  {
    key: "coding",
    title: tl(FUNC_NAME, "Coding"),
    is_custom: true
  },
  {
    key: "unit_test",
    title: tl(FUNC_NAME, "Unit Test"),
    is_custom: true
  },
  {
    key: "operation",
    title: tl(FUNC_NAME, "Operation"),
    is_custom: true
  },
  {
    key: "os_db",
    title: tl(FUNC_NAME, "OS・DB"),
    is_custom: true
  },
  {
    key: "language",
    title: tl(FUNC_NAME, "Language"),
    is_custom: true
  },
  {
    key: "role",
    title: tl(FUNC_NAME, "Role"),
    is_custom: true
  }
];

export default { tableConfig, colConfig };
