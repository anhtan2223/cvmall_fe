<template>
  <div class="vc-page page-dashboard">

    <vc-row class="mt-4 mb-4">
        <vc-col :span="6" class="d-flex">

        </vc-col>
        <vc-col :md="18" class="d-flex flex-end">
          <vc-button class="ml-2" @click="onSave" type="primary" :icon="'FolderChecked'">
            {{ tl("Common", "BtnSave") }} 
          </vc-button>
          <vc-button class="ml-2" @click="onClose" type="info" :icon="'Close'">
            {{ tl("Common", "BtnClose") }} 
          </vc-button>
        </vc-col>
      </vc-row>

    <el-form ref="cvForm" :model="cv" :rules="rules" label-width="200px" label-position="top"
        require-asterisk-position="right" :disabled="type == POPUP_TYPE.VIEW">
        <!-- Invidual Info -->
        <vc-row :gutter="20" class="no-margin-left">
          <vc-row :gutter="20" class="full-width no-margin-left">
            <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="no-pading">
              <vc-row style="height: 50%;" class="label-style-custom">
                <div class="full-width full-height center-item border">
                  <el-text class="w-150px mb-2 " truncated>
                    {{ tl('Curriculum vitae', 'Furigana') }}
                  </el-text>  
                </div>
              </vc-row>
              <vc-row style="height: 50%;" class="label-style-custom">
                <div class="full-width full-height center-item border">
                  <el-text class="w-150px mb-2 " truncated>
                    {{ tl('Curriculum vitae', 'Fullname') }}
                  </el-text>  
                </div>
              </vc-row>
            </vc-col>
            <vc-col :lg="21" :md="21" :sm="21" :xs="21" class="no-pading-left display-flex">
              <vc-col :lg="14" :md="14" :sm="14" :xs="14" class="full-width full-height center-item no-pading">
                <vc-row  class="no-pading-left" style="height: 50%;">
                  <vc-col :lg="12" :md="12" :sm="12" :xs="12">
                    <vc-input v-model="cv.furigana" class="full-height"/>
                  </vc-col>
                  <vc-col :lg="5" :md="5" :sm="5" :xs="5" class="label-style-custom">
                    <div class="full-width full-height center-item border">
                      <el-text class="w-150px mb-2 " truncated>
                        {{ tl('Curriculum vitae', 'Gender') }}
                      </el-text>  
                    </div>
                  </vc-col>
                  <vc-col :lg="7" :md="7" :sm="7" :xs="7" >
                    <div class="full-width full-height center-item border label-style-custom">
                      <el-text class="w-150px mb-2 " truncated>
                        {{ tl('Curriculum vitae', 'Birthday') }}
                      </el-text>  
                    </div>
                  </vc-col>
                </vc-row>
                <vc-row style="height: 50%;">
                  <vc-col :lg="12" :md="12" :sm="12" :xs="12">
                    <vc-input v-model="cv.name" class="full-height"/>
                  </vc-col>
                  <vc-col :lg="5" :md="5" :sm="5" :xs="5">
                    <vc-select v-model="cv.gender" :items="genders" fieldValue="key" fieldText="value" class="full-height full-height-select"></vc-select>
                  </vc-col>
                  <vc-col :lg="7" :md="7" :sm="7" :xs="7">
                    <el-date-picker
                      v-model="cv.birthday"
                      type="date"
                      placeholder="Pick a day"
                    />
                  </vc-col>
                </vc-row>
              </vc-col>
              <vc-col :lg="10" :md="10" :sm="10" :xs="10" class="no-pading">
                  <vc-row>
                    <vc-col :lg="7" :md="7" :sm="7" :xs="7" class="border">
                      <div class="full-width full-height center-item label-style-custom">
                        <el-text>
                          {{ tl('Curriculum vitae', 'Language') }}
                        </el-text>
                      </div>
                    </vc-col>
                    <vc-col :lg="17" :md="17" :sm="17" :xs="17">
                      <vc-row class="border">
                        <div class="full-width full-height center-item label-style-custom">
                          <el-text size="small" truncated>
                            {{ tl('Curriculum vitae', '○: No problem ☆: Connected △: Elementary') }}
                          </el-text>
                        </div>
                      </vc-row>
                      <vc-row>
                        <vc-col :lg="12" :md="12" :sm="12" :xs="12">
                          <vc-row class="border">
                            <div class="full-width full-height center-item  label-style-custom">
                              <el-text>
                                {{ tl('Curriculum vitae', 'Conversation') }}
                              </el-text>
                            </div>
                          </vc-row>
                          <vc-row>
                            <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="border">
                              <div class="full-width full-height center-item label-style-custom">
                                <el-text>
                                  {{ tl('Curriculum vitae', 'Listen') }}
                                </el-text>
                              </div>
                            </vc-col>
                            <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="border">
                              <div class="full-width full-height center-item label-style-custom">
                                <el-text>
                                  {{ tl('Curriculum vitae', 'Speak') }}
                                </el-text>
                              </div>
                            </vc-col>
                          </vc-row>
                        </vc-col>
                        <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="d-flex">
                          <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="border full-height">
                            <div class="full-width full-height center-item label-style-custom">
                              <el-text>
                                {{ tl('Curriculum vitae', 'Read') }}
                              </el-text>
                            </div>
                          </vc-col>
                          <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="border full-height">
                            <div class="full-width full-height center-item label-style-custom">
                              <el-text>
                                {{ tl('Curriculum vitae', 'Write') }}
                              </el-text>
                            </div>
                          </vc-col>
                        </vc-col>
                      </vc-row>
                    </vc-col>
                  </vc-row>
                  <vc-row>
                    <vc-col :lg="7" :md="7" :sm="7" :xs="7" class="border">
                      <div class="full-width full-height center-item label-style-custom">
                        <el-text>
                          {{ tl('Curriculum vitae', 'English') }}
                        </el-text>
                      </div>
                    </vc-col>
                    <vc-col :lg="17" :md="17" :sm="17" :xs="17" class="d-flex">
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select v-model="cv.lang1_hearing" :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select v-model="cv.lang1_speaking" :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select v-model="cv.lang1_reading" :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select v-model="cv.lang1_writing" :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                    </vc-col>
                  </vc-row>
                  <vc-row>
                    <vc-col :lg="7" :md="7" :sm="7" :xs="7" class="border">
                      <div class="full-width full-height center-item label-style-custom">
                        <el-text>
                          {{ tl('Curriculum vitae', 'Janpanese') }}
                        </el-text>
                      </div>
                    </vc-col>
                    <vc-col :lg="17" :md="17" :sm="17" :xs="17" class="d-flex">
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select v-model="cv.lang2_hearing" :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height" ></vc-select>
                      </vc-col>
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select v-model="cv.lang2_speaking" :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select v-model="cv.lang2_reading" :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select v-model="cv.lang2_writing" :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                    </vc-col>
                  </vc-row>
                </vc-col>
            </vc-col>
          </vc-row>

          <vc-row :gutter="20" class="full-width no-margin-left">
            <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="border no-pading-right label-style-custom">
              <div class="full-width full-height center-item">
                <el-text class="w-150px mb-2 " truncated>
                  {{ tl('Curriculum vitae', 'Education') }}
                </el-text>  
              </div>
            </vc-col>
            <vc-col :lg="6" :md="6" :sm="6" :xs="6" class=" no-pading">
              <vc-row class="border">
                <div class="full-width full-height center-item label-style-custom">
                    <el-text class="w-150px mb-2" truncated>
                      {{ tl('Curriculum vitae', 'University') }}
                    </el-text>
                  </div>
              </vc-row>
              <vc-row>
                <vc-input v-model="cv.last_university_name"/>
              </vc-row>
            </vc-col>
            <vc-col :lg="5" :md="5" :sm="5" :xs="5" class="no-pading">
              <vc-row class="border">
                <div class="full-width full-height center-item label-style-custom">
                    <el-text class="w-150px mb-2" truncated>
                      {{ tl('Curriculum vitae', 'Department') }}
                    </el-text>
                  </div>
              </vc-row>
              <vc-row>
                <vc-input v-model="cv.subject"/>
              </vc-row>
            </vc-col>
            <vc-col :lg="5" :md="5" :sm="5" :xs="5" class="no-pading">
              <vc-row class="border">
                <div class="full-width full-height center-item label-style-custom">
                    <el-text class="w-150px mb-2" truncated>
                      {{ tl('Curriculum vitae', 'Graduation year') }}
                    </el-text>
                  </div>
              </vc-row>
              <vc-row>
                <el-input-number
                  v-model="cv.graduation_year"  
                  :min="1"
                  class="full-width"
                  :controls="false"
                />
                <!-- <vc-input v-model="cv.graduation_year"/> -->
              </vc-row>
            </vc-col>
            <vc-col :lg="5" :md="5" :sm="5" :xs="5" class="no-pading-left">
              <vc-row class="border">
                <div class="full-width full-height center-item label-style-custom">
                    <el-text class="w-150px mb-2" truncated>
                      {{ tl('Curriculum vitae', 'Final Education') }}
                    </el-text>
                  </div>
              </vc-row>
              <vc-row>
                <vc-input v-model="cv.final_education"/>
              </vc-row>
            </vc-col>
          </vc-row>

          <vc-row :gutter="20" class="full-width no-margin-left">
            <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="border no-pading-right label-style-custom">
              <div class="full-width full-height center-item">
                <el-text class="w-150px mb-2">
                  {{ tl('Curriculum vitae', 'Other qualifications') }}
                </el-text>
              </div>
            </vc-col>
            <vc-col :lg="21" :md="21" :sm="21" :xs="21" class="no-pading-left"> 
              <vc-row>
                <vc-col :lg="14" :md="14" :sm="14" :xs="14" class="border no-pading">
                  <div class="full-width full-height center-item label-style-custom">
                    <el-text class="w-150px mb-2" truncated>
                      {{ tl('Curriculum vitae', 'Qualification') }}
                    </el-text>
                  </div>
                </vc-col>
                <vc-col :lg="10" :md="10" :sm="10" :xs="10" class="border">
                  <div class="full-width full-height center-item label-style-custom">
                    <el-text class="w-150px mb-2" truncated>
                      {{ tl('Curriculum vitae', 'Acquisition Date') }}
                    </el-text>
                  </div>
                </vc-col>
              </vc-row>
              <vc-row class="no-pading">
                <vc-col :lg="14" :md="14" :sm="14" :xs="14" >
                  <div class="full-width center-item">
                    <vc-input v-model="cv.certificate1_name"/>
                  </div>
                </vc-col>
                <vc-col :lg="10" :md="10" :sm="10" :xs="10">
                  <div class="full-width center-item">
                    <el-date-picker
                      v-model="cv.certificate1_year"
                      type="date"
                      placeholder="Pick a day"
                    />
                    <!-- <vc-input v-model="cv.certificate1_year" /> -->
                  </div>
                </vc-col>
              </vc-row>
              <vc-row>
                <vc-col :lg="14" :md="14" :sm="14" :xs="14">
                  <div class="full-width center-item">
                    <vc-input v-model="cv.certificate2_name"/>
                  </div>
                </vc-col>
                <vc-col :lg="10" :md="10" :sm="10" :xs="10">
                  <div class="full-width center-item">
                    <el-date-picker
                      v-model="cv.certificate2_year"
                      type="date"
                      placeholder="Pick a day"
                    />
                    <!-- <vc-input v-model="cv.certificate2_year"/> -->
                  </div>
                </vc-col>
              </vc-row>
              <vc-row>
                <vc-col :lg="14" :md="14" :sm="14" :xs="14">
                  <div class="full-width center-item">
                    <vc-input v-model="cv.certificate3_name"/>
                  </div>
                </vc-col>
                <vc-col :lg="10" :md="10" :sm="10" :xs="10">
                  <div class="full-width center-item">
                    <el-date-picker
                      v-model="cv.certificate3_year"
                      type="date"
                      placeholder="Pick a day"
                    />
                    <!-- <vc-input v-model="cv.certificate3_year"/> -->
                  </div>
                </vc-col>
              </vc-row>
              <vc-row>
                <vc-col :lg="14" :md="14" :sm="14" :xs="14">
                  <div class="full-width center-item">
                    <vc-input v-model="cv.certificate4_name"/>
                  </div>
                </vc-col>
                <vc-col :lg="10" :md="10" :sm="10" :xs="10">
                  <div class="full-width center-item">
                    <el-date-picker
                      v-model="cv.certificate4_year"
                      type="date"
                      placeholder="Pick a day"
                    />
                    <!-- <vc-input v-model="cv.certificate4_year"/> -->
                  </div>
                </vc-col>
              </vc-row>
            </vc-col>
            
          </vc-row>

          <vc-row :gutter="20" class="full-width no-margin-left">
            <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="border no-pading-right label-style-custom">
              <div class="full-width full-height center-item">
                <el-text class="w-150px mb-2">
                  {{ tl('Curriculum vitae', 'Development Process') }}
                </el-text>
              </div>
            </vc-col>
            <vc-col :lg="21" :md="21" :sm="21" :xs="21" class="no-pading-left">
              <div class="full-width center-item">
                <vc-textarea rows="6" v-model="cv.work_process"/>
              </div>
            </vc-col>
          </vc-row>

          <vc-row :gutter="20" class="full-width no-margin-left">
            <vc-col :lg="3" :md="3" :sm="3" :xs="3"  class="border no-pading-right label-style-custom">
              <div class="full-width full-height center-item">
                <el-text class="w-150px mb-2" truncated>
                  {{ tl('Curriculum vitae', 'Note') }}
                </el-text>
              </div>
            </vc-col>
            <vc-col :lg="21" :md="21" :sm="21" :xs="21"  class="no-pading-left">
              <div class="full-width center-item">
                <vc-textarea rows="6" v-model="cv.note"/>
              </div>
            </vc-col>
          </vc-row>
        </vc-row>

        <!-- Technology/Experience -->
        <el-text class="w-150px mb-2 mt-4" tag="b" truncated>
          [Technology/Experience]
        </el-text>
        <vc-row :gutter="20">
          <!-- <div class="full-width center-item">
            <el-text class="mx-1" truncated>
              {{ tl('Curriculum vitae', '◎: Familiarity ○: Can be performed ☆: Can be performed as instructed ●: During education and training') }}
            </el-text>
          </div> -->
          <div v-for="item in technicals">
            <vc-card class="pa-4">
              <vc-card-content>
                <vc-row style="padding-left: 10px; padding-right: 10px">
                  <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="pa-2 pl-7 label-style-custom">
                    <span class="mb-2 center-item bold-item" >
                      {{ item.name }}
                    </span>
                  </vc-col>
                  <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="pa-2 pl-7 label-style-custom">
                    <span class="mb-2 center-item bold-item" >
                      Year experience
                    </span>
                  </vc-col>
                </vc-row>
                <vc-col v-for= "(childItem, index) in item.technicals" :key="index">
                  <vc-row class=" label-style-custom">
                    <vc-input-group-custom required :prop="`technicals.${childItem.name}.${index}`" :labelWidth="leftLabelWidth" :layout="'horizontal'" :label="tl('Curriculum vitae', childItem.name)">
                      <div class="vertical-item pr-2">
                        <!-- <vc-select v-model="childItem.rank" :items="rankTechnicals" fieldValue="key" fieldText="value"></vc-select> -->
                        <!-- <vc-input v-model="childItem.value" /> -->
                        <el-input-number
                          v-model="childItem.value"  
                          :min="1"
                          :controls="false"
                          :disabled="type == POPUP_TYPE.VIEW"
                        />
                      </div>
                    </vc-input-group-custom>
                  </vc-row>
                </vc-col>
              </vc-card-content>
              <vc-confirm ref="confirmDialog"></vc-confirm>
            </vc-card>
          </div>
        </vc-row>
        
        <!-- Business content -->
        <vc-col :md="24" class="d-flex space-between">
          <el-text class="w-150px" tag="b" truncated>
          [Business content]
        </el-text>
        <vc-button v-if="props.type != POPUP_TYPE.VIEW" class="ml-2" @click="BizAddNew" type="primary" :icon="'Plus'" :loading="isLoading" >
          {{ tl("Common", "BtnAddNew") }} 
        </vc-button>
        </vc-col>
        <vc-row :gutter="20">
          <vc-col :span="24">
            <el-scrollbar>
              <vc-table :datas="bizInfos" :tableConfig="tableConfig" :colConfigs="colConfig">
                <template #action="{ data }">
                  <div class="d-flex flex-center">
                    <vc-button type="warning" size="small" class="btn-acttion" @click="onViewTable(data)" :icon="'View'"></vc-button>
                    <vc-button type="primary" size="small" class="btn-acttion" @click="onEditTable(data)" :icon="'Edit'"></vc-button>
                    <vc-button type="danger" code="F00015" size="small" class="btn-acttion" @click="onDeleteItem(data)"
                    :icon="'Delete'">
                    </vc-button>
                  </div>
                </template>
                <template #system_analysis="{ data }">
                  <span v-if="data.system_analysis" class="text-center">○</span>
                </template>
                <template #overview_design="{ data }">
                  <span v-if="data.overview_design" class="text-center">○</span>
                </template>
                <template #basic_design="{ data }">
                  <span v-if="data.basic_design">○</span>
                </template>
                <template #function_design="{ data }">
                  <span v-if="data.function_design">○</span>
                </template>
                <template #detail_design="{ data }">
                  <span v-if="data.detail_design">○</span>
                </template>
                <template #coding="{ data }">
                  <span v-if="data.coding">○</span>
                </template>
                <template #unit_test="{ data }">
                  <span v-if="data.unit_test">○</span>
                </template>
                <template #operation="{ data }">
                  <span v-if="data.operation">○</span>
                </template>
              </vc-table>
            </el-scrollbar>
          </vc-col>
        </vc-row>
    </el-form>
    <vc-confirm ref="confirmDialog"></vc-confirm>
    <detail-modal ref="detailRef" :type="popupType" @submit="handlePopupSubmit"></detail-modal>
  </div>
