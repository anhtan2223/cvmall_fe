import { defineStore } from 'pinia'
import technicalCategoryService from '@master/services/technical-category.service'

export const useTechnicalCategoryStore = defineStore('useTechnicalCategoryStore', {
  state: () => ({
    techCatDataGrid: <any>[],
    techCatFormData: <any>{},
    techCatGoSort: <any>[],
    techCatSearch: <any>[],
    techCatPageConfig: <any>[],
    techCatLoading: <any>[],
  }),
  getters: {
    getData(state) {
      return state.techCatDataGrid
    },
  },
  actions: {
    async getList() {
      this.techCatLoading = true
      await technicalCategoryService
        .getList({
          is_actived: true,
        })
        .then((data) => {
          this.techCatDataGrid = data.data ?? []
        })
        .finally(() => {
          this.techCatLoading = false
        })
    }, 
  }
})