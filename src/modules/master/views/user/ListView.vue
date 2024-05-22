<template>
  <div class="vc-page page-user">
    <vc-row>
      <vc-col :md="12" class="align-center">
        <el-breadcrumb :separator-icon="'ArrowRight'">
          <el-breadcrumb-item :to="{ path: '/' }">Quản trị hệ thống</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user' }">Quản lý người dùng</el-breadcrumb-item>
        </el-breadcrumb>
      </vc-col>
    </vc-row>

    <vc-row class="mt-4 mb-4">
      <vc-col :span="6" class="d-flex">
        <vc-input v-model="search" hide-details="true" :prefix-icon="'Search'" @on:keyup.enter="store.getList"></vc-input>
        <vc-button class="ml-2" @click="store.getList" type="primary" :icon="'Search'">
          {{ tl("Common", "BtnSearch") }}
        </vc-button>
      </vc-col>
      <vc-col :md="18" class="d-flex flex-end">
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
        <vc-table :datas="dataGrid" :tableConfig="tableConfig" :colConfigs="colConfig" :page="pageConfig"
          :loading="loading" @dbClick="onEdit" @sorted="onSort" @rowSelected="onRowSelected" @pageChanged="onPageChanged">
          <template #action="{ data }">
            <div class="d-flex flex-center">
              <vc-button type="warning" size="small" class="btn-acttion" @click="onView(data)" :icon="'View'"></vc-button>
              <vc-button type="primary" size="small" class="btn-acttion" @click="onEdit(data)" :icon="'Edit'"></vc-button>
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
import { colConfig, tableConfig } from "@/commons/config/user.config";

import { useUserStore } from '@master/stores/user.store'
import { useImportStore } from '@/stores/import.store'
import { POPUP_TYPE } from "@/commons/const";

const urlImport = ref("user/import")
const template = ref({
  exportUrl: "user/download-file-template",
  fileName: "Template_Danhsachtaikhoan.xlsx"
})

const store = useUserStore()
const importStore = useImportStore()
const { dataGrid, pageConfig, search, goSort, loading } = storeToRefs(store);

const popupType = ref<POPUP_TYPE>(POPUP_TYPE.CREATE);
const selectedItems = ref<any[]>([]);
const confirmDialog = ref<any>(null);
const detailRef = ref<any>(null);

onBeforeMount(async () => {
  store.getList()
});

const onRowSelected = (selected: any) => {
  selectedItems.value = selected;
};

const onSort = async (sortBy: any) => {
  goSort.value = sortBy;
  store.getList()
};

const onPageChanged = async (page: any) => {
  pageConfig.value = { ...page };
  store.getList()
};

const onAddNew = () => {
  detailRef.value.open()
};

const onExport = () => {
  store.export()
};

const onImport = () => {
  importStore.open()
};

const onSuccess = async () => {
  importStore.close()
  store.getList()
}

const onEdit = (item: any) => {
  // router.push({ name: "UserEditByID", params: { id: item.id } });
  popupType.value = POPUP_TYPE.EDIT;
  detailRef.value.open(item.id)
};

const onView = (item: any) => {
  // router.push({ name: "UserEditByID", params: { id: item.id } });
  popupType.value = POPUP_TYPE.VIEW;
  detailRef.value.open(item.id)
};

const onDeleteItem = (item: any) => {
  confirmDialog.value.confirm(
    tl("Common", "Delete"),
    tl("Common", "ConfirmDelete", [item.user_name]),
    async (res: any) => {
      if (res) await store.delete(item);
    }
  );
};

</script>

<style lang="scss">
.box-search {
  background-color: #fff;
  padding: 12px
}
</style>