import apiClient from '@/utils/httpClient'
import type { APIResponse } from '@/interfaces/response.interface'
import { useToastStore } from '@/stores/toast.store'
import { API } from '@/commons/config/department.config'

const departmentService = {
  async getList(params?: unknown): Promise<any[]> {
    return await apiClient.get(API.LIST, {
      params: params,
    })
  },

  async create(data: any) {
    const toastStore = useToastStore()
    return await apiClient.post(API.CREATE, data).then((response: any) => {
      toastStore.fromApiResponse(response)
      return response
    })
  },
}

export default departmentService
