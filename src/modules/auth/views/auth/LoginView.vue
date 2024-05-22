<template>
  <div class="page-login flex-center">
    <vc-card class="card-login pa-10">
      <vc-card-content>
        <el-form ref="loginFormRef" label-position="top" :model="request" :rules="rules">
          <p class="logo-container">
            <vc-image :src="'/images/logo_honki.png'" />
            <span class="text-logo">{{ tl('Login.Description') }}</span>
          </p>

          <p class="logo">{{ tl('Login.Title') }}</p>

          <vc-input-group required prop="user_name">
            <vc-input-icon v-model="request.user_name" :icon="Avatar" :placeholder="tl('Login.UserName')"
              autocomplete="off" />
          </vc-input-group>

          <vc-input-group class="content-pwd" required prop="password">
            <vc-input-icon v-model="request.password" :icon="Lock" :placeholder="tl('Login.Password')" type="password"
              show-password />
          </vc-input-group>

          <vc-input-group class="d-flex space-between" style="padding-bottom: 20px">
            <vc-checkbox :label="tl('Login.Remember')"></vc-checkbox>
          </vc-input-group>
          <p class="container-btn-login">
            <vc-button type="primary" class="mt-5" @click="onLogin(loginFormRef)" :loading="isLoading">{{
              tl('Login.BtnLogin') }}
            </vc-button>
          </p>
          <p class="forgot-pass">
            <!-- <router-link to="/forgot_password">{{ tl('Login.Forgot') }}</router-link> -->
          </p>
        </el-form>
      </vc-card-content>
    </vc-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useAuthStore } from "@auth/stores/auth.store";
import { useRouter } from "vue-router";
import validate from "@/utils/validate_elp";
import type { FormInstance } from "element-plus";
import { Avatar, Lock } from "@element-plus/icons-vue";
import { storeToRefs } from 'pinia'
import tl from '@/utils/locallize'

const isLoading = ref<boolean>(false);
const authStore = useAuthStore();
const { loggedIn } = storeToRefs(authStore)
const router = useRouter();
const loginFormRef = ref<FormInstance>();

const request = reactive({
  user_name: null,
  password: null,
  remember: false,
});

const rules = reactive({
  user_name: [{ required: true, validator: validate.required, trigger: "blur", label: tl('Login', 'UserName') }],
  password: [
    { required: true, validator: validate.required, trigger: "blur", label: tl('Login', 'Password') },
    { validator: validate.alphabetAndSymbolRule, trigger: "blur" }],
});

onMounted(() => {
  if (loggedIn.value) {
    authStore.refresh().then((isLoggedIn) => {
      if (isLoggedIn) {
        router.push({
          name: "Dashboard",
        });
      }
    });
  }
})

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (!valid) return

    isLoading.value = true

    await authStore
      .login(request)
      .then((isLogged) => {
        if (isLogged)
          router.push({
            name: 'Dashboard',
          })
      })
      .finally(() => {
        isLoading.value = false
      })
  })
}

</script>

<style lang="scss" scoped>
@import "@/assets/styles/page/login";
</style>
