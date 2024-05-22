import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './modules/router'
import resourceService from '@master/services/resource.service'
import VcRegister from '@/components/commons/vc-register'

import { registerLayouts } from '@/layouts/_register'

import directive  from '@/utils/directive'
// ===================== ELEMENT PLUS =========================
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/main.scss'
import vi from 'element-plus/dist/locale/vi.mjs'

const app = createApp(App)

// ===================== BASE COMPONENT =========================
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
VcRegister.register(app)

// ===================== ENABLE STORE PINIA =====================
const pinia = createPinia()
app.use(pinia)

// ===================== ADD DIRECTIVE ===========================
app.use(directive)

// eslint-disable-next-line no-constant-condition
// if (false) {
resourceService
  .getList({ page: 1, size: 10000, sort: 'screen.asc' })
  .then((reponse: any) => {
    localStorage.setItem(
      'i18n.ja',
      reponse.data ? JSON.stringify(reponse.data) : '[]'
    )

    app.use(router)
    app.use(ElementPlus, {
      locale: vi,
    })
    registerLayouts(app)

    app.mount('#app')
  })
// }
