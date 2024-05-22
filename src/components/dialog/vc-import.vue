<template>
  <vc-modal ref="importDialog" :title="tl(FUNC_NAME, 'ImportTitle')" width="50%" @close="close" :hiddenScreen="true">
    <template #content>
      <vc-row :gutter="20">
        <vc-col :lg="24" :md="24" :sm="24" :xs="24">
          <vc-input-group required prop="file" :label="tl('Import', 'File')">
            <el-upload v-model:file-list="dataValiable.fileList" class="upload-import-excel" :auto-upload="false"
              :on-change="store.fileHandleChange" :on-remove="store.fileHandleRemove" :limit="1" :multiple="false"
              :show-file-list="false" ref="uploadRef">
              <el-input readonly :value="dataValiable.fileName">
                <template #append>
                  <vc-button :icon="'FolderOpened'" />
                </template>
              </el-input>
              <template #tip>
                <div class="el-upload__tip">
                  {{
                    tl(FUNC_NAME, 'Note_Upload', [
                      constEnum.extensionsFileUpload.join(', '),
                      constEnum.maxSize + 'MB',
                    ])
                  }}
                </div>
              </template>
            </el-upload>
          </vc-input-group>
        </vc-col>
      </vc-row>
    </template>

    <template #acttion>
      <vc-button class="ml-2" type="danger" v-if="isBreak" @click="store.onImport(urlImport, isErrors, onSuccess)"
        :loading="isLoading" :icon="'Download'">
        {{ tl(FUNC_NAME, 'BtnDownloadFileError') }}
      </vc-button>

      <vc-button class="ml-2" :loading="isLoading" :icon="'Download'" @click="store.onDownloadTemplate(template)">
        {{ tl(FUNC_NAME, 'BtnDownloadTemplate') }}
      </vc-button>

      <vc-button type="primary" class="ml-2" @click="store.onImport(urlImport, isDownload, onSuccess)"
        :loading="isLoading" :icon="'Upload'">
        {{ tl(FUNC_NAME, 'BtnImport') }}
      </vc-button>
    </template>
    <vc-confirm ref="confirmDialog"></vc-confirm>
  </vc-modal>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import tl from '@/utils/locallize'
import { storeToRefs } from 'pinia'
import { useImportStore } from '@/stores/import.store'
const FUNC_NAME = 'Common'

const isLoading = ref(false)
const confirmDialog = ref<any>(null)
const store = useImportStore()
const { isBreak, dataValiable, constEnum, importDialog, uploadRef } = storeToRefs(store)

const isDownload = ref({ isBreak: false })
const isErrors = ref({ isBreak: true })

const props = defineProps<{
  template?: {
    exportUrl?: string
    importUrl?: string
    fileName?: string
  }
  urlImport: string
  onSuccess: any,
}>()

const { template, urlImport, onSuccess } = toRefs(props)
const open = () => {
  store.open()
}
const close = () => {
  store.close()
}
defineExpose({
  open,
  close,
})
</script>
<style lang="scss" scoped>
.upload-import-excel {
  width: 100%;
}

.color-red {
  color: red;
}
</style>
<style>
.upload-import-excel .el-upload {
  width: 100%;
}
</style>
