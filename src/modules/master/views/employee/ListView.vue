<template>
  <div class="vc-page page-user">
    <vc-row class="mt-4 mb-4">
      <vc-col :span="8" class="d-flex">
        <vc-input v-model="employeeSearch" hide-details="true" :prefix-icon="'Search'"
          @on:keyup.enter="onSearch"></vc-input>
        <vc-button class="ml-2" @click="onSearch" type="primary" :icon="'Search'">
          {{ tl("Common", "BtnSearch") }}
        </vc-button>
        <vc-button class="ml-2" @click="reloadTable" :icon="'Refresh'">
          {{ tl("Common", "") }}
        </vc-button>
      </vc-col>
      <vc-col :md="16" class="d-flex flex-end">
        <vc-button class="ml-2" @click="onExport" :icon="'Download'" disabled>
          {{ tl("Common", "BtnExportExcel") }}
        </vc-button>
        <vc-button class="ml-2" @click="onImport" :icon="'Upload'" disabled>
          {{ tl("Common", "BtnImportExcel") }}
        </vc-button>
        <vc-button class="ml-2" @click="onAddNew" type="primary" :icon="'Plus'">
          {{ tl("Common", "BtnAddNew") }}
        </vc-button>
      </vc-col>
    </vc-row>

    <vc-row>
      <vc-col :span="24">
        <vc-table :datas="employeeDataGrid" :tableConfig="tableConfig" :colConfigs="colConfig" :page="employeePageConfig"
          :key="tableKey" :loading="employeeLoading" @dbClick="onEdit" @sorted="onSort" @rowSelected="onRowSelected"
          @pageChanged="onPageChanged" @filterChanged="onFilterChanged" :total="employeePageConfig.total">
          <template #action="{ data }">
            <div class="d-flex flex-center">
              <vc-button type="warning" size="small" class="btn-acttion" @click="onView(data)"
                :icon="'View'"></vc-button>
              <vc-button type="primary" size="small" class="btn-acttion" @click="onEdit(data)"
                :icon="'Edit'"></vc-button>
              <vc-button type="danger" code="F00015" size="small" class="btn-acttion" @click="onDeleteItem(data)"
                :icon="'Delete'">
              </vc-button>
            </div>
          </template>
          <template #state="{ data }" >
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
        </vc-table>
      </vc-col>
    </vc-row>
    <vc-confirm ref="confirmDialog"></vc-confirm>
    <detail-modal ref="detailRef" :type="popupType" @update:fields="updateListFilters"></detail-modal>
    <vc-import ref="importDialogOrg" :urlImport="urlImport" :template="template" :onSuccess="onSuccess"></vc-import>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";

import tl from "@/utils/locallize";
import DetailModal from './DetailModal.vue'
import { colConfig, tableConfig } from "@/commons/config/employee.config";

import { useEmployeeStore } from '@master/stores/employee.store'
import { useDepartmentStore } from "@master/stores/department.store";
import { usePositionStore } from "@master/stores/position.store";

import { useImportStore } from '@/stores/import.store'
import { POPUP_TYPE, BRANCHES, EMPLOYEE_STATES } from "@/commons/const";

const urlImport = ref("user/import")
const template = ref({
  exportUrl: "user/download-file-template",
  fileName: "Template_Danhsachtaikhoan.xlsx"
})

const employeeStore = useEmployeeStore()
const departmentStore = useDepartmentStore()
const positionStore = usePositionStore()
const importStore = useImportStore()
const { 
  employeeDataGrid, 
  employeePageConfig, 
  employeeSearch, 
  employeeGoSort, 
  employeeLoading,
  employeeFilters, 
} = storeToRefs(employeeStore);

const popupType = ref<POPUP_TYPE>(POPUP_TYPE.CREATE);
const selectedItems = ref<any[]>([]);
const confirmDialog = ref<any>(null);
const detailRef = ref<any>(null);

const tableKey = ref(0) // For force update table


onBeforeMount(async () => {
  employeeGoSort.value = "employee_code.asc";

  await fetchData()

  updateListFilters()
  tableKey.value += 1 // Force update table
});

