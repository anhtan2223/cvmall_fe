import apiClient from '@/utils/httpClient'
import type { APIResponse } from '@/interfaces/response.interface'
import { useToastStore } from '@/stores/toast.store'
import fileService from '@/utils/file'
import { API } from '@/commons/config/user.config'

const userService = {
  async getList(params?: unknown): Promise<APIResponse<any[]>> {
    return await apiClient.get(API.LIST, {
      params: params,
    })
  },

  async detail(id: string): Promise<APIResponse<any>> {
    return await apiClient.get(API.DETAIL(id))
  },

  async export(params?: unknown) {
    return await apiClient
      .get(API.EXPORT, {
        params: params,
        responseType: 'blob',
      })
      .then((response: any) => {
        fileService.resolveAndDownloadBlob(response, `Danhsachguoidung.xlsx`);
      })
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

  async deleteMulti(ids: string[]) {
    const toastStore = useToastStore()
    return await apiClient
      .delete(API.DELETE_MULTI, { data: ids })
      .then((response: any) => {
        toastStore.fromApiResponse(response)
        return response
      })
  },
}

export default userService
