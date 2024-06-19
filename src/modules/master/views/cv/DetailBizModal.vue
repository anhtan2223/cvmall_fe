<template>
  <vc-modal ref="modal" :title="tl('Business content', $t('business_content_details'))" width="40%" @close="close">
    <template #content>
      <el-form ref="bizForm" :rules="rules" :model="biz" label-width="200px" label-position="top"
        require-asterisk-position="right" :disabled="type == POPUP_TYPE.VIEW">

        <vc-row :gutter="10">
          <vc-col :lg="18" :md="24" :sm="24" :xs="24">
            <vc-input-group required prop="prj_name" :label="tl('BizInfo', $t('project'))">
              <vc-input v-model="biz.prj_name" :disabled="type == POPUP_TYPE.VIEW" />
            </vc-input-group>
          </vc-col>
          <vc-col :lg="6" :md="24" :sm="24" :xs="24">
            <vc-input-group required prop="period" :label="tl('BizInfo', `${$t('period')} (${$t('month')})`)">
              <el-input-number v-model="biz.period" :min="1" :controls="false" class="full-width" />
            </vc-input-group>
          </vc-col>
        </vc-row>

        <vc-row :gutter="10">
          <vc-col :lg="24" :md="24" :sm="24" :xs="24">
            <vc-input-group required prop="prj_content" :label="tl('BizInfo', $t('duties_comments'))">
              <vc-textarea v-model="biz.prj_content" />
            </vc-input-group>
          </vc-col>
        </vc-row>

        <vc-row :gutter="10">
          <vc-col :lg="24" :md="24" :sm="24" :xs="24">
            <vc-input-group required prop="os_db" :label="tl('BizInfo', 'OS・DB')">
              <vc-input v-model="biz.os_db" />
            </vc-input-group>
          </vc-col>
        </vc-row>

        <vc-row>
          <vc-col :lg="12" :md="12" :sm="12" :xs="12">
            <vc-row>
              <vc-checkbox :label="tl('BizInfo', $t('system_analysis'))" v-model="biz.system_analysis"
                class="checkbox-width"></vc-checkbox>
              <vc-checkbox :label="tl('BizInfo', $t('overview_design'))" v-model="biz.overview_design"
                class="checkbox-width"></vc-checkbox>
            </vc-row>
            <vc-row>
              <vc-checkbox :label="tl('BizInfo', $t('basic_design'))" v-model="biz.basic_design"
                class="checkbox-width"></vc-checkbox>
              <vc-checkbox :label="tl('BizInfo', $t('function_design'))" v-model="biz.functional_design"
                class="checkbox-width"></vc-checkbox>
            </vc-row>
          </vc-col>

          <vc-col :lg="12" :md="12" :sm="12" :xs="12">
            <vc-row>
              <vc-checkbox :label="tl('BizInfo', $t('detail_design'))" v-model="biz.detailed_design" class="checkbox-width">
              </vc-checkbox>
              <vc-checkbox :label="tl('BizInfo', $t('coding'))" v-model="biz.coding" class="checkbox-width">
              </vc-checkbox>
            </vc-row>
            <vc-row>
              <vc-checkbox :label="tl('BizInfo', $t('unit_test'))" v-model="biz.unit_test"
                class="checkbox-width"></vc-checkbox>
              <vc-checkbox :label="tl('BizInfo', $t('operation'))" v-model="biz.operation"
                class="checkbox-width"></vc-checkbox>
            </vc-row>
          </vc-col>
        </vc-row>

        <vc-row :gutter="10">
          <vc-col :lg="24" :md="24" :sm="24" :xs="24">
            <vc-input-group required prop="language" :label="tl('BizInfo', $t('language'))">
              <vc-input v-model="biz.language" />
            </vc-input-group>
          </vc-col>
        </vc-row>

        <vc-row :gutter="10">
          <vc-col :lg="24" :md="24" :sm="24" :xs="24">
            <vc-input-group required prop="role" :label="tl('BizInfo', $t('role'))">
              <vc-input v-model="biz.role" />
            </vc-input-group>
          </vc-col>
        </vc-row>

      </el-form>
    </template>
    <template #acttion>
      <vc-button v-if="props.type != POPUP_TYPE.VIEW" type="primary" class="ml-2" code="F00004" @click="onSave(bizForm)"
        :loading="isLoading" :icon="'FolderChecked'">
        {{ tl("Common", "BtnSave") }}
      </vc-button>
    </template>
  </vc-modal>
