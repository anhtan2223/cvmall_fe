import apiClient from '@/utils/httpClient'
import type { APIResponse } from '@/interfaces/response.interface'
import { useToastStore } from '@/stores/toast.store'

import { API } from '@/commons/config/role.config'
import BaseService from './_base.service'

class Service extends BaseService {}
const serviceApi = new Service(API)
export default serviceApi