</template>

<script setup lang="ts">
import tl from "@/utils/locallize";
import validate from "@/utils/validate_elp";
import { POPUP_TYPE } from "@/commons/const";
import { onBeforeMount, reactive, ref } from "vue";
import { colConfig, tableConfig } from "@/commons/config/biz-info.config";
import type { FormInstance } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import technicalCategoryService from "@master/services/technical-category.service";
import cvService from "@master/services/cv-info.service";
import DetailModal from './DetailBizModal.vue'

const router = useRouter();
const route = useRoute();
const leftLabelWidth = ref<any>('200px')
const modal = ref<any>(null);
const technicals = ref<any>([]);
const bizInfos = ref<any>([]);
const cvInfo = ref<any>();
const rankTechnicals = ref<any>([]);
const rankLanguages = ref<any>([]);
const genders = ref<any>([]);
const cvForm = ref<FormInstance>();
const isLoading = ref(false);
const detailRef = ref<any>(null);
const confirmDialog = ref<any>(null);
const _id = route.params.id as string;
const popupType = ref<POPUP_TYPE>(POPUP_TYPE.CREATE);
const props = defineProps<{
  type: POPUP_TYPE;
}>();

onBeforeMount(async () => {
  initData()
  if (_id) await getCvDetail();
  await getListTechnicalCategory();
})