</template>

<script setup lang="ts">
import tl from "@/utils/locallize";
import validate from "@/utils/validate_elp";
import { POPUP_TYPE } from "@/commons/const";
import { reactive, ref } from "vue";
import { useCvInfoStore } from '@master/stores/cv-info.store'
import type { FormInstance } from "element-plus";

const modal = ref<any>(null);
const bizForm = ref<FormInstance>();
const isLoading = ref(false);
const _index = ref(-1);
const props = defineProps<{
  type: POPUP_TYPE;
}>();

const emits = defineEmits(['submit']);

const biz = reactive({
  id: null,
  prj_name: null,
  prj_content: null,
  period: 1,
  system_analysis: null,
  overview_design: null,
  basic_design: null,
  functional_design: null,
  detailed_design: null,
  coding: null,
  unit_test: null,
  operation: null,
  os_db: null,
  language: null,
  role: null,
})

const rules = reactive({
  prj_name: [
    { label: tl("BizInfo", "Project"), required: true, validator: validate.required, trigger: ["blur"] },
  ],
  role: [
    { label: tl("BizInfo", "Role"), required: true, validator: validate.required, trigger: ["blur"] },
  ],
});

const open = async (item: any, index: number) => {
  _index.value = index
  
  if (item == null) {
    let bizInfo = {
      id: "00000000-0000-0000-0000-000000000000",
      prj_name: null,
      prj_content: null,
      period: 1,
      system_analysis: false,
      overview_design: false,
      basic_design: false,
      functional_design: false,
      detailed_design: false,
      coding: false,
      unit_test: false,
      operation: false,
      os_db: null,
      language: null,
      role: null,
    }

    Object.assign(biz, bizInfo)
  } else {
    Object.assign(biz, item)
  }

  modal.value.open();
};

const onSave = async (formEl: FormInstance | undefined) => {

  if (!formEl) return;

  formEl.validate((valid) => {
    if (!valid) return;
    
    emits('submit', biz, _index.value);

    modal.value.close()
  });

};

const close = () => {

  let bizInfo = {
    id: null,
    prj_name: null,
    prj_content: null,
    period: true,
    system_analysis: false,
    overview_design: false,
    basic_design: false,
    functional_design: false,
    detailed_design: false,
    coding: false,
    unit_test: false,
    operation: false,
    os_db: null,
    language: null,
    role: null,
  }

  Object.assign(biz, bizInfo)

  if (bizForm.value) {
    bizForm.value.resetFields()
  }
  modal.value.close()
}

defineExpose({
  open,
  close,
});

</script>

<style>
.custom-header-card {
  padding-left: 10px;
  padding-right: 10px;
}

.full-width {
  width: 100%;
}

.full-height {
  height: 100%;
}

.center-item {
  display: flex;
  justify-content: center;
}

.bold-item {
  font-weight: bold;
}

.vertical-item {
  display: flex;
  gap: 5px;
  /* Adjust gap as needed */
}

.no-pading-right {
  padding-right: 0px !important
}

.no-pading {
  padding: 0px !important
}

.no-pading-left {
  padding-left: 0px !important
}

.border {
  border: 1px solid #b9bcc1
}

.no-min-height .el-select__wrapper {
  min-height: 0 !important
}

.full-height-select .el-select__wrapper {
  height: 100%;
}

.display-flex {
  display: flex !important
}

.no-margin-left {
  margin-left: 0 !important
}

.checkbox-width {
  width: 170px;
}
</style>