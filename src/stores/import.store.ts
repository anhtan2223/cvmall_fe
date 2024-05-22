import { defineStore } from 'pinia'
import tl from '@/utils/locallize'
import type { UploadUserFile, UploadInstance } from 'element-plus'
import fileService from '@/utils/file'
import apiClient from '@/utils/httpClient'
import { useToastStore } from '@/stores/toast.store'
import { ResponseCode } from '@/commons/const'

export const useImportStore = defineStore('useImportStore', {
  state: () => ({
    files: <File[]>[],
    mode: null,
    isBreak: <any>false,
    previousUploadFiles: <any>null,
    error: <any[]>[],
    importDialog: <any>null,
    uploadRef: <any>null,
    dataValiable: {
      fileName: <string>'',
      messages: <string>'',
      haveError: false,
      fileList: <UploadUserFile[]>[],
      uploadRef: <any>{},
      file: <any>null,
    },
    constEnum: {
      extensionsFileUpload: ['.xls', '.xlsx'],
      maxSize: 5, // đơn vị MB
    },
  }),
  getters: {
    getItems(state) {
      return state.files
    },
  },
  actions: {
    open() {
      this.importDialog.open()
    },
    close() {
      this.clearFiles()
      this.importDialog.close()
    },
    clearFiles() {
      this.dataValiable.fileName = ''
      this.dataValiable.file = null
      this.dataValiable.messages = ''
      this.dataValiable.haveError = false
      this.isBreak = false
      this.uploadRef.clearFiles()
    },
    onDownloadTemplate(template: any) {
      apiClient
        .get(template.exportUrl, {
          responseType: 'blob',
        })
        .then((response: any) => {
          if (!response.code && !response.message) {
            fileService.resolveAndDownloadBlob(response, template.fileName)
          }
        })
    },
    onImport(url: string, params: any, onSuccess: any) {
      const toastStore = useToastStore()
      const configResponse = params.isBreak ? { responseType: 'blob' } as any : {}
      if (!this.dataValiable.haveError && this.dataValiable.file) {
        const _file: any = this.dataValiable.file
        const fromData = new FormData()
        fromData.append('file', _file.raw)
        apiClient.post(url, fromData, { params: params, ...configResponse }).then((response: any) => {

          if (response.code == ResponseCode.SystemError) {
            this.isBreak = true
          }

          if (response.code != ResponseCode.Success) {
            // let _index = response.message.indexOf('<br>')
            if (params.isBreak == false) {
              toastStore.push({
                message: response.message,
                type: 'error',
              })
            }

            this.dataValiable.messages = response.message
          } else {
            toastStore.fromApiResponse(response)
            onSuccess()
            this.close()
          }

          if (params.isBreak) {
            fileService.resolveAndDownloadBlob(response, this.dataValiable.fileName)
          }
        })
      } else {
        toastStore.push({
          message: tl('Common', 'E_FileRequired'),
          type: 'error',
        })
      }
    },
    fileHandleChange(uploadFile: any, uploadFiles: any) {
      const isChanged = uploadFiles[0].name !== this.previousUploadFiles;
      this.previousUploadFiles = uploadFiles[0].name;
      if (isChanged) {
        this.isBreak = false;
      }

      this.generateMessage(uploadFile, uploadFiles)
    },
    fileHandleRemove(uploadFile: any, uploadFiles: any) {
      this.generateMessage(uploadFile, uploadFiles)
    },
    generateMessage(uploadFile: any, uploadFiles: any) {
      if (!uploadFiles.length) {
        this.dataValiable.fileName = ''
        this.dataValiable.file = null
        this.dataValiable.messages = ''
        return
      }
      this.dataValiable.haveError = false
      this.uploadRef.clearFiles()
      this.dataValiable.fileName = uploadFiles[0].name
      const _errors = []
      if (uploadFiles[0].size > this.constEnum.maxSize * 1024 * 1024) {
        this.dataValiable.haveError = true
        _errors.push({
          message: tl('FileUpload', 'E_FileSizeLength', [
            this.constEnum.maxSize + 'MB',
          ]),
        })
      }

      // Error Extension
      const extensionFileCurrent =
        '.' + this.dataValiable.fileName.split('.').pop()
      if (
        this.constEnum.extensionsFileUpload.indexOf(extensionFileCurrent) == -1
      ) {
        this.dataValiable.haveError = true
        _errors.push({
          message: tl('FileUpload', 'E_Extension', [
            this.constEnum.extensionsFileUpload.join(', '),
          ]),
        })
      }
      this.dataValiable.messages = _errors
        .map((x: any) => x.message)
        .join('<br>')
      this.dataValiable.file = uploadFiles[0]
    },
  },
})
