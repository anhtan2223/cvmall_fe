<template>
  <vc-modal ref="modal" :title="tl('User', 'DetailTitle')" width="70%" @close="close">
    <template #content>
      <el-form ref="userForm" :model="user" :rules="rules" label-width="200px" label-position="right"
        require-asterisk-position="right" :disabled="type == POPUP_TYPE.VIEW">
        <vc-row :gutter="20">
          <vc-col :lg="12" :md="12" :sm="24" :xs="24">
            <!-- <vc-input-group prop="code" :label="tl('User', 'Code')">
                <vc-input disabled v-model="user.code" />
              </vc-input-group> -->

            <vc-input-group required prop="user_name" :label="tl('User', 'UserName')">
              <vc-input v-model="user.user_name" :disabled="type != POPUP_TYPE.CREATE" />
            </vc-input-group>

            <vc-input-group required prop="full_name" :label="tl('User', 'FullName')">
              <vc-input v-model="user.full_name" />
            </vc-input-group>

            <vc-input-group required prop="gender" :label="tl('User', 'Gender')">
              <vc-radio-group :items="genders" v-model="user.gender" fieldText="value" fieldValue="key" />
            </vc-input-group>

            <vc-input-group required prop="phone" :label="tl('User', 'Phone')">
              <vc-input v-model="user.phone"></vc-input>
            </vc-input-group>

            <vc-input-group :label="tl('User', 'Role')">
              <vc-select v-model="user.role_cds" multiple :items="roles" fieldValue="code" fieldText="name">
              </vc-select>
            </vc-input-group>
          </vc-col>

          <vc-col :lg="12" :md="12" :sm="24" :xs="24">

            <vc-input-group required prop="birthday" :label="tl('User', 'BirthDay')">
              <vc-input-date v-model="user.birthday" />
            </vc-input-group>

            <vc-input-group required prop="mail" :label="tl('User', 'Email')">
              <vc-input v-model="user.mail" />
            </vc-input-group>

            <vc-input-group :label="tl('User', 'Status')">
              <vc-checkbox :label="tl('User', 'Active')" v-model="user.is_actived"></vc-checkbox>
            </vc-input-group>
          </vc-col>
        </vc-row>
      </el-form>
    </template>

    <template #acttion>
      <vc-button v-if="props.type != POPUP_TYPE.VIEW" type="primary" class="ml-2" code="F00004" @click="onSave(userForm)"
        :loading="isLoading" :icon="'FolderChecked'">
        {{ tl("Common", "BtnSave") }}
      </vc-button>

      <!-- <vc-button v-if="user.id" type="danger" class="ml-2" code="F00006" :icon="Delete" :loading="isLoading"
        @click="onDeleteConfirm">
        {{ tl("Common", "BtnDelete") }}
      </vc-button> -->
    </template>

    <vc-confirm ref="confirmDialog"></vc-confirm>
  </vc-modal>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, reactive } from "vue";
import validate from "@/utils/validate_elp";
import tl from "@/utils/locallize";
import type { FormInstance } from "element-plus";
import userService from "@master/services/user.service";
import roleService from "@master/services/role.service";
import masterCodeService from "@master/services/master.service";
import { POPUP_TYPE } from "@/commons/const";

const rules = reactive({
  user_name: [
    { label: tl("User", "UserName"), required: true, validator: validate.required, trigger: ["blur"] },
    { label: tl('Role', 'UserName'), validator: validate.maxLengthRule, trigger: ["blur"], max: 100 },
  ],
  full_name: [
    { label: tl("User", "FullName"), required: true, validator: validate.required, trigger: ["blur"] },
    { label: tl('Role', 'FullName'), validator: validate.maxLengthRule, trigger: ["blur"], max: 100 },
  ],
  birthday: [{ label: tl("User", "Birthday"), validator: validate.dateRule, trigger: ["change"] }],
  mail: [
    { label: tl("User", "Mail"), required: true, validator: validate.required, trigger: ["blur"] },
    { label: tl("User", "Mail"), validator: validate.emailRule, trigger: ["change"] },
    { label: tl('Role', 'Mail'), validator: validate.maxLengthRule, trigger: ["blur"], max: 100 },
  ],
  org_info_code: [
    { label: tl("User", "Organize"), required: true, validator: validate.required, trigger: ["blur"] },
  ],
  phone: [
    { label: tl("User", "Phone"), required: true, validator: validate.required, trigger: ["blur"] },
    { label: tl("User", "Phone"), validator: validate.phoneNumberRule, trigger: ["change"] },
    { label: tl('Role', 'Phone'), validator: validate.maxLengthRule, trigger: ["blur"], max: 100 },
  ],
});

const props = defineProps<{
  type: POPUP_TYPE;
}>();

const userForm = ref<FormInstance>();
const isLoading = ref(false);
const roles = ref<any>([]);
const organizes = ref<any>([]);
const genders = ref<any>([]);
const confirmDialog = ref<any>(null);
const modal = ref<any>(null);

const user = reactive({
  id: '',
  user_name: null,
  is_actived: false,
  full_name: null,
  mail: null,
  phone: null,
  gender: null,
  birthday: null,
  role_cds: [],
  org_info_code: null,
});

onBeforeMount(async () => {
  await init();

  if (user.id) await getUserDetail();
});

const getUserDetail = async () => {
  const response = await userService.detail(user.id);
  Object.assign(user, response?.data);
};

const init = async () => {
  genders.value = (await masterCodeService.getByType("GENDER"))?.data;
  roles.value = (await roleService.getList({ page: 1, size: 100 }))?.data;
};

const onSave = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (!valid) return;

    isLoading.value = true;
    user.role_cds = user.role_cds ?? [];

    if (user.id) {
      await userService.update(user).finally(() => {
        isLoading.value = false;
      });
    } else {
      await userService.create(user).finally(() => {
        isLoading.value = false;
      });
    }
  });
};

const open = async (item: any) => {
  let userInfo = {
    id: '',
    user_name: null,
    full_name: null,
    mail: null,
    phone: null,
    birthday: null,
    role_cds: [],
    gender: "F",
    is_actived: true,
  };
  if (item)
    userInfo = (await userService.detail(item)).data
  Object.assign(user, userInfo)
  modal.value.open();
};

const close = () => {
  if (userForm.value)
    userForm.value.resetFields();
  modal.value.close()
};

defineExpose({
  open,
  close,
});

</script>
