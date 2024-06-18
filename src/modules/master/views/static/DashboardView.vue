<template>
  <div class="vc-page page-dashboard">
    <vc-row class="mt-4 mb-4">
      <vc-col :span="6" class="d-flex">
        <vc-input v-model="cvSearch" hide-details="true" :prefix-icon="'Search'" @on:keyup.enter="search"></vc-input>
        <vc-button class="ml-2" @click="search" :icon="'Search'" :loading="isLoading">
          {{ tl("Common", "BtnSearch") }}
        </vc-button>
      </vc-col>
      <vc-col :md="18" class="d-flex flex-end">
        <vc-button class="ml-2" @click="onAddNew" type="primary" :icon="'Plus'" :loading="isLoading">
          {{ tl("Common", "BtnAddNew") }}
        </vc-button>
        <vc-button class="ml-2" @click="onExport" type="success" :icon="'Download'" :loading="isLoading">
          {{ tl("Common", "BtnExportExcel") }}
        </vc-button>
        <vc-button
          class="ml-2"
          @click="onExportTemplate"
          type="success"
          :icon="'Download'"
          :loading="isLoading"
        >
          {{ tl('Common', 'BtnExportExcelTemplate') }}
        </vc-button>
      </vc-col>
    </vc-row>

    <vc-row>
      <vc-col :span="24">
        <el-scrollbar>
          <vc-table :datas="dataGrid" :tableConfig="tableConfig" :colConfigs="colConfigDashboard" :page="cvPageConfig"
            :loading="isLoading" :total="cvPageConfig.total" @pageChanged="onPageChanged" @sizeChanged="onSizeChanged">
            <template #action="{ data }">
              <div class="d-flex flex-center">
                <vc-button type="primary" size="small" class="btn-acttion" @click="onEdit(data)"
                  :icon="'Edit'"></vc-button>
                <vc-button type="danger" code="F00015" size="small" class="btn-acttion" @click="onDeleteItem(data)"
                  :icon="'Delete'">
                </vc-button>
                <vc-button type="success" size="small" class="btn-acttion" @click="onExportDetail(data)" :icon="'Download'"></vc-button>
              </div>
            </template>
            <template #is_actived="{ data }">
              <el-tag v-if="data.is_actived" size="small">{{ tl("Common", "Employed") }}</el-tag>
              <el-tag v-if="!data.is_actived" size="small" type="danger">{{ tl("Common", "Resigned") }}</el-tag>
            </template>
          </vc-table>
        </el-scrollbar>
      </vc-col>
    </vc-row>
    <vc-confirm ref="confirmDialog"></vc-confirm>
    <vc-import ref="importDialogOrg" :urlImport="urlImport" :template="template" :onSuccess="onSuccess"></vc-import>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import tl from "@/utils/locallize";
import { colConfig, tableConfig, FUNC_NAME } from "@/commons/config/dashboard.config";
import { useTechnicalStore } from '@master/stores/technical.store'
import { useTechnicalCategoryStore } from '@master/stores/technical-category.store'
import { useCvInfoStore } from '@master/stores/cv-info.store'
import { POPUP_TYPE } from "@/commons/const";
import type { ColConfig } from "@/interfaces/table.interface";
import { useRouter } from 'vue-router'

const urlImport = ref("user/import")
const template = ref({
  exportUrl: "user/download-file-template",
  fileName: "Template_DanhsachCV.xlsx"
})

const technicalStore = useTechnicalStore()
const technicalCategoryStore = useTechnicalCategoryStore()
const cvInfoStore = useCvInfoStore()
const { techPageConfig } = storeToRefs(technicalStore);
const { techCatDataGrid } = storeToRefs(technicalCategoryStore);
const { cvDataGrid, cvSearch, cvGoSort, cvPageConfig } = storeToRefs(cvInfoStore);
const dataGrid = ref<any[]>([]);
const confirmDialog = ref<any>(null);
const router = useRouter();
const isLoading = ref<boolean>(false);
const colConfigDashboard = ref<any>([]);

onBeforeMount(async () => {
  isLoading.value = true;
  await fetchData();
  isLoading.value = false;
});

const onPageChanged = async (page: any) => {
  isLoading.value = true;
  cvPageConfig.value.page = page.page;
  cvPageConfig.value.size = page.size;
  await fetchData();
  isLoading.value = false;
};

const onSizeChanged = async (size: number) => {
  isLoading.value = true;
  cvPageConfig.value.size = size;
  cvPageConfig.value.page = 1;
  await fetchData();
  console.log(cvPageConfig);  
  isLoading.value = false;
};

const onAddNew = () => {
  router.push({ name: 'CvAddNew' })
};

const onExport = async () => {
  await cvInfoStore.exportAll()
}

const onExportDetail = async (item: any) => {
  await cvInfoStore.exportDetail(item)
}

const onExportTemplate = async () => {
  await cvInfoStore.exportTemplate()
}
const onSuccess = async () => { };

const onEdit = (item: any) => {
  router.push({
    name: "CvEditById",
    params: { id: item.id },
  });
};

const onDeleteItem = (item: any) => {
  confirmDialog.value.confirm(
    tl("Common", "Delete"),
    tl("Common", "ConfirmDelete", [item.id]),
    async (res: any) => {
      if (res) {
        await cvInfoStore.delete(item);
        search();
      }
    }
  );
};

const fetchData = async () => {
  await getData();
  cleanData();
  configColumnTable();
  bindingDataToTable();
};

const getData = async () => {
  cvDataGrid.value = [];
  techCatDataGrid.value = [];
  cvGoSort.value = "user_code.asc";
  await cvInfoStore.getList();
  await technicalCategoryStore.getList();
};

const configColumnTable = () => {

  colConfigDashboard.value = [...colConfig]

  techCatDataGrid.value.forEach((element: any) => {
    let columnObject: ColConfig = {
      key: element.id.toString(),
      title: tl(FUNC_NAME, element.name),
      child: []
    };

    element.technicals.forEach((childElement: any) => {
      let columnChildObject: ColConfig = {
        key: childElement.id,
        title: tl(FUNC_NAME, childElement.name),
      };
      columnObject.child.push(columnChildObject);
    });
    colConfigDashboard.value.push(columnObject);
  });
};

const bindingDataToTable = () => {
  cvDataGrid.value.forEach((elementData: any) => {
    let newObject = {};
    newObject['id'] = elementData.id

    colConfigDashboard.value.forEach((elementCol: any) => {
      if (elementCol.child == null) {
        if (elementCol.key == "user_code") {
          newObject[elementCol.key] = elementData.user_code
        } else if (elementCol.key == "branch") {
          newObject[elementCol.key] = elementData.branch
        } else if (elementCol.key == "is_actived") {
          newObject[elementCol.key] = elementData.is_actived
        } else if (elementCol.key == "name") {
          newObject[elementCol.key] = elementData.name
        }
      } else {
        elementCol.child.forEach((elementChildCol: any) => {
          let data = { ...elementData.cvTechInfos.find(x => x.technicalId == elementChildCol.key) }
          newObject[elementChildCol.key] = data.value
        })
      }
    });
    dataGrid.value.push(newObject)
  })
}

const search = async () => {
  isLoading.value = true;
  cvPageConfig.value.page = 1;
  await fetchData();
  isLoading.value = false;
};

const cleanData = () => {
  dataGrid.value = [];
  colConfigDashboard.value = [];
};
</script>

<style lang="scss">
.box-search {
  background-color: #fff;
  padding: 12px;
}
</style>
