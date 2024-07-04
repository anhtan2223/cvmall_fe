<template>
  <div class="vc-page page-timesheet">
    <vc-row class="mt-4 mb-4">
      <vc-col :span="8" class="d-flex">
        <vc-input v-model="timesheetSearch" hide-details="true" :prefix-icon="'Search'" @on:keyup.enter="search"></vc-input>
        <vc-button class="ml-2" @click="search" :icon="'Search'" :loading="isLoading">
          {{ tl("Common", "BtnSearch") }}
        </vc-button>
        <vc-button class="ml-2" @click="reloadTable" :icon="'Refresh'" :loading="isLoading">
          {{ tl("Common", "") }}
        </vc-button>
      </vc-col>
      <vc-col :span="4" class="d-flex">
        <el-date-picker
          v-model="timesheetMonthYear"
          @change="onDateChanged"
          type="month"
          placeholder="Chọn Tháng" 
          class="ml-2"
        />
      </vc-col>
      <vc-col :md="12" class="d-flex flex-end">
        <vc-button class="ml-2" @click="onExport" type="primary" :icon="'FolderChecked'" :loading="isExportAllTimeSheetsLoading">
          {{ tl("Common", "BtnSave") }}
        </vc-button>
        <vc-button class="ml-2" @click="onExport" type="success" :icon="'Download'" :loading="isExportAllTimeSheetsLoading">
          {{ tl("Common", "BtnExportExcel") }}
        </vc-button>
      </vc-col>
    </vc-row>
    <vc-row>
      <vc-col :span="24">
        <vc-table :datas="dataGrid" :tableConfig="tableConfig" :colConfigs="timesheetColConfig" :page="timesheetPageConfig"
          :loading="isTableLoading" :total="timesheetPageConfig.total||0" @pageChanged="onPageChanged" @sizeChanged="onSizeChanged" @sorted="onSortChange" @filterChanged="onFilterChanged">
          <template #group="{ data }">
            <vc-select  
            v-model="data.group" 
            placeholder="Please input"
            fieldValue="id"
            fieldText="full_name"
            :items="teamLeadEmployees"/>
          </template>
          <template #state="{ data }">
            <el-tag v-if="data.state" size="small">{{ tl("Common", ([
              'Đang làm việc',
              'Đang thử việc',
              'Đang thực tập',
              'Đã nghỉ việc ',
            ])[data.state] )}}</el-tag>
          </template>
          <template #project_participation_hours="{ data }">
            <vc-input v-model="data.project_participation_hours" type="number" placeholder="Please input" />
          </template>
          <template #consumed_hours="{ data }">
            <vc-input v-model="data.consumed_hours" type="number" placeholder="Please input" />
          </template>
          <template #late_early_departure="{ data }">
            <vc-input v-model="data.late_early_departure" type="number" placeholder="Please input" />
          </template>
          <template #absence_hours="{ data }">
            <vc-input v-model="data.absence_hours" type="number" placeholder="Please input" />
          </template>
        </vc-table>
      </vc-col>
    </vc-row>
    <!-- <vc-confirm ref="confirmDialog"></vc-confirm> -->
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import tl from '@/utils/locallize'
  import {
    colConfig,
    tableConfig,
    FUNC_NAME,
  } from '@/commons/config/timesheet.config'
  import { useTechnicalStore } from '@master/stores/technical.store'
  import { useTechnicalCategoryStore } from '@master/stores/technical-category.store'
  import { useTimesheetStore } from '@master/stores/timesheet.store'
  import { useRouter } from 'vue-router'
  import { useEmployeeStore } from '@master/stores/employee.store'

  const timesheetStore = useTimesheetStore()
  const {
    timesheets,
    timesheetSearch,
    timesheetGoSort,
    timesheetPageConfig,
    timesheetMonthYear,
    timesheetFilters,
  } = storeToRefs(timesheetStore)
  // const confirmDialog = ref<any>(null);
  const router = useRouter()
  const employeeStore = useEmployeeStore()
  const { employees, teamLeadEmployees, branchs } = storeToRefs(employeeStore)
  const isLoading = ref<boolean>(false)
  const isExportAllTimeSheetsLoading = ref<boolean>(false)
  const isTableLoading = ref<boolean>(false)
  const dataGrid = ref<any[]>([])

  const timesheetColConfig = ref<any[]>([])

  onBeforeMount(async () => {
    isLoading.value = true
    isTableLoading.value = true
    isExportAllTimeSheetsLoading.value = true
    timesheetGoSort.value = ''
    await getAndMapFilterData()
    await fetchData()
    mapGridData()
    isLoading.value = false
    isTableLoading.value = false
    isExportAllTimeSheetsLoading.value = false
  })

  const onDateChanged = async (paginate: any) => {
    isTableLoading.value = true 
    await fetchData()
    mapGridData()
    isTableLoading.value = false
  }

  const onFilterChanged = async (filter: any) => {
    isTableLoading.value = true
    timesheetFilters.value = {
      ...timesheetFilters.value,
      ...filter,
    }
    await fetchData()
    mapGridData()
    isTableLoading.value = false
  }

  const onPageChanged = async (paginate: any) => {
    isTableLoading.value = true
    timesheetPageConfig.value.page = paginate.page
    timesheetPageConfig.value.size = paginate.size
    await fetchData()
    mapGridData()
    isTableLoading.value = false
  }

  const onSizeChanged = async (size: number) => {
    isTableLoading.value = true
    timesheetPageConfig.value.size = size
    timesheetPageConfig.value.page = 1
    await fetchData()
    mapGridData()
    //console.log(timesheetPageConfig);
    isTableLoading.value = false
  }

  const onUpdate = (data) => {
    timesheetStore.update(data)
  }

  const onExport = async () => {
    isExportAllTimeSheetsLoading.value = true
    await timesheetStore.exportAllExcelByMonthYear()
    isExportAllTimeSheetsLoading.value = false
  }

  // const onExportDetail = async (item: any) => {
  //   await timesheetStore.exportDetail(item)
  // }

  // const onExportTemplate = async () => {
  //   await timesheetStore.exportTemplate()
  // }
  // const onSuccess = async () => { };

  // const onEdit = (item: any) => {
  //   router.push({
  //     name: "TimesheetEditById",
  //     params: { id: item.id },
  //   });
  // };

  // const onDeleteItem = (item: any) => {
  //   confirmDialog.value.confirm(
  //     tl("Common", "Delete"),
  //     tl("Common", "ConfirmDelete", [item.id]),
  //     async (res: any) => {
  //       if (res) {
  //         await timesheetStore.delete(item);
  //         search();
  //       }
  //     }
  //   );
  // };

  const onSortChange = async (sort: any, config: any) => {
    isTableLoading.value = true
    timesheetGoSort.value = sort
    await fetchData()
    mapGridData()
    isTableLoading.value = false
  }

  const fetchData = async () => {
    timesheets.value = []
    await timesheetStore.getList()
    // await employeeStore.getEmployeesList()
  }

  const search = async () => {
    isTableLoading.value = true
    timesheetPageConfig.value.page = 1
    timesheetGoSort.value = ''
    await fetchData()
    mapGridData()
    isTableLoading.value = false
  }

  const mapGridData = () => {
    dataGrid.value = timesheets.value.map(t => ({
      ...t,
      ...t.employee,
      })
    )
  }

  const getAndMapFilterData = async () => {
    await employeeStore.getTeamLeadEmployeesList()
    await employeeStore.getBranchsList()

    timesheetColConfig.value = [...colConfig]

    const groupCol = timesheetColConfig.value.find((col) => col.key === 'group')
    if (groupCol) {
      groupCol.filters = teamLeadEmployees.value.map((item) => {
        return {
          value: item.id,
          text: item.full_name,
        }
      })
    }
    const stateCol = timesheetColConfig.value.find((col) => col.key === 'state')
    if (stateCol) {
      stateCol.filters = [
        { text: 'Đang làm việc', value: 0 },
        { text: 'Đang thử việc', value: 1 },
        { text: 'Đang thực tập', value: 2 },
        { text: 'Đã nghỉ việc ', value: 3 },
      ]
    }
    const branch = timesheetColConfig.value.find((col) => col.key === 'branch')
    if (branch) {
      branch.filters = branchs.value.map((item) => {
        return {
          value: item,
          text: item,
        }
      })
    }
  }

  const cleanData = () => {
    dataGrid.value = []
  }

  const reloadTable = async () => {
    timesheetSearch.value = ''
    await search()
  }
</script>

<style lang="scss">
  .box-search {
    background-color: #fff;
    padding: 12px;
  }

  .no-style {
    border: none;
    background-color: transparent;
    outline: none;
  }
</style>
