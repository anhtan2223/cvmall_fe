import { defineStore } from 'pinia'
import employeeService from '@master/services/employee.service'

export const useEmployeeStore = defineStore('useEmployeeStore', {
  state: () => ({
    employeeDataGrid: <any>[],
    employeeFormData: <any>{},
    employeeGoSort: <any>[],
    employeeSearch: <any>[],
    employeePageConfig: <any>[],
    employeeLoading: <any>[],
    employeeFilters: <any>[],
    employeeGroup: <any>[],
  }),
  getters: {
    getData(state) {
      return state.employeeDataGrid
    },
    getGroupsData(state) {
      return state.employeeGroup
    },
    employees(state) {
      return state.employeeDataGrid
    },
    groups(state) {
      return state.employeeGroup
    },
  },
  actions: {
    async getList() {
      this.employeeLoading = true
      await employeeService
        .getList({
          sort: this.employeeGoSort,
          is_actived: true,
          search: this.employeeSearch,
          ...this.employeePageConfig,
          ...this.employeeFilters,
        })
        .then((data) => {
          this.employeeDataGrid = data.data ?? []
          this.employeePageConfig.total = data.total
        })
        .finally(() => {
          this.employeeLoading = false
        })
    }, 

    async getGroups() {
      await employeeService
        .getGroups()
        .then((data) => {
          this.employeeGroup = data ?? []
        })
    }, 

    async delete(data: any) {
      await employeeService.delete(data.id)
    },

    async create(data: any) {
      await employeeService.create(data).then(() => {
        this.getList()
      })
    },

    async update(data: any) {
      await employeeService.update(data).then(() => {
        this.getList()
      })
    },

    async export() {
      await employeeService.export()
    },

    async exportTemplate() {
      await employeeService.exportTemplate()
    },

    async checkCode(employee_code: string) {
      return await employeeService.checkCode(employee_code)
    }
  }
})
