import apiClient from '@/utils/httpClient'
import type { APIResponse } from '@/interfaces/response.interface'
import { useToastStore } from '@/stores/toast.store'
import { API } from '@/commons/config/master.config'
import BaseService from './_base.service'

class Service extends BaseService {
  async getByType(type: string): Promise<APIResponse<any>> {
    return await apiClient.get(this.API.GET_BY_TYPE, {
      params: { type: type, page: 1, size: 1000 },
    })
  }
}

const serviceApi = new Service(API)
export default serviceApi

