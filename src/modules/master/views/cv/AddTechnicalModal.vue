<template>
  <vc-modal
    ref="modal"
    :title="tl('Technology/Experience', $t('AddTechnical'))"
    width="40%"
    @close="close"
  >
    <template #content>
      <el-form
        ref="form"
        :rules="rules"
        :model="technical"
        label-width="200px"
        label-position="top"
        require-asterisk-position="right"
        @submit.prevent="() => {}"
      >
        <vc-row :gutter="10">
          <vc-col :lg="24" :md="24" :sm="24" :xs="24">
            <vc-input-group
              required
              prop="tech_cat_name"
              :label="tl('Technology/Experience', $t('Technical'))"
            >
              <vc-input v-model="technical.name" />
            </vc-input-group>
          </vc-col>
        </vc-row>
      </el-form>
    </template>
    <template #acttion>
      <vc-button
        type="primary"
        class="ml-2"
        code="F00004"
        @click="onSave(form)"
        :loading="isLoading"
        :icon="'FolderChecked'"
      >
        {{ tl('Common', 'BtnSave') }}
      </vc-button>
    </template>
  </vc-modal>
</template>

<script setup lang="ts">
  import tl from '@/utils/locallize'
  import validate from '@/utils/validate_elp'
  import { reactive, ref } from 'vue'
  import { useCvInfoStore } from '@master/stores/cv-info.store'
  import type { FormInstance } from 'element-plus'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const modal = ref<any>(null)
  const form = ref<FormInstance>()
  const isLoading = ref(false)

  const emits = defineEmits(['submit'])

  const technical = reactive({
    technicalCategoryId: null,
    name: null,
  })

  const rules = reactive({
    name: [
      {
        label: tl('Technology/Experience', t('technical')),
        required: true,
        validator: validate.required,
        trigger: ['change'],
      },
    ],
  })

  const open = async (technicalCategoryId: string) => {
    Object.assign(technical, {
      technicalCategoryId: technicalCategoryId,
      name: null,
    })

    modal.value.open()
  }

  const onSave = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.validate((valid) => {
      if (!valid) return

      emits('submit', technical)

      modal.value.close()
    })
  }

  const close = () => {
    Object.assign(technical, {
      technicalCategoryId: null,
      name: null,
    })

    if (form.value) {
      form.value.resetFields()
    }
    modal.value.close()
  }

  defineExpose({
    open,
    close,
  })
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
    padding-right: 0px !important;
  }

  .no-pading {
    padding: 0px !important;
  }

  .no-pading-left {
    padding-left: 0px !important;
  }

  .border {
    border: 1px solid #b9bcc1;
  }

  .no-min-height .el-select__wrapper {
    min-height: 0 !important;
  }

  .full-height-select .el-select__wrapper {
    height: 100%;
  }

  .display-flex {
    display: flex !important;
  }

  .no-margin-left {
    margin-left: 0 !important;
  }

  .checkbox-width {
    width: 170px;
  }
</style>
