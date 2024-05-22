import apiClient from '@/utils/httpClient'
import type { APIResponse } from '@/interfaces/response.interface'
import { useToastStore } from '@/stores/toast.store'
import { API } from '@/commons/config/resource.config'

const serviceApi = {
  async getList(params?: unknown): Promise<APIResponse<any>> {
    return await apiClient.get(API.LIST, {
      params: params,
    })
  },

  async getListScreen(params: any): Promise<APIResponse<any>> {
    return await apiClient.get(API.LIST_SCREEN, {
      params: params,
    })
  },

  async detail(id: string): Promise<APIResponse<any>> {
    return await apiClient.get(API.DETAIL(id))
  },

  async create(data: any) {
    return await apiClient
      .post(API.CREATE, data)
      .then((response) => {
        return response.data
      })
  },

  async update(data: any) {
    return await apiClient
      .put(API.UPDATE(data.id || ''), data)
      .then((response) => {
        return response.data
      })
  },

  async delete(id: string | string[]) {
    return await apiClient
      .delete(API.DELETE(id))
      .then((response) => {
        return response.data
      })
  },
}

export default serviceApi
