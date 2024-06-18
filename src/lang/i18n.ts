import { createI18n } from 'vue-i18n'
import en from './en.json'
import jp from './jp.json'

const messages = {
  en,
  jp,
}

const i18n = createI18n({
  legacy: false, // sử dụng Composition API
  locale: 'en', // ngôn ngữ mặc định
  fallbackLocale: 'en', // ngôn ngữ dự phòng nếu không tìm thấy bản dịch
  messages,
})

export default i18n
