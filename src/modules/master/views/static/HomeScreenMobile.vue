<template>
  <div class="pl-2 pr-2">
    <vc-row :gutter="20" justify="center">
      <vc-col :span="24">
        <!-- Header -->
        <vc-row justify="space-between" class="header-mobile mb-4">
          <vc-col :span="8"></vc-col>
          <vc-col :span="8">
            <!-- <vc-image :src="LogoMobile" /> -->
            <el-image style="width: 100%;" :src="LogoMobile" />
          </vc-col>
          <vc-col :span="8" class="flex-end">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /></vc-col>
        </vc-row>

        <div class="main-content-mobile">
          <!-- List Menu -->
          <el-text tag="b">
            <el-icon>
              <SemiSelect />
            </el-icon>
            Title 1
          </el-text>
          <vc-row justify="space-start" class="mb-4">
            <vc-col :span="6" v-for="(item, index) in lstMenuMobile" v:key="index">
              <el-card>
                <Notification class="pa-2" />
                <p class="text-center">{{ item }}</p>
              </el-card>
            </vc-col>
          </vc-row>
          <el-text tag="b">
            <el-icon>
              <SemiSelect />
            </el-icon>
            Title 1
          </el-text>
          <vc-row justify="space-start">
            <vc-col :span="6" v-for="(item, index) in lstMenuMobile" v:key="index">
              <el-card>
                <Notification class="pa-2" />
                <p class="text-center">{{ item }}</p>
              </el-card>
            </vc-col>
          </vc-row>
          <el-text tag="b">
            <el-icon>
              <SemiSelect />
            </el-icon>
            Title 1
          </el-text>
          <vc-row justify="space-start">
            <vc-col :span="6" v-for="(item, index) in lstMenuMobile" v:key="index">
              <el-card>
                <Notification class="pa-2" />
                <p class="text-center">{{ item }}</p>
              </el-card>
            </vc-col>
          </vc-row>
        </div>
      </vc-col>
    </vc-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import userService from "@master/services/user.service";
import { useAuthStore } from "@auth/stores/auth.store";
import { useToastStore } from "@/stores/toast.store";
import { SemiSelect, Notification } from '@element-plus/icons-vue'

import LogoMobile from "@/assets/images/logo_mobile.png";

const loading = ref<boolean>(false);
const confirmDialog = ref<any>(null);
const authStore = useAuthStore();
const router = useRouter();

const lstMenuMobile: string[] = ['Item 1', 'Item 1', 'Item 1', 'Item 1', 'Item 1']

const onLogout = () => {
  authStore.logout();
  router.push({
    name: "Login",
  });
};

const getApi = async () => {
  loading.value = true;
  await userService
    .getList()
    .then((data: any) => {
      console.log(data);
    })
    .finally(() => {
      loading.value = false;
    });
};

const toastStore = useToastStore();

const pushToast = (type: string) => {
  toastStore.push({
    type: type,
    message: "123123123123123",
  });
};

const confirms = () => {
  confirmDialog.value.confirm("Logout", "Are your sure ?", (res: any) => {
    console.log(res);
  });
};

const onAlert = () => {
  confirmDialog.value.alert("Logout", "Are your sure ?", (res: any) => {
    console.log(res);
  });
};
</script>

<style lang="scss" scoped>
.header-mobile {
  position: fixed;
  z-index: 99999;
  background-color: #fff;
  padding: 10px 10px;
}

.main-content-mobile {
  margin-top: 80px !important;
}

</style>