import { defineStore } from 'pinia'
import userService from '@master/services/user.service'

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    dataGrid: <any>[],
    formData: <any>{},
    goSort: <any>[],
    search: <any>[],
    pageConfig: <any>[],
    loading: <any>[],
  }),
  getters: {
    getData(state) {
      return state.dataGrid
    },
  },
  actions: {
    async getList() {
      this.loading = true
      await userService
        .getList({
          sort: this.goSort,
          is_actived: true,
          search: this.search,
          ...this.pageConfig,
        })
        .then((data) => {
          this.dataGrid = data.data ?? []
          this.pageConfig.total = data.total
        })
        .finally(() => {
          this.loading = false
        })
    },

    async delete(data: any) {
      await userService.delete(data.id).then(() => {
        this.getList()
      })
    },

    async getByKey(key: any) {
      this.loading = true
      await userService
        .detail(key)
        .then((data) => {
          this.formData = data.data ?? {}
        })
        .finally(() => {
          this.loading = false
        })
    },

    async export() {
      this.loading = true
      await userService
        .export({
          sort: this.goSort,
          is_actived: true,
          search: this.search,
          ...this.pageConfig,
          size: 1000000,
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
