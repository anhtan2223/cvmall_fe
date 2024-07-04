import { defineStore } from 'pinia'
import positionService from '@master/services/position.service'

export const usePositionStore = defineStore('usePositionStore', {
  state: () => ({
    positionData: <any>[],
    positionLoading: <any>[],
  }),
  getters: {
    getData(state) {
      return state.positionData
    },
  },
  actions: {
    async getList() {
      this.positionLoading = true
      await positionService
        .getList()
        .then((data) => {
          this.positionData = data ?? []
        })
        .finally(() => {
          this.positionLoading = false
        })
    }, 
  }
})