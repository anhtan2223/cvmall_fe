import tl from "@/utils/locallize";
import CallbackView from '@auth/views/auth/CallbackView.vue'
import LogoutCallbackView from '@auth/views/auth/LogoutCallbackView.vue'
import LoginView from '@auth/views/auth/LoginNewView.vue'
export const FUNC_NAME = 'auth'

// ========================== ROUTER =============================
export const ROUTER_AUTH = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      layout: "Client"
    }
  },
  {
    path: '/callback',
    name: 'Callback',
    component: CallbackView,
    meta: {
      layout: "Client"
    }
  },
  {
    path: '/logout-callback',
    name: 'LogoutCallback',
    component: LogoutCallbackView,
    meta: {
      layout: "Client"
    }
  },
]

// ========================== PATH API =============================
export const API = {
  SIGN_IN: `${FUNC_NAME}/login`,
  GET_INFO: `${FUNC_NAME}/info`,
  REFRESH_TOKEN: `${FUNC_NAME}/refresh-token`,
  CHANGE_PASSWORD: `${FUNC_NAME}/change-password`,
}

// ========================== CONFIG TABLE ==========================
export const tableConfig = {

};

export const colConfig = [

];

export default { tableConfig, colConfig };
