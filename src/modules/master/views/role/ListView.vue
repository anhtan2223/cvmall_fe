<template>
  <div class="vc-page page-role">
    <vc-row>
      <vc-col :md="12" class="align-center">
        <el-breadcrumb :separator-icon="'ArrowRight'">
          <el-breadcrumb-item :to="{ path: '/' }">Quản trị hệ thống</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user' }">Quản lý nhóm người dùng</el-breadcrumb-item>
        </el-breadcrumb>
      </vc-col>
    </vc-row>

    <vc-row class="mt-4 mb-4">
      <vc-col :lg="8" :md="12" class="d-flex">
        <vc-input v-model="search" :placeholder="tl('Role', 'SearchPlaceholder')"></vc-input>
        <vc-button class="ml-2" @click="getList" type="primary" :icon="'Search'">
          {{ tl("Common", "BtnSearch") }}
        </vc-button>
      </vc-col>
      <vc-col :lg="16" :md="12" class="d-flex flex-end">
        <!-- <vc-button type="danger" @click="onDeleteSelected" code="F00015" :icon="Delete">
          {{ tl("Common", "BtnDeleteMulti") }}
        </vc-button> -->
        <vc-button type="primary" class="ml-2" @click="onAddNew" code="F00012" :icon="'Plus'">
          {{ tl("Common", "BtnAddNew") }}
        </vc-button>
      </vc-col>
    </vc-row>

    <vc-row class="mt-4">
      <vc-col :col="24">
        <vc-table :datas="roles" :tableConfig="tableConfig" :colConfigs="colConfig" :page="pageConfig" :loading="loading"
          @dbClick="onEdit" @sorted="onSort" @rowSelected="onRowSelected" @pageChanged="onPageChanged">
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import roleService from "@master/services/role.service";
import { colConfig, tableConfig } from "@/commons/config/role.config";
import tl from "@/utils/locallize";
import DetailModal from './DetailModal.vue'
import { POPUP_TYPE } from "@/commons/const";

const roles = ref<any[]>([]);
const pageConfig = ref<any>({});
const popupType = ref<POPUP_TYPE>(POPUP_TYPE.CREATE);
const search = ref<any>("");
const goSort = ref<any>("");
const selectedItems = ref<any[]>([]);
const loading = ref<boolean>(false);
const confirmDialog = ref<any>(null);
const detailRef = ref<any>(null);

onMounted(async () => {
  getList();
});

const getList = async () => {
  loading.value = true;
  await roleService
    .getList({
      sort: goSort.value,
      search: search.value,
      ...pageConfig.value,
    })
    .then((data) => {
      roles.value = data.data ?? [];
      pageConfig.value.total = data.total
    })
    .finally(() => {
      loading.value = false;
    });
};

const onRowSelected = (selected: any) => {
  selectedItems.value = selected;
};

const onSort = async (sortBy: any) => {
  goSort.value = sortBy;
  getList();
};

const onPageChanged = async (page: any) => {
  pageConfig.value = { ...page };
  getList();
};

const onAddNew = () => {
  popupType.value = POPUP_TYPE.CREATE;
  detailRef.value.open()
};

const onEdit = (item: any) => {
  popupType.value = POPUP_TYPE.EDIT;
  detailRef.value.open(item.id)
};

const onView = (item: any) => {
  popupType.value = POPUP_TYPE.VIEW;
  detailRef.value.open(item.id)
};

const onDeleteItem = (item: any) => {
  confirmDialog.value.confirm(
    tl("Common", "Delete"),
    tl("Common", "ConfirmDelete", [item.code]),
    async (res: any) => {
      if (res) await onDeleteMulti([item]);
    }
  );
};

const onDeleteMulti = async (data: any) => {
  await roleService.deleteMulti(data.map((x: any) => x.id)).then(() => {
    getList();
  });
};
</script>
