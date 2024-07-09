import apiClient from '@/utils/httpClient'
import type { APIResponse } from '@/interfaces/response.interface'
import { useToastStore } from '@/stores/toast.store'
import fileService from '@/utils/file'
import { API } from '@/commons/config/timesheet.config'
import qs from 'qs'

const timesheetService = {
  async getList(params?: unknown): Promise<APIResponse<any[]>> {
    return await apiClient.get(API.LIST, {
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  },

  async detail(id: string): Promise<APIResponse<any>> {
    return await apiClient.get(API.DETAIL(id))
  },

  async create(data: any) {
    const toastStore = useToastStore()
    return await apiClient.post(API.CREATE, data).then((response: any) => {
      toastStore.fromApiResponse(response)
      return response
    })
  },

  async updateMulti(data: any[]) {
    const toastStore = useToastStore()
    return await apiClient
      .put(API.UPDATE_MULTI, data)
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
    return await apiClient.delete(API.DELETE(id)).then((response: any) => {
      toastStore.fromApiResponse(response)
      return response
    })
  },
  async exportAllExcel(params?: object) {
    return await apiClient
      .get(API.EXPORT_ALL_EXCEL_BY_MONTH_YEAR, {
        responseType: 'blob',
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      })
      .then((response: any) => {
        const month = (params as {month: number})?.["month"] || new Date().getMonth() + 1;
        const year = (params as {year: number})?.["year"] || new Date().getFullYear();
        fileService.resolveAndDownloadBlob(response, `timesheet_${month}_${year}.xlsx`);
      })
  },
}

export default timesheetService
