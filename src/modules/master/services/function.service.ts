import apiClient from '@/utils/httpClient'
import type { APIResponse } from '@/interfaces/response.interface'
import { useToastStore } from '@/stores/toast.store'
import { API } from '@/commons/config/function.config'
import BaseService from './_base.service'

class Service extends BaseService {
  async getTreeView(): Promise<APIResponse<any>> {
    return await apiClient.get(this.API.MENU)
  }
}

const serviceApi = new Service(API)
export default serviceApi
