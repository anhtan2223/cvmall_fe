import apiClient from '@/utils/httpClient'
import type { APIResponse } from '@/interfaces/response.interface'
import { useToastStore } from '@/stores/toast.store'
import fileService from '@/utils/file'
import { API } from '@/commons/config/cv.config'

const cvInfoService = {
  async getList(params? : unknown) : Promise<APIResponse<any[]>>{
    return await apiClient.get(API.LIST, {
      params: params,
    })
  },

  async detail(id: string): Promise<APIResponse<any>> {
    return await apiClient.get(API.DETAIL(id))
  },

  async create(data: any) {
    const toastStore = useToastStore()
    return await apiClient
      .post(API.CREATE, data)
      .then((response: any) => {
        toastStore.fromApiResponse(response)
        return response
      })
  },

  async update(data: any) {
    const toastStore = useToastStore()
    return await apiClient
      .put(API.UPDATE(data.id || ''), data)
      .then((response: any) => {
        toastStore.fromApiResponse(response)
        return response
      })
  },

  async delete(id: string) {
    const toastStore = useToastStore()
    return await apiClient
      .delete(API.DELETE(id))
      .then((response: any) => {
        toastStore.fromApiResponse(response)
        return response
      })
  },
  async exportAll() {
    return await apiClient
      .get(API.EXPORT_ALL(), {
        responseType: 'blob',
      })
      .then((response: any) => {
        fileService.resolveAndDownloadBlob(response, `All_CVs.zip`)
      })
  },

  async exportDetail(data: any) {
    return await apiClient
      .get(API.EXPORT_DETAIL(data.id), {
        responseType: 'blob',
      })
      .then((response: any) => {
        fileService.resolveAndDownloadBlob(response, `CV_${data.name}.zip`)
      })
  },

  async exportTemplate() {
    return await apiClient
      .get(API.EXPORT_TEMPLATE(), {
        responseType: 'blob',
      })
      .then((response: any) => {
        fileService.resolveAndDownloadBlob(response, `CV_templates.zip`)
      })
  },
}

export default cvInfoService