const fetchData = async () => {
  cleanData();
  await employeeStore.getList()
  await employeeStore.getGroups()
  // Get list of filters
  await departmentStore.getList()
  await positionStore.getList()

  updateListFilters()
};

const onRowSelected = (selected: any) => {
  selectedItems.value = selected;
};

const onSort = async (sort: any, config: any) => {
  if (config.order == null) {
    employeeGoSort.value = "employee_code.asc";
  }
  else {
    employeeGoSort.value = sort;
  }
  employeeStore.getList()
};

const onPageChanged = async (page: any) => {
  employeePageConfig.value = { ...page };
  employeeStore.getList()
};

const onFilterChanged = async (filters: any[]) => {
  employeeLoading.value = true;
  employeePageConfig.value.page = 1;

  employeeFilters.value = {
    ...employeeFilters.value,
    ...filters
  }

  employeeFilters.value["group"] = employeeFilters.value["current_group"]
  delete employeeFilters.value["current_group"]
  
  await fetchData();
  employeeLoading.value = false;
}

const onSearch = async () => {
  employeeLoading.value = true;
  employeePageConfig.value.page = 1;
  await fetchData();
  employeeLoading.value = false;
};

const onAddNew = () => {
  popupType.value = POPUP_TYPE.CREATE;
  detailRef.value.open()
};

const onExport = () => {
  // employeeStore.export()
};

const onImport = () => {
  importStore.open()
};

const onSuccess = async () => {
  importStore.close()
  employeeStore.getList()
}

const onEdit = (item: any) => {
  popupType.value = POPUP_TYPE.EDIT;
  detailRef.value.open(item)
};

const onView = (item: any) => {
  popupType.value = POPUP_TYPE.VIEW;
  detailRef.value.open(item)
};

const onDeleteItem = (item: any) => {
  confirmDialog.value.confirm(
    tl("Common", "Delete"),
    tl("Common", "ConfirmDelete", [item.name]),
    async (res: any) => {
      if (res) await employeeStore.delete(item);
      await fetchData();
    }
  );
};

const updateListFilters = () => {
  const branchFilters = BRANCHES.map(branch => ({
    text: branch,
    value: branch
  }));

  const branchCol = colConfig.find(obj => obj.key == "branch")
  if (branchCol) {
    if (branchFilters.length > 0) {
      branchCol["filters"] = branchFilters
    }
  }

  const stateFilters = EMPLOYEE_STATES.map((state, index) => ({
    text: state,
    value: index
  }));

  const stateCol = colConfig.find(obj => obj.key == "state")
  if (stateCol) {
    if (stateFilters.length > 0) {
      stateCol["filters"] = stateFilters
    }
  }

  // Get list department to filter in column "department"
  const departmentList = [...departmentStore.getData]
  const departmentFilters = departmentList.map(department => ({
    text: department.name,
    value: department.name,
  }));

  const departmentCol = colConfig.find(obj => obj.key == "department")
  if (departmentCol) {
    if (departmentFilters.length > 0) {
      departmentCol["filters"] = departmentFilters
    }
  }

  // Get list position to filter in column "position"
  const positionList = [...positionStore.getData]
  const positionFilters = positionList.map(position => ({
    text: position.name,
    value: position.name,
  }));

  const positionCol = colConfig.find(obj => obj.key == "position")
  if (positionCol) {
    if(positionFilters.length > 0) {
      positionCol["filters"] = positionFilters
    }
  }

  // Get list groups to filter in column "groups"
  const groupList = [...employeeStore.getGroupsData]
  const groupFilters = groupList.map(group => ({
    text: group.initial_name,
    value: group.initial_name,
  }));

  const groupCol = colConfig.find(obj => obj.key == "current_group")
  if (groupCol) {
    if(groupFilters.length > 0) {
      groupCol["filters"] = groupFilters
    }
  }
}

const reloadTable = async () => {
  employeeSearch.value = '';
  await onSearch();
};

const cleanData = () => {
  employeeDataGrid.value = [];
};

</script>

<style lang="scss">
.box-search {
  background-color: #fff;
  padding: 12px
}


.cell {
  white-space: pre-wrap!important;
}
</style>