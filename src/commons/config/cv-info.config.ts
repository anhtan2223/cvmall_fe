import tl from "@/utils/locallize";
export const FUNC_NAME = 'cv_info'

// ========================== PATH API =============================
export const API = {
  LIST: `/${FUNC_NAME}`,
  DELETE: (id: string | string[]) => `${FUNC_NAME}/${id}`,
}
