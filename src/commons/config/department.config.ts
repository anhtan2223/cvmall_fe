import tl from "@/utils/locallize";
import { layouts } from "chart.js";
export const FUNC_NAME = 'department'

// ========================== PATH API =============================
export const API = {
  LIST: `/${FUNC_NAME}`,
  CREATE: `/${FUNC_NAME}`,
  UPDATE: (id: string) => `${FUNC_NAME}/${id}`,
  DELETE: (id: string | string[]) => `${FUNC_NAME}/${id}`
}