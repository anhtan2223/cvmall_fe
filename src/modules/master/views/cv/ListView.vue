<!-- <template>
    <div class="vc-page page-dashboard">
    <vc-row class="mt-4 mb-4">
      <vc-col :span="6" class="d-flex">
        <vc-input v-model="cvSearch" hide-details="true" :prefix-icon="'Search'" @on:keyup.enter="search"></vc-input>
        <vc-button class="ml-2" @click="search" :icon="'Search'">
          {{ tl("Common", "BtnSearch") }}
        </vc-button>
      </vc-col>
      <vc-col :md="18" class="d-flex flex-end">
        <vc-button class="ml-2" @click="onAddNew" type="primary" :icon="'Plus'">
          {{ tl("Common", "BtnAddNew") }} 
        </vc-button>
        <vc-button class="ml-2" @click="onExport" type="success" :icon="'Download'">
          {{ tl("Common", "BtnExportExcel") }}
        </vc-button>
      </vc-col>
    </vc-row>

    <vc-row>
      <vc-col :span="24">
        <el-scrollbar>
          <vc-table :datas="cvDataGrid" :tableConfig="tableConfig" :colConfigs="colConfig" :page="cvPageConfig"
          :loading="cvLoading" @dbClick="onEdit" @sorted="onSort" @rowSelected="onRowSelected" @pageChanged="onPageChanged">
            <template #action="{ data }">
              <div class="d-flex flex-center">
                <vc-button type="warning" size="small" class="btn-acttion" @click="onEdit(data)" :icon="'Edit'"></vc-button>
                <vc-button type="danger" code="F00015" size="small" class="btn-acttion" @click="onDeleteItem(data)"
                :icon="'Delete'">
              </vc-button>
              <vc-button type="success" size="small" class="btn-acttion" @click="onView(data)" :icon="'Download'"></vc-button>
              </div>
            </template>
            <!-- <template #is_actived="{cvDataGrid.is_actived }">
              <div v-if="cvDataGrid.is_actived">
                <el-text class="mx-1" type="success">Đang làm việc</el-text>
              </div>
              <div v-if="!cvDataGrid.is_actived">
                <el-text class="mx-1" type="danger">Đã nghỉ</el-text>
              </div>
            </template> -->
          </vc-table>
        </el-scrollbar>
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
import { colConfig, tableConfig } from "@/commons/config/cv.config";
import DetailModal from './DetailModal.vue'
import { useTechnicalStore } from '@master/stores/technical.store'
import { useTechnicalCategoryStore } from '@master/stores/technical-category.store'
import { useCvInfoStore } from '@master/stores/cv-info.store'
import { POPUP_TYPE } from "@/commons/const";

const urlImport = ref("user/import")
const template = ref({
  // exportUrl: "user/download-file-template",
  // fileName: "Template_DanhsachCV.xlsx"
})

const technicalStore = useTechnicalStore()
const technicalCategoryStore = useTechnicalCategoryStore()
const cvInfoStore = useCvInfoStore()
const { cvDataGrid, cvPageConfig, cvSearch, cvGoSort, cvLoading } = storeToRefs(cvInfoStore);
const { techCatDataGrid, techCatPageConfig, techCatSearch, techCatGoSort, techCatLoading } = storeToRefs(technicalCategoryStore);

const dataGrid = ref<any[]>([]);

const popupType = ref<POPUP_TYPE>(POPUP_TYPE.CREATE);
const selectedItems = ref<any[]>([]);
const confirmDialog = ref<any>(null);
const detailRef = ref<any>(null);

onBeforeMount(async () => {

  await getData()

  // configColumnTable()

  // bindingDataToTable()

})

const onRowSelected = (selected: any) => {
  selectedItems.value = selected;
};

const onSort = async (sortBy: any) => { 
  
};

const onPageChanged = async (page: any) => {
  
};

const onAddNew = () => {
  detailRef.value.open(techCatDataGrid.value)
};

const onExport = () => {
  
};

const onImport = () => {
  
};

const onSuccess = async () => {
  
}

const onEdit = (item: any) => {
  var selectedItem = {...item}
  
  detailRef.value.open(techCatDataGrid.value, selectedItem)
};

const onView = (item: any) => {
  
};

const onDeleteItem = (item: any) => {
  confirmDialog.value.confirm(
    tl("Common", "Delete"),
    tl("Common", "ConfirmDelete", [item.id]),
    async (res: any) => {
      if (res){
        await cvInfoStore.delete(item);
        search();
      } 
    }
  );

};

const getData = async () => {
  cvDataGrid.value = []
  techCatDataGrid.value = []
  await cvInfoStore.getList();
  await technicalCategoryStore.getList();
}

const search = async () => {
  cleanData()
  await getData()
  // bindingDataToTable()
}

const cleanData = () => {
  dataGrid.value = []
}

</script>

<style lang="scss">
.box-search {
  background-color: #fff;
  padding: 12px
}
</style> -->