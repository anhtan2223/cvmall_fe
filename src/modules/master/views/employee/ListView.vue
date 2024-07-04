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
        <vc-button class="ml-2" @click="onExport" :icon="'Download'">
          {{ tl("Common", "BtnExportExcel") }}
        </vc-button>
        <vc-button class="ml-2" @click="onImport" :icon="'Upload'">
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
          @pageChanged="onPageChanged" @filterChanged="onFilterChanged">
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
        </vc-table>
      </vc-col>
    </vc-row>
    <vc-confirm ref="confirmDialog"></vc-confirm>
    <detail-modal ref="detailRef" :type="popupType"></detail-modal>
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
import { POPUP_TYPE } from "@/commons/const";

const urlImport = ref("user/import")
const template = ref({
  exportUrl: "user/download-file-template",
  fileName: "Template_Danhsachtaikhoan.xlsx"
})

const employeeStore = useEmployeeStore()
const departmentStore = useDepartmentStore()
const positionStore = usePositionStore()
const importStore = useImportStore()
const { employeeDataGrid, employeePageConfig, employeeSearch, employeeGoSort, employeeLoading } = storeToRefs(employeeStore);

const popupType = ref<POPUP_TYPE>(POPUP_TYPE.CREATE);
const selectedItems = ref<any[]>([]);
const confirmDialog = ref<any>(null);
const detailRef = ref<any>(null);

const tableKey = ref(0) // For force update table
const branchList = ["Hà Nội", "Nha Trang", "Cần Thơ"]

onBeforeMount(async () => {
  await employeeStore.getList()
  // Get list of filters
  await departmentStore.getList()
  await positionStore.getList()

  const branchFilters = branchList.map(branch => ({
    text: branch,
    value: branch,
    key: branch
  }));

  const branchCol = colConfig.find(obj => obj.key == "branch")
  if (branchCol) {
    if (branchFilters.length > 0) {
      branchCol["filters"] = branchFilters
      branchCol["filterMethod"] = () => { }
    }
  }

  // Get list department to filter in column "department"
  const departmentList = [...departmentStore.getData]
  const departmentFilters = departmentList.map(department => ({
    text: department.name,
    value: department.name,
    key: department.name
  }));

  const departmentCol = colConfig.find(obj => obj.key == "department")
  if (departmentCol) {
    if (departmentFilters.length > 0) {
      departmentCol["filters"] = departmentFilters
      departmentCol["filterMethod"] = () => { }
    }
  }

  // Get list department to filter in column "department"
  const positionList = [...positionStore.getData]
  const positionFilters = positionList.map(position => ({
    text: position.name,
    value: position.name,
    key: position.name
  }));

  const positionCol = colConfig.find(obj => obj.key == "position")
  if (positionCol) {
    if(positionFilters.length > 0) {
      positionCol["filters"] = positionFilters
      positionCol["filterMethod"] = () => {}
    }
  }

  tableKey.value += 1 // Force update table
});

const fetchData = async () => {
  cleanData();
  await employeeStore.getList()
};

const onRowSelected = (selected: any) => {
  selectedItems.value = selected;
};

const onSort = async (sortBy: any) => {
  employeeGoSort.value = sortBy;
  employeeStore.getList()
};

const onPageChanged = async (page: any) => {
  employeePageConfig.value = { ...page };
  employeeStore.getList()
};

const onFilterChanged = async (filters: any[]) => {
  console.log(filters)
  for (const key in filters) {
      console.log(...filters[key])
  }
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
  detailRef.value.open(item.id)
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
    }
  );
};

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