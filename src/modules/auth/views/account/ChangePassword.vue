<template>
  <vc-side-bar-left>
    <div class="container-finance mb-8">
      <div class="headline">
        <h2>{{ tl("ChangePassword", "PageTitle") }}</h2>
      </div>
      <div class="margin-bottom-0">
        <p>
          <vc-notify></vc-notify>
        </p>
      </div>
      <vc-row>
        <vc-col :span="10" class="changepass-content">
          <el-form ref="changeForm" :model="passwordValidate" :rules="rules" :label-position="'top'">
            <vc-input-group required prop="olPass" :label='tl("ChangePassword", "CurrentPassword")' class="form-label">
              <vc-input class="text-input" v-model.trim="passwordValidate.olPass"
                :placeholder='tl("ChangePassword", "CurrentPassword")' type="password" autocomplete="off" show-password />
            </vc-input-group>

            <vc-input-group required prop="newPass" :label='tl("ChangePassword", "NewPassword")' class="form-label">
              <vc-input class="text-input" v-model.trim="passwordValidate.newPass"
                :placeholder='tl("ChangePassword", "NewPassword")' type="password" autocomplete="off" show-password />
            </vc-input-group>

            <vc-input-group required prop="cfPass" :label='tl("ChangePassword", "NewPasswordConfirm")' class="form-label">
              <vc-input class="text-input" v-model.trim="passwordValidate.cfPass"
                :placeholder='tl("ChangePassword", "NewPasswordConfirm")' type="password" autocomplete="off"
                show-password />
            </vc-input-group>

            <vc-button type="primary" class="card-footer-col-btn" @click="handleChangePass(changeForm)">
              {{ tl("ChangePassword", "SaveChange") }}
            </vc-button>
          </el-form>
        </vc-col>
      </vc-row>
    </div>
  </vc-side-bar-left>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import validate from '@/utils/validate_elp'
import tl from '@/utils/locallize'
import type { FormInstance } from 'element-plus'
import authService from '@auth/services/auth.service'
import { useAuthStore } from '@auth/stores/auth.store'
import { storeToRefs } from 'pinia'

const changeForm = ref<FormInstance>()
const authStore = useAuthStore()
const { account } = storeToRefs(authStore)

const passwordValidate = reactive({
  olPass: '',
  newPass: '',
  cfPass: '',
})

const checkSamePassword = (rule: any, value: any, callback: any) => {
  if (value !== passwordValidate.newPass) {
    callback(
      new Error('確認用パスワードが新しいパスワードと同じではありません。')
    )
  } else {
    callback()
  }
}

const checkPasswrodInfection = (rule: any, value: any, callback: any) => {
  if (value === passwordValidate.olPass) {
    callback(new Error('新しいパスワードは現在のパスワードと同じです。'))
  } else {
    callback()
  }
}

const rules = reactive({
  cfPass: [
    {
      required: true,
      validator: validate.required,
      trigger: 'blur',
      label: tl("ChangePassword", "NewPasswordConfirm"),
    },
    { validator: validate.alphabetAndSymbolRule, trigger: 'blur' },
    { validator: checkSamePassword, trigger: 'blur' },
  ],
  newPass: [
    {
      required: true,
      validator: validate.required,
      trigger: 'blur',
      label: tl("ChangePassword", "NewPassword"),
    },
    { validator: validate.alphabetAndSymbolRule, trigger: 'blur' },
    { validator: checkPasswrodInfection, trigger: 'blur' },
  ],
  olPass: [
    {
      required: true,
      validator: validate.required,
      trigger: 'blur',
      label: tl("ChangePassword", "CurrentPassword"),
    },
    { validator: validate.alphabetAndSymbolRule, trigger: 'blur' },
  ],
})

const changePassword = async () => {
  const data = {
    id: account.value.profile.sub,
    current_password: passwordValidate.olPass,
    new_password: passwordValidate.newPass,
  }
  if (data) {
    await authService.changePassword(data)
  }
}
const handleChangePass = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      changePassword()
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/page/account/changePasswordAd.scss';
</style>
<style>
.form-label>.el-form-item__label::after {
  content: '*' !important;
  color: red !important;
  margin-right: 4px !important;
}

.form-label>.el-form-item__label::before {
  content: '' !important;
}
</style>
