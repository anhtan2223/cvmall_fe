import { defineStore } from 'pinia'
import timesheetService from '@master/services/timesheet.service'

export const useTimesheetStore = defineStore('useTimesheetStore', {
  state: () => ({
    timesheetGridData: <any>[],
    timesheetFormData: <any>{},
    timesheetGoSort: <any>[],
    timesheetMonthYear: new Date(),
    timesheetSearch: <any>[],
    timesheetPageConfig: <any>[],
    timesheetLoading: <any>[],
    timesheetFilters: {
      branch: [],
      group: [],
      state: [],
    },
  }),
  getters: {
    getData(state) {
      return state.timesheetGridData
    },
    timesheets(state) {
      return state.timesheetGridData
    },
    timesheetMonthYearIsCurrentMonth: (state) => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return (
        state.timesheetMonthYear.getMonth() === currentMonth &&
        state.timesheetMonthYear.getFullYear() === currentYear
      );
    },
  },
  actions: {
    async getList() {
      this.timesheetLoading = true
      await timesheetService
        .getList({
          sort: this.timesheetGoSort,
          is_actived: true,
          search: this.timesheetSearch,
          month: this.timesheetMonthYear.getMonth() + 1,
          year: this.timesheetMonthYear.getFullYear(),
          branchFilters: this.timesheetFilters.branch,
          groupFilters: this.timesheetFilters.group,
          stateFilters: this.timesheetFilters.state,
          ...this.timesheetPageConfig,
        })
        .then((data) => {
          this.timesheetGridData = data.data ?? []
          this.timesheetPageConfig.total = data.total
        })
        .finally(() => {
          this.timesheetLoading = false
        })
    },

    async delete(data: any) {
      await timesheetService.delete(data.id).then(() => {
        this.getList()
      })
    },

    async updateMulti(data: any[]) {
      await timesheetService.updateMulti(data).then(() => {
        this.getList()
      })
    },

    async update(data: any) {
      await timesheetService.update(data.id).then(() => {
        this.getList()
      })
    },

    async exportAllExcelByMonthYear() {
      await timesheetService.exportAllExcelByMonthYear(
        this.timesheetMonthYear.getMonth() + 1,
        this.timesheetMonthYear.getFullYear()
      )
    },
  },
})
