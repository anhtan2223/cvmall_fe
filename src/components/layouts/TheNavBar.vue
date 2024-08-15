<template>
  <div class="navbar">
    <el-header class="navbar-header">
      <el-row :gutter="20">
        <el-col :span="1" v-if="!isMenuVisible">
          <vc-button type="primary" class="btn-toggle-code" icon="DArrowLeft"
            :class="['btn-toggle-sidebar', { actived: showNav },]" @click="toogleSidebar" />
        </el-col>

        <el-col :span="isMenuVisible ? 18 : 17" class="col-left">
          <el-header :style="{ width: `${widthMenu}px` }">
            <!-- <vc-menu v-if="isMenuVisible" mode="horizontal" class="vc-menu-horizontal"></vc-menu> -->
          </el-header>
        </el-col>

        <el-col :span="6" class="col-right">
          <el-link type="primary" :underline="false">
            <el-dropdown class="el-dropdown-link" v-if="account?.full_name">
              <span> {{ account?.full_name }}
                <el-icon class="el-icon--right">
                  <CaretBottom />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="onChangePass">Change Password</el-dropdown-item>
                  <el-dropdown-item @click="onLogout">Logout</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- <el-icon class="el-icon--right">
              <CaretBottom />
            </el-icon> -->
          </el-link>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@auth/stores/auth.store'
import { ref, toRefs, onMounted, onUnmounted } from 'vue';

const authStore = useAuthStore()
const { account } = storeToRefs(authStore)
const router = useRouter()
const showNav = ref(false)

const props = defineProps<{ isMenuVisible?: boolean }>()
const { isMenuVisible } = toRefs(props)
const widthMenu = ref(window.innerWidth - 200)
const emit = defineEmits(['toogleSidebar'])

onMounted(() => {
  window.addEventListener('resize', updateTableHeight);
})

onUnmounted(() => {
  window.removeEventListener('resize', updateTableHeight);
});

const updateTableHeight = () => {
  widthMenu.value = window.innerWidth - 200;
}

const goPage = async (name: string) => {
  router.push({
    name: name,
  })
}

const onLogout = () => {
  authStore.logout()
  goPage("Login")
}
const onChangePass = () => {
  goPage("ChangePassWord")
}

const toogleSidebar = () => {
  showNav.value = !showNav.value
  emit('toogleSidebar', showNav.value)
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commons/navbar.scss';

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