const getListTechnicalCategory = async () => {
  await technicalCategoryService
    .getList({
      page: 1,
      size: 100,
    })
    .then(async (data) => {
      mapDataTechnical(data.data ?? [])
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const getCvDetail = async () => {
  await cvService
    .detail(_id)
    .then(async (data) => {
      mapDataCv(data.data)
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const mapDataTechnical = (technicalData: any) => {
  technicalData?.forEach((item: any) => {
    let technicalList: { id: any; name: any; cvTechInfoId: any; value: null; }[] = []

    item.technicals.forEach((childItem: any) => {

      let cvTechInfo : null;
        
      if(cv?.technicals != null){
        cvTechInfo = cv.technicals.find(x => x.technicalId == childItem.id)
      }

      let technical = {
        id : childItem.id,
        name : childItem.name,
        cvTechInfoId : cvTechInfo?.id,
        value : cvTechInfo?.value
      }
      technicalList.push(technical)
    })

    technicals.value.push({
      id : item.id,
      name : item.name,
      technicals : technicalList
    })
  })
}

const mapDataCv = (cvData: any) => {

  if(cvData != null){
    let cvInfo = {
      id : cvData.id,
      furigana : cvData.furigana,
      is_actived : cvData.is_actived,
      branch: cvData.branch,
      user_code: cvData.user_code,
      name: cvData.name,
      gender: cvData.gender,
      birthday: cvData.birthday,
      lang1_hearing: cvData.lang1_hearing,
      lang1_speaking: cvData.lang1_speaking,
      lang1_reading: cvData.lang1_reading,
      lang1_writing: cvData.lang1_writing,
      lang2_hearing: cvData.lang2_hearing,
      lang2_speaking: cvData.lang2_speaking,
      lang2_reading: cvData.lang2_reading,
      lang2_writing: cvData.lang2_writing,
      last_university_name: cvData.last_university_name,
      subject: cvData.subject,
      graduation_year: cvData.graduation_year,
      certificate1_name: cvData.certificate1_name,
      certificate1_year: cvData.certificate1_year,
      certificate2_name: cvData.certificate2_name,
      certificate2_year: cvData.certificate2_year,
      certificate3_name: cvData.certificate3_name,
      certificate3_year: cvData.certificate3_year,
      certificate4_name: cvData.certificate4_name,
      certificate4_year: cvData.certificate4_year,
      work_process: cvData.work_process,
      note: cvData.note,
      technicals : cvData.cvTechInfos,
      bizInfos : cvData.bizInfos
    };

    Object.assign(cv, cvInfo)
  }
}

const getTechnicalDataToCv = () => {
  cv.cvTechInfos = [];

  technicals.value?.forEach((techItem: any) => {
    techItem.technicals.forEach((childItem: any) => {
      if(childItem.value != null && childItem.value != ""){
        let cvTechnicalInfo = {
          id : childItem.cvTechInfoId,
          cvInfoId : _id,
          technicalId : childItem.id,
          value : childItem.value
        }
        cv.cvTechInfos.push(cvTechnicalInfo)
      }
    })
  })
}

const handlePopupSubmit = (data: any) => {

  let newData = {
    id : data.id,
    prj_name : data.prj_name,
    prj_content : data.prj_content,
    period : data.period,
    system_analysis: data.system_analysis,
    overview_design: data.overview_design,
    basic_design: data.basic_design,
    function_design: data.function_design,
    detail_design: data.detail_design,
    coding: data.coding,
    unit_test: data.unit_test,
    operation: data.operation,
    os_db: data.os_db,
    language: data.language,
    role: data.role,
  }

  let indexItem = bizInfos.value.findIndex(item => item.id === newData.id)

  if(indexItem !== -1){
    bizInfos.value[indexItem] = newData;

  }else{
    bizInfos.value.push(newData)

  }
};

const getBizInfoData = () => {
  cv.bizInfos = [];
}

const rules = reactive({
  name: [
    { label: tl("Curriculum vitae", "Name"), required: true, validator: validate.required, trigger: ["blur"] },
    { label: tl('Role', 'Name'), validator: validate.maxLengthRule, trigger: ["blur"], max: 100 },
  ],
  furigana: [
    { label: tl("Curriculum vitae", "Furigana"), required: true, validator: validate.required, trigger: ["blur"] },
    { label: tl('Role', 'Furigana'), validator: validate.maxLengthRule, trigger: ["blur"], max: 100 },
  ],
  birthday: [{ label: tl("Curriculum vitae", "Birthday"), validator: validate.dateRule, trigger: ["change"] }],
});

const cv = reactive({
  id : null,
  furigana : null,
  is_actived : true,
  name: null,
  branch: null,
  user_code: null,
  gender: null,
  birthday: null,
  lang1_hearing: null,
  lang1_speaking: null,
  lang1_reading: null,
  lang1_writing: null,
  lang2_hearing: null,
  lang2_speaking: null,
  lang2_reading: null,
  lang2_writing: null,
  last_university_name: null,
  subject: null,
  graduation_year: null,
  final_education: null,
  certificate1_name: null,
  certificate1_year: null,
  certificate2_name: null,
  certificate2_year: null,
  certificate3_name: null,
  certificate3_year: null,
  certificate4_name: null,
  certificate4_year: null,
  work_process: null,
  note: null,
  technicals : [],
  bizInfos : []
});

const onSave = async (formEl: FormInstance | undefined) => {
  const valid = await cvForm.value.validate();

  if (!valid) return;
  isLoading.value = true;

  getTechnicalDataToCv()
  
  getBizInfoData()

  if (_id) {
    await cvService.update(cv).finally(() => {
      isLoading.value = false;
    });
  } else {
    await cvService.create(cv).finally(() => {
      isLoading.value = false;
    });
  }
};

const onClose = () => {
  // confirmDialog.value.confirm(
  //   tl("Common", "Close"),
  //   tl("Common", "ConfirmClose"),
  //   (res: any) => {
  //     if (res){
  //       router.goBack()
  //     } 
  //   }
  // );
  router.go(-1)
}

const BizAddNew = () => {
  popupType.value = POPUP_TYPE.CREATE;
  detailRef.value.open()
}

const onEditTable = (item: any) => {
  popupType.value = POPUP_TYPE.EDIT;
  detailRef.value.open(item)
}

const onViewTable = (item: any) => {
  popupType.value = POPUP_TYPE.VIEW;
  detailRef.value.open(item)
}

const onDeleteItem = (item: any) => {
  // confirmDialog.value.confirm(
  //   tl("Common", "Delete"),
  //   tl("Common", "ConfirmDelete", [item.prj_name]),
  //   async (res: any) => {
  //     if (res){
  //       const index = bizInfos.value.findIndex(x => x.id === item.id);
  //       if (index !== -1) {
  //         bizInfos.value.splice(index, 1);
  //       }
  //     } 
  //   }
  // );
  const index = bizInfos.value.findIndex(x => x.id === item.id);
  if (index !== -1) {
    bizInfos.value.splice(index, 1);
  }
}

const initData = () => {
  rankTechnicals.value = [
    {
      key : 1,
      value : '◎'
    },
    {
      key : 2,
      value : '○'
    },
    {
      key : 3,
      value : '☆'
    },
    {
      key : 4,
      value : '●'
    }
  ];

  rankLanguages.value = [
    {
      key : 1,
      value : '○'
    },
    {
      key : 2,
      value : '☆'
    },
    {
      key : 3,
      value : '△'
    },
  ]

  genders.value = [
  {
      key : 0,
      value : tl("Curriculum vitae", "Male")
    },
    {
      key : 1,
      value :  tl("Curriculum vitae", "Female")
    }
  ]
}

</script>

<style>
.custom-header-card {
  padding-left: 10px;
  padding-right: 10px;
}

.full-width {
  width: 100% !important
}

.full-height {
  height: 100%;
}

.center-item {
  display: flex;
  justify-content: center;
}

.bold-item {
  font-weight: bold;
}

.vertical-item {
    display: flex;
    gap: 5px; /* Adjust gap as needed */
}

.no-pading-right {
  padding-right: 0px !important
}

.no-pading {
  padding: 0px !important
}

.no-pading-left {
  padding-left: 0px !important
}

.border {
  border : 1px solid #b9bcc1
}

.no-min-height .el-select__wrapper {
  min-height: 0 !important
}

.full-height-select .el-select__wrapper {
  height: 100%;
}

.display-flex {
  display: flex !important
}

.no-margin-left {
  margin-left: 0 !important
}

.text-center .flex-start {
  justify-content: center !important
}

.label-style-custom {
  background-color: #c7cad2;
}
</style>