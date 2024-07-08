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
          :end="new Date()"
          :disabled-date="disabledDate"
          :clearable="false"
          type="month"
          placeholder="Chọn Tháng" 
          class="ml-2"
        />
      </vc-col>
      <vc-col :md="12" class="d-flex flex-end">
        <vc-button class="ml-2" @click="onSaveAll" type="primary" :icon="'FolderChecked'" :loading="isExportAllTimeSheetsLoading">
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
            :placeholder="timesheetMonthYearIsCurrentMonth ? data.current_group : ''"
            fieldValue="initial_name"
            fieldText="initial_name"
            :disabled="!timesheetMonthYearIsCurrentMonth"
            :items="groups"/>
          </template>
          <template #state="{ data }">
            <el-tag v-if="data.state != null" size="small"
              :type="[
                'success',
                'primary',
                'warning',
                'danger',
              ][data.state]"
            >
              {{ tl("Common", ([
                'Đang làm việc',
                'Đang thử việc',
                'Đang thực tập',
                'Đã nghỉ việc ',
              ])[data.state] )}}
            </el-tag>
          </template>
          <template #project_participation_hours="{ data }">
            <vc-input v-model="data.project_participation_hours" type="number" placeholder="" />
          </template>
          <template #consumed_hours="{ data }">
            <vc-input v-model="data.consumed_hours" type="number" placeholder="" />
          </template>
          <template #late_early_departures="{ data }">
            <vc-input v-model="data.late_early_departures" type="number" placeholder="" />
          </template>
          <template #absence_hours="{ data }">
            <vc-input v-model="data.absence_hours" type="number" placeholder="" />
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
  import { isNullOrEmpty } from '@/utils/string'
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
  import { BRANCH } from '@/commons/const'
  import { useToastStore } from '@/stores/toast.store'

  const timesheetStore = useTimesheetStore()
  const {
    timesheets,
    timesheetSearch,
    timesheetGoSort,
    timesheetPageConfig,
    timesheetMonthYear,
    timesheetMonthYearIsCurrentMonth,
    timesheetFilters,
  } = storeToRefs(timesheetStore)
  // const confirmDialog = ref<any>(null);
  const router = useRouter()
  const toastStore = useToastStore()
  const employeeStore = useEmployeeStore()
  const { employees, groups } = storeToRefs(employeeStore)
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

  // const onUpdate = (data) => {
  //   timesheetStore.update(data)
  // }

  const onSaveAll = async () => {

    if (checkValidate()) {
      return
    }

    isExportAllTimeSheetsLoading.value = true
    const monthYear = new Date(timesheetMonthYear.value)
    monthYear.setDate(15)

    const timesheets = dataGrid.value.map((item) => {
      if(isNullOrEmpty(item.group) && (
        !isNullOrEmpty(item.project_participation_hours) ||
        !isNullOrEmpty(item.consumed_hours) ||
        !isNullOrEmpty(item.late_early_departures) ||
        !isNullOrEmpty(item.absence_hours) 
      )) {
        item.group = item.current_group
      }

      return {
        id: item.id,
        employee_id: item.employee_id,
        group: item.group,
        project_participation_hours: Number(item.project_participation_hours),
        consumed_hours: Number(item.consumed_hours),
        late_early_departures: Number(item.late_early_departures),
        absence_hours: Number(item.absence_hours),
        month_year: monthYear,
      }
    })
    await timesheetStore.updateMulti(timesheets)
    await fetchData()
    mapGridData()
    isExportAllTimeSheetsLoading.value = false
  }

  const onExport = async () => {
    isExportAllTimeSheetsLoading.value = true
    await timesheetStore.exportAllExcelByMonthYear()
    isExportAllTimeSheetsLoading.value = false
  }

  const onSortChange = async (sort: any, config: any) => {
    isTableLoading.value = true
    console.log(timesheetGoSort.value)
    console.log(sort)
    timesheetGoSort.value = sort
    await fetchData()
    mapGridData()
    isTableLoading.value = false
  }

  const fetchData = async () => {
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
      ...t.employee,
      ...t,
      })
    )
  }

  const getAndMapFilterData = async () => {
    await employeeStore.getGroups()

    timesheetColConfig.value = [...colConfig]

    const groupCol = timesheetColConfig.value.find((col) => col.key === 'group')
    if (groupCol) {
      groupCol.filters = groups.value.map((item) => {
        return {
          value: item.initial_name,
          text: item.initial_name,
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
      branch.filters = Object.values(BRANCH).map((item) => {
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
    await fetchData()
    mapGridData()
  }

  const checkValidate = () => {
    let isValid = false

    if (dataGrid.value.some(t => {
      return t.group == null &&  t.current_group == null &&
        ((t.group != null && t.group != "") ||
        (t.project_participation_hours != null && t.project_participation_hours != "") ||
        (t.consumed_hours != null && t.consumed_hours != "") ||
        (t.late_early_departures != null && t.late_early_departures != "") ||
        (t.absence_hours != null && t.absence_hours != ""))
    })) {
      toastStore.push({
        type: 'warning',
        message: tl('Common', 'Không thể lưu công số khi không thuộc nhóm'),
      })
      isValid = true
    }

    return isValid
  }

  
  const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
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
