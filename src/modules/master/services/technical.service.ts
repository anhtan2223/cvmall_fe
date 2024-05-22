import apiClient from '@/utils/httpClient'
import type { APIResponse } from '@/interfaces/response.interface'
import { useToastStore } from '@/stores/toast.store'
import fileService from '@/utils/file'
import { API } from '@/commons/config/technical.config'

const technicalService = {
  async getList(params? : unknown) : Promise<APIResponse<any[]>>{
    return await apiClient.get(API.LIST, {
      params: params,
    })
  }
}

export default technicalService