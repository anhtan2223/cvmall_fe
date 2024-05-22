import apiClient from '@/utils/httpClient'
import type { APIResponse } from '@/interfaces/response.interface'
import { useToastStore } from '@/stores/toast.store'
import fileService from '@/utils/file'
import { API } from '@/commons/config/cv-info.config'

const cvInfoService = {
  async getList(params? : unknown) : Promise<APIResponse<any[]>>{
    return await apiClient.get(API.LIST, {
      params: params,
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

export default cvInfoService