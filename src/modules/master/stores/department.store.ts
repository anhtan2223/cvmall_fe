import { defineStore } from 'pinia'
import departmentService from '@master/services/department.service'

export const useDepartmentStore = defineStore('useDepartmentStore', {
  state: () => ({
    departmentData: <any>[],
    departmentLoading: <any>[],
  }),
  getters: {
    getData(state) {
      return state.departmentData
    },
  },
  actions: {
    async getList() {
      this.departmentLoading = true
      await departmentService
        .getList()
        .then((data) => {
          this.departmentData = data ?? []
        })
        .finally(() => {
          this.departmentLoading = false
        })
    }, 
    async create(data: any) {
      await departmentService.create(data).then(async () => {
        await this.getList()
      })
    },
  }
})