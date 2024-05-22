<template>
  <el-container class="v-application">
    <el-main>
      <TheNavBar @toogleSidebar="onCollapse" :isMenuVisible="true" />
      <slot></slot>
    </el-main>
    <vc-confirm ref="logoutPopup"></vc-confirm>
  </el-container>
</template>

<script setup lang="ts">
import TheNavBar from '@/components/layouts/TheNavBar.vue'

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@auth/stores/auth.store'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const { loggedIn } = storeToRefs(authStore)

const isCollapse = ref<boolean>(false)
const logoutPopup = ref<any>(null)

onMounted(async () => {
  await authStore.refresh()

  if (!loggedIn.value)
    gotoLogin()

})

const onCollapse = (value: any) => {
  isCollapse.value = value
}

const gotoLogin = () => {
  router.push({
    name: "Login",
  });
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
@import '@/assets/styles/page/client/_footerClient.scss';
</style>
