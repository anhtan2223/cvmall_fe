import { defineStore } from 'pinia'
import cvInfoService from '@master/services/cv-info.service'

export const useCvInfoStore = defineStore('useCvInfoStore', {
  state: () => ({
    cvDataGrid: <any>[],
    cvFormData: <any>{},
    cvGoSort: <any>[],
    cvSearch: <any>[],
    cvPageConfig: <any>[],
    cvLoading: <any>[],
  }),
  getters: {
    getData(state) {
      return state.cvDataGrid
    },
  },
  actions: {
    async getList() {
      this.cvLoading = true
      await cvInfoService
        .getList({
          sort: this.cvGoSort,
          is_actived: true,
          search: this.cvSearch,
          ...this.cvPageConfig,
        })
        .then((data) => {
          this.cvDataGrid = data.data ?? []
          this.cvPageConfig.total = data.total
        })
        .finally(() => {
          this.cvLoading = false
        })
    }, 

    async delete(data: any) {
      await cvInfoService.delete(data.id).then(() => {
        this.getList()
      })
    },

    async exportAll() {
      await cvInfoService.exportAll();
    },

    async exportTemplate() {
      await cvInfoService.exportTemplate();
    },

    async exportDetail(data: any) {
      await cvInfoService.exportDetail(data);
    }
  }
})