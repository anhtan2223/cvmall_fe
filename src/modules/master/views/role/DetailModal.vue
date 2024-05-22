<template>
  <vc-modal ref="modal" :title="tl('Role', 'DetailTitle')" width="70%" @close="close">
    <template #content>
      <el-form ref="roleForm" :model="role" :rules="rules" label-width="120px" require-asterisk-position="right"
        :disabled="type == POPUP_TYPE.VIEW">
        <vc-row :gutter="20">
          <vc-col :lg="12" :md="12" :sm="24" :xs="24">
            <vc-input-group prop="code" :label="tl('Role', 'Code')">
              <vc-input v-model="role.code" :disabled="type != POPUP_TYPE.CREATE" />
            </vc-input-group>

            <vc-input-group prop="name" :label="tl('Role', 'Name')">
              <vc-input v-model="role.name" />
            </vc-input-group>

            <vc-input-group :label="tl('Role', 'Description')">
              <vc-textarea rows="5" v-model="role.description" />
            </vc-input-group>
          </vc-col>

          <vc-col :lg="12" :md="12" :sm="24" :xs="24">
            <vc-input-group :label="tl('Role', 'Permission')">
              <vc-treeview show-checkbox class="select-permission" node_key="code" v-model="role.permissions"
                :data="functions" />
            </vc-input-group>
          </vc-col>
        </vc-row>
      </el-form>

    </template>

    <template #acttion>
      <vc-button v-if="props.type != POPUP_TYPE.VIEW" type="primary" class="ml-2" code="F00004" @click="onSave(roleForm)"
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
import { onMounted, ref, reactive } from "vue";
import roleService from "@master/services/role.service";
import functionService from "@master/services/function.service";
import type { FormInstance } from "element-plus";
import tl from "@/utils/locallize";
import validate from "@/utils/validate_elp";
import { POPUP_TYPE } from "@/commons/const";

const props = defineProps<{
  type: POPUP_TYPE;
}>();


const roleForm = ref<FormInstance>();
const isLoading = ref(false);
const functions = ref<any>([]);
const modal = ref<any>(null);

const confirmDialog = ref<any>(null);
const rules = reactive({
  code: [
    { label: tl('Role', 'Code'), required: true, validator: validate.required, trigger: ["blur"] },
    { label: tl('Role', 'Code'), validator: validate.maxLengthRule, trigger: ["blur"], max: 20 },
  ],
  name: [
    { label: tl('Role', 'Name'), required: true, validator: validate.required, trigger: ["blur"] },
    { label: tl('Role', 'Name'), validator: validate.maxLengthRule, trigger: ["blur"], max: 100 },
  ],
  description: [
    { label: tl('Role', 'Description'), validator: validate.maxLengthRule, trigger: ["blur"], max: 300 },
  ],
});

const role = reactive({
  id: '',
  code: null,
  name: null,
  description: null,
  permissions: [],
});

onMounted(async () => {
  await getFunction();

  if (role.id) await getRoleDetail();
});

const getRoleDetail = async () => {
  const response = await roleService.getById(role.id);
  Object.assign(role, response?.data);
};

const getFunction = async () => {
  await functionService.getTreeView().then((response) => {
    functions.value = response.data;
  });
};

const onSave = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (!valid) return;

    isLoading.value = true;
    role.permissions = role.permissions ?? [];

    if (role.id) {
      await roleService.update(role).finally(() => {
        isLoading.value = false;
      });
    } else {
      await roleService.create(role).finally(() => {
        isLoading.value = false;
        console.log(role);
      });
    }
  })
};

const open = async (item: any) => {
  let roleInfo = {
    id: '',
    code: null,
    name: null,
    description: null,
    permissions: [],
  };
  if (item)
    roleInfo = (await roleService.getById(item)).data
  Object.assign(role, roleInfo)
  modal.value.open();
};

const close = () => {
  if (roleForm.value)
    roleForm.value.resetFields();
  modal.value.close()
};

defineExpose({
  open,
  close,
});


</script>


<style lang="scss">
@import "@/assets/styles/page/role";
</style>

