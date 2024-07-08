import { BRANCH } from './../../../commons/const';
import apiClient from '@/utils/httpClient'
import type { APIResponse } from '@/interfaces/response.interface'
import { useToastStore } from '@/stores/toast.store'
import { API } from '@/commons/config/employee.config'
import qs from 'qs'

const employeeService = {
  async getList(params?: unknown): Promise<APIResponse<any[]>> {
    return await apiClient.get(API.LIST, {
      params: params,
      paramsSerializer: params => qs.stringify(params, { indices: false })
    })
  },
  async getGroups(): Promise<APIResponse<any[]>> {
    return await apiClient.get(API.GROUPS)
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
}

export default employeeService
