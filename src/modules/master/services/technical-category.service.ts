import apiClient from '@/utils/httpClient'
import type { APIResponse } from '@/interfaces/response.interface'
import { useToastStore } from '@/stores/toast.store'
import fileService from '@/utils/file'
import { API } from '@/commons/config/technical-category.config'

const technicalCategoryService = {
  async getList(params? : unknown) : Promise<APIResponse<any[]>>{
    return await apiClient.get(API.LIST, {
      params: params,
    })
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

export default technicalCategoryService