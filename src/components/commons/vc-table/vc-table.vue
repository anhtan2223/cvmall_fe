<template>
  <!-- <vc-card class="pb-3"> -->
  <div class="vc-table">
    <el-table stripe style="width: 100%" v-loading="loading" :height="height ?? defaultHeight" :data="datas" border
      @selection-change="onRowSelected" @sort-change="onSortChange" @row-dblclick="onRowDbClick" @filter-change="onFilterChanged">
      <!-- INDEX -->
      <el-table-column label="#" width="50" type="index" align="center" header-align="center"
        v-if="tableConfig.index" />

      <!-- ACTIONS -->
      <el-table-column width="110" v-if="tableConfig.action">
        <template #default="scope">
          <div class="d-flex flex-center btn-group-action">
            <slot name="action" :data="scope.row" :scope="scope" class="btn-action"></slot>
          </div>
        </template>
      </el-table-column>

      <!-- CHECK BOX -->
      <el-table-column type="selection" width="40" v-if="tableConfig.checkbox" />

      <!-- DATA -->
      <template v-for="(col, index) in colConfigs" :key="index">
        <template v-if="col.is_hidden != true">
          <el-table-column :prop="col.key" :width="col.width" :label="col.title" :sortable="col.sort ?? col.is_sort"
            :filters="col.filters" :filter-method="col.filterMethod" :formatter="col.formatter" v-if="!col.is_custom"
            :column-key="col.key">
            <template v-for="(colChild, indexChild) in col.child" :key="indexChild" v-if="col.child != null">
              <el-table-column :prop="colChild.key" :width="colChild.width" :label="colChild.title"
                :sortable="colChild.sort ?? colChild.is_sort" v-if="!colChild.is_custom" />
              <el-table-column :width="colChild.width" :label="colChild.title"
                :sortable="colChild.sort ?? colChild.is_sort" v-if="colChild.is_custom">
                <template #default="scope">
                  <div class="d-flex flex-start">
                    <slot :name="colChild.key" :data="scope.row" :scope="scope"></slot>
                  </div>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
          <el-table-column :width="col.width" :label="col.title" :sortable="col.is_sort" v-if="col.is_custom">
            <template #default="scope">
              <div class="d-flex flex-start">
                <slot :name="col.key" :data="scope.row" :scope="scope"></slot>
              </div>
            </template>
          </el-table-column>
        </template>
      </template>

    </el-table>

    <!-- PAGING -->
    <div class="table-footer pa-2 pt-3" v-if="tableConfig?.showPaging">
      <vc-pagination :pageConfig="pageConfig" :total="total || 0" @changed="onPageChanged"
        @sizeChanged="onSizeChanged"></vc-pagination>
    </div>
    <!-- PAGING -->
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted, onUnmounted } from 'vue'
import type { MetaResponse } from '@/interfaces/response.interface'
import type { ColConfig, TableConfig } from '@/interfaces/table.interface'
import VcPagination from './vc-pagination.vue'

const props = defineProps<{
  datas?: any[]
  colConfigs: ColConfig[]
  tableConfig: TableConfig
  page: MetaResponse
  height?: string
  loading?: boolean
  total?: number
}>()

const {
  datas,
  tableConfig,
  colConfigs,
  page: pageConfig,
  height,
  loading,
  total
} = toRefs(props)

const emit = defineEmits([
  'dbClick',
  'onDelete',
  'sorted',
  'rowSelected',
  'pageChanged',
  'sizeChanged',
  'filterChanged'
])

const colSettings = ref<ColConfig[]>([])
const defaultHeight = ref(window.innerHeight - 210)

onMounted(() => {
  colSettings.value = colConfigs.value
  window.addEventListener('resize', updateTableHeight);
})

onUnmounted(() => {
  window.removeEventListener('resize', updateTableHeight);
});

const updateTableHeight = () => {
  defaultHeight.value = window.innerHeight - 210;
}

const onPageChanged = (page: any) => {
  emit('pageChanged', page)
}

const onSizeChanged = (size: number) => {
  emit('sizeChanged', size)
}

const onFilterChanged = (filters: any) => {
  emit('filterChanged', filters)
}

const onRowDbClick = (item: any) => {
  if (tableConfig.value.dbClick) emit('dbClick', item)
}

/**
 * Event clicked row check box
 * Emit rowSelected
 */
const onRowSelected = (items: any[]) => {
  emit('rowSelected', items)
}

/**
 * Event click sort table header
 * Emit sorted
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onSortChange = (config: any) => {
  if (config.column == null) {
    emit('sorted', null)
    return
  }

  emit(
    'sorted',
    `${config.prop}.${config.order == 'ascending' ? 'asc' : 'desc'}`, config
  )
}
</script>
<style lang="scss">
@import '@/assets/styles/commons/vc-table';
</style>
