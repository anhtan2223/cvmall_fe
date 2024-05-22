import { defineStore } from 'pinia'
import technicalService from '@master/services/technical.service'

export const useTechnicalStore = defineStore('useTechnicalStore', {
  state: () => ({
    techDataGrid: <any>[],
    techFormData: <any>{},
    techGoSort: <any>[],
    techSearch: <any>[],
    techPageConfig: <any>[],
    techLoading: <any>[],
  }),
  getters: {
    getData(state) {
      return state.techDataGrid
    },
  },
  actions: {
    async getList() {
      this.techLoading = true
      await technicalService
        .getList({
          is_actived: true,
        })
        .then((data) => {
          this.techDataGrid = data.data ?? []
        })
        .finally(() => {
          this.techLoading = false
        })
    }, 
  }
})