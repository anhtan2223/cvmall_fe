import tl from "@/utils/locallize";
export const FUNC_NAME = 'biz_info'
import i18n from "../../lang/i18n";
import { computed } from "vue";


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
const getTitle = (key: string) => {
  return tl(FUNC_NAME, i18n.global.t(key))
}

interface BizColConfig {
  key: string | null
  title: string | null
  is_sort?: boolean | null
  linked?: boolean | null
  width?: number
  is_custom?: boolean | null
  is_hidden?: boolean | null
}

export const tableConfig = {
  checkbox: false,
  action: true,
  showPaging: false,
  dbClick: false,
  index: true,
};

export const colConfig : BizColConfig[] = computed(() => [
  {
    key: "prj_name",
    // title: tl(FUNC_NAME, "Project"),
    // title: tl(FUNC_NAME, i18n.global.t('project')),
    title: getTitle('project'),
    linked: true,
    width: 300,
    is_hidden: i18n.global.locale.value != 'en',
  },
  {
    key: "prj_content",
    // title: tl(FUNC_NAME, "Duties / Comments"),
    // title: tl(FUNC_NAME, i18n.global.t('duties_comments')),
    title: getTitle('duties_comments'),
    linked: false,
    width: 300,
    is_hidden: i18n.global.locale.value != 'en',
  },
  {
    key: 'prj_name_jp',
    // title: tl(FUNC_NAME, "Project"),
    // title: tl(FUNC_NAME, i18n.global.t('project')),
    title: getTitle('project_jp'),
    linked: true,
    width: 300,
    is_hidden: i18n.global.locale.value != 'jp',
  },
  {
    key: 'prj_content_jp',
    // title: tl(FUNC_NAME, "Duties / Comments"),
    // title: tl(FUNC_NAME, i18n.global.t('duties_comments')),
    title: getTitle('duties_comments_jp'),
    linked: false,
    width: 300,
    is_hidden: i18n.global.locale.value != 'jp',
  },
  {
    key: 'period',
    // title: tl(FUNC_NAME, "Period"),
    // title: tl(FUNC_NAME, i18n.global.t('period')),
    title: getTitle('period'),
  },
  {
    key: "system_analysis",
    // title: tl(FUNC_NAME, "System analysis"),
    // title: tl(FUNC_NAME, i18n.global.t('system_analysis')),
    title: getTitle('system_analysis'),
    width: 85,
    is_custom: true
  },
  {
    key: "overview_design",
    // title: tl(FUNC_NAME, "Overview design"),
    // title: tl(FUNC_NAME, i18n.global.t('overview_design')),
    title: getTitle('overview_design'),
    width: 90,
    is_custom: true
  },
  {
    key: "basic_design",
    // title: tl(FUNC_NAME, "Basic design"),
    // title: tl(FUNC_NAME, i18n.global.t('basic_design')),
    title: getTitle('basic_design'),
    width: 85,
    is_custom: true
  },
  {
    key: "function_design",
    // title: tl(FUNC_NAME, "Function design"),
    // title: tl(FUNC_NAME, i18n.global.t('function_design')),
    title: getTitle('function_design'),
    width: 85,
    is_custom: true
  },
  {
    key: "detail_design",
    // title: tl(FUNC_NAME, "Detail design"),
    // title: tl(FUNC_NAME, i18n.global.t('detail_design')),
    title: getTitle('detail_design'),
    width: 85,
    is_custom: true
  },
  {
    key: "coding",
    // title: tl(FUNC_NAME, "Coding"),
    // title: tl(FUNC_NAME, i18n.global.t('coding')),
    title: getTitle('coding'),
    width: 85,
    is_custom: true
  },
  {
    key: "unit_test",
    // title: tl(FUNC_NAME, "Unit Test"),
    // title: tl(FUNC_NAME, i18n.global.t('unit_test')),
    title: getTitle('unit_test'),
    width: 85,
    is_custom: true
  },
  {
    key: "operation",
    // title: tl(FUNC_NAME, "Operation"),
    // title: tl(FUNC_NAME, i18n.global.t('operation')),
    title: getTitle('operation'),
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
    // title: tl(FUNC_NAME, "Language"),
    // title: tl(FUNC_NAME, i18n.global.t('language')),
    title: getTitle('language'),
    width: 120,
  },
  {
    key: "role",
    // title: tl(FUNC_NAME, "Role"),
    // title: tl(FUNC_NAME, i18n.global.t('role')),
    title: getTitle('role'),
    width: 120,
    is_hidden: i18n.global.locale.value != 'en',
  },
  {
    key: 'role_jp',
    // title: tl(FUNC_NAME, "Role_jp"),
    // title: tl(FUNC_NAME, i18n.global.t('role_jp')),
    title: getTitle('role_jp'),
    width: 120,
    is_hidden: i18n.global.locale.value != 'jp',
  },
])

export default { tableConfig, colConfig };
