<template>
  <vc-modal ref="modal" :title="tl('Curriculum vitae', 'Detail')" width="70%" @close="close">
    <template #content>
      <el-form ref="cvForm" :model="cv" :rules="rules" label-width="200px" label-position="top"
        require-asterisk-position="right" :disabled="type == POPUP_TYPE.VIEW">
        
        <!-- Invidual Info -->
        <vc-row :gutter="20" class="no-margin-left">
          <vc-row :gutter="20" class="full-width no-margin-left">
            <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="no-pading">
              <vc-row style="height: 50%;">
                <div class="full-width full-height center-item border">
                  <el-text class="w-150px mb-2 " truncated>
                    {{ tl('Curriculum vitae', 'Furigana') }}
                  </el-text>  
                </div>
              </vc-row>
              <vc-row style="height: 50%;">
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
                  <vc-col :lg="5" :md="5" :sm="5" :xs="5">
                    <div class="full-width full-height center-item border">
                      <el-text class="w-150px mb-2 " truncated>
                        {{ tl('Curriculum vitae', 'Gender') }}
                      </el-text>  
                    </div>
                  </vc-col>
                  <vc-col :lg="7" :md="7" :sm="7" :xs="7">
                    <div class="full-width full-height center-item border">
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
                      <div class="full-width full-height center-item">
                        <el-text>
                          {{ tl('Curriculum vitae', 'Language') }}
                        </el-text>
                      </div>
                    </vc-col>
                    <vc-col :lg="17" :md="17" :sm="17" :xs="17">
                      <vc-row class="border">
                        <div class="full-width full-height center-item">
                          <el-text size="small" truncated>
                            {{ tl('Curriculum vitae', '○: No problem ☆: Connected △: Elementary') }}
                          </el-text>
                        </div>
                      </vc-row>
                      <vc-row>
                        <vc-col :lg="12" :md="12" :sm="12" :xs="12">
                          <vc-row class="border">
                            <div class="full-width full-height center-item">
                              <el-text>
                                {{ tl('Curriculum vitae', 'Conversation') }}
                              </el-text>
                            </div>
                          </vc-row>
                          <vc-row>
                            <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="border">
                              <div class="full-width full-height center-item">
                                <el-text>
                                  {{ tl('Curriculum vitae', 'Listen') }}
                                </el-text>
                              </div>
                            </vc-col>
                            <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="border">
                              <div class="full-width full-height center-item">
                                <el-text>
                                  {{ tl('Curriculum vitae', 'Speak') }}
                                </el-text>
                              </div>
                            </vc-col>
                          </vc-row>
                        </vc-col>
                        <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="d-flex">
                          <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="border full-height">
                            <div class="full-width full-height center-item">
                              <el-text>
                                {{ tl('Curriculum vitae', 'Read') }}
                              </el-text>
                            </div>
                          </vc-col>
                          <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="border full-height">
                            <div class="full-width full-height center-item">
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
                      <div class="full-width full-height center-item">
                        <el-text>
                          {{ tl('Curriculum vitae', 'English') }}
                        </el-text>
                      </div>
                    </vc-col>
                    <vc-col :lg="17" :md="17" :sm="17" :xs="17" class="d-flex">
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                    </vc-col>
                  </vc-row>
                  <vc-row>
                    <vc-col :lg="7" :md="7" :sm="7" :xs="7" class="border">
                      <div class="full-width full-height center-item">
                        <el-text>
                          {{ tl('Curriculum vitae', 'Janpanese') }}
                        </el-text>
                      </div>
                    </vc-col>
                    <vc-col :lg="17" :md="17" :sm="17" :xs="17" class="d-flex">
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height" ></vc-select>
                      </vc-col>
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                      <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                        <vc-select :items="rankLanguages" fieldValue="key" fieldText="value" class="no-min-height"></vc-select>
                      </vc-col>
                    </vc-col>
                  </vc-row>
                </vc-col>
            </vc-col>
          </vc-row>

          <vc-row :gutter="20" class="full-width no-margin-left">
            <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="border no-pading-right">
              <div class="full-width full-height center-item">
                <el-text class="w-150px mb-2 " truncated>
                  {{ tl('Curriculum vitae', 'Education') }}
                </el-text>  
              </div>
            </vc-col>
            <vc-col :lg="6" :md="6" :sm="6" :xs="6" class=" no-pading">
              <vc-row class="border">
                <div class="full-width full-height center-item">
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
                <div class="full-width full-height center-item">
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
                <div class="full-width full-height center-item">
                    <el-text class="w-150px mb-2" truncated>
                      {{ tl('Curriculum vitae', 'Graduation year') }}
                    </el-text>
                  </div>
              </vc-row>
              <vc-row>
                <vc-input v-model="cv.graduation_year"/>
              </vc-row>
            </vc-col>
            <vc-col :lg="5" :md="5" :sm="5" :xs="5" class="no-pading-left">
              <vc-row class="border">
                <div class="full-width full-height center-item">
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
            <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="border no-pading-right">
              <div class="full-width full-height center-item">
                <el-text class="w-150px mb-2">
                  {{ tl('Curriculum vitae', 'Other qualifications') }}
                </el-text>
              </div>
            </vc-col>
            <vc-col :lg="21" :md="21" :sm="21" :xs="21" class="no-pading-left"> 
              <vc-row>
                <vc-col :lg="14" :md="14" :sm="14" :xs="14" class="border no-pading">
                  <div class="full-width full-height center-item">
                    <el-text class="w-150px mb-2" truncated>
                      {{ tl('Curriculum vitae', 'Qualification') }}
                    </el-text>
                  </div>
                </vc-col>
                <vc-col :lg="10" :md="10" :sm="10" :xs="10" class="border">
                  <div class="full-width full-height center-item">
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
                    <vc-input v-model="cv.certificate1_year" />
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
                    <vc-input v-model="cv.certificate2_year"/>
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
                    <vc-input v-model="cv.certificate3_year"/>
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
                    <vc-input v-model="cv.certificate4_year"/>
                  </div>
                </vc-col>
              </vc-row>
            </vc-col>
            
          </vc-row>

          <vc-row :gutter="20" class="full-width no-margin-left">
            <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="border no-pading-right">
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
            <vc-col :lg="3" :md="3" :sm="3" :xs="3"  class="border no-pading-right">
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
          <div v-for="item in techCatDataGrid">
            <vc-card class="pa-4">
              <vc-card-content>
                <vc-row>
                  <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="pa-2">
                    <span class="mb-2 center-item bold-item" >
                      {{ item.name }}
                    </span>
                  </vc-col>
                  <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="pa-2">
                    <span class="mb-2 center-item bold-item" >
                      Year experience
                    </span>
                  </vc-col>
                </vc-row>
                <vc-col v-for= "(childItem, index) in item.technicals" :key="index">
                  <vc-row>
                    <vc-input-group-custom required :prop="`technicals.${childItem.name}.${index}`" :labelWidth="leftLabelWidth" :layout="'horizontal'" :label="tl('Curriculum vitae', childItem.name)">
                      <div class="vertical-item">
                        <!-- <vc-select v-model="childItem.rank" :items="rankTechnicals" fieldValue="key" fieldText="value"></vc-select> -->
                        <vc-input v-model="childItem.year" :disabled="type != POPUP_TYPE.CREATE" />
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
        <vc-button class="ml-2" @click="onAddNewBiz" type="primary" :icon="'Plus'">
          {{ tl("Common", "BtnAddNew") }} 
        </vc-button>
        </vc-col>
        <vc-row :gutter="20">
          <vc-col :span="24">
            <el-scrollbar>
              <vc-table :datas="dataGrid" :tableConfig="tableConfig" :colConfigs="colConfig">
                <template #prj_name="{ dataGrid }">
                  <vc-input/>
                </template>
                <template #prj_content="{ dataGrid }">
                  <vc-input></vc-input>
                </template>
                <template #period="{ dataGrid }">
                  <vc-input ></vc-input>
                </template>
                <template #system_analysis="{ dataGrid }">
                  <vc-input ></vc-input>
                </template>
                <template #overview_design="{ dataGrid }">
                  <vc-input ></vc-input>
                </template>
                <template #basic_design="{ dataGrid }">
                  <vc-input ></vc-input>
                </template>
                <template #functional_design="{ dataGrid }">
                  <vc-input ></vc-input>
                </template>
                <template #detailed_design="{ dataGrid }">
                  <vc-input ></vc-input>
                </template>
                <template #coding="{ dataGrid }">
                  <vc-input ></vc-input>
                </template>
                <template #unit_test="{ dataGrid }">
                  <vc-input ></vc-input>
                </template>
                <template #operation="{ dataGrid }">
                  <vc-input ></vc-input>
                </template>
                <template #os_db="{ dataGrid }">
                  <vc-input ></vc-input>
                </template>
                <template #language="{ dataGrid }">
                  <vc-input ></vc-input>
                </template>
                <template #role="{ dataGrid }">
                  <vc-input ></vc-input>
                </template>
              </vc-table>
            </el-scrollbar>
          </vc-col>
        </vc-row>
      </el-form>
    </template>
    <template #acttion>
      <vc-button v-if="props.type != POPUP_TYPE.VIEW" type="primary" class="ml-2" code="F00004" @click="onSave(cvForm)"
        :loading="isLoading" :icon="'FolderChecked'">
        {{ tl("Common", "BtnSave") }}
      </vc-button>
    </template>
  </vc-modal>
</template>

<script setup lang="ts">
import tl from "@/utils/locallize";
import validate from "@/utils/validate_elp";
import { POPUP_TYPE } from "@/commons/const";
import { reactive, ref } from "vue";
import { useCvInfoStore } from '@master/stores/cv-info.store'
import { colConfig, tableConfig } from "@/commons/config/biz-info.config";
import type { Cv } from "../../interfaces/cv.interface";
import type { FormInstance } from "element-plus";

// import { BizInfo } from "@/master/interfaces/bizInfo.interface";

const cvInfoStore = useCvInfoStore()
const leftLabelWidth = ref<any>('200px')
const languageLabelWidth = ref<any>('45px')
const modal = ref<any>(null);
const techCatDataGrid = ref<any[]>([]);
const rankTechnicals = ref<any>([]);
const rankLanguages = ref<any>([]);
const genders = ref<any>([]);
const dataGrid = ref<any[]>([]);
const cvForm = ref<FormInstance>();
const isLoading = ref(false);

const props = defineProps<{
  type: POPUP_TYPE;
}>();

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
})

const open = async (techCatData: any, cvData: any) => {

  initData();
  
  techCatData?.forEach((item: any) => {
    let technicalList: { id: any; name: any; value: null; }[] = []

    item.technicals.forEach((childItem: any) => {
      let technical = {
        id : childItem.id,
        name : childItem.name,
        value : null
      }
      technicalList.push(technical)
    })

    techCatDataGrid.value.push({
      id : item.id,
      name : item.name,
      technicals : technicalList
    })
  })

  console.log(techCatDataGrid);

  techMapData(techCatDataGrid, cvData);

  if(cvData != null){
    bizMapData(cvData);
  }
 
  let cvInfo = {
    id : '',
    furigana : null,
    is_actived : true,
    name: null,
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
  };

  Object.assign(cv, cvInfo)

  // techCatDataGrid.value = techCatData;

  console.log(cvData);
  
  modal.value.open();
};

const onSave = async (formEl: FormInstance | undefined) => {
  // if (!formEl) return;

  // await formEl.validate(async (valid) => {
  //   if (!valid) return;

  //   isLoading.value = true;
    
  // });
  console.log(techCatDataGrid.value);

};

const close = () => {
  dataGrid.value = []
  techCatDataGrid.value = []
  if(cvForm.value){
    cvForm.value.resetFields()
  }
  modal.value.close()
}

const techMapData = (techData: any,cvData: any) => [
  // cvData.forEach
]

const bizMapData = (item: any) => {
  var itemData = {...item}

  itemData.bizInfos.forEach((element: any) => {
    dataGrid.value.push(
      {
        prj_name : element.prj_name,
        prj_content : element.prj_content,
        period : element.period,
        system_analysis : element.system_analysis,
        overview_design : element.overview_design,
        basic_design : element.basic_design,
        functional_design : element.functional_design,
        detailed_design : element.detailed_design,
        coding : element.coding,
        unit_test : element.unit_test,
        operation : element.operation,
        os_db : element.os_db,
        language : element.language,
        role : element.role
      }
    )
  })

  // cv.bizInfos = dataGrid;
  // console.log(dataGrid);
}

const onAddNewBiz = () => {
  dataGrid.value.push({
        prj_name : "",
        prj_content : "",
        period : "",
        system_analysis : "",
        overview_design : "",
        basic_design : "",
        functional_design : "",
        detailed_design : "",
        coding : "",
        unit_test : "",
        operation : "",
        os_db : "",
        language : "",
        role : ""
      })
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

defineExpose({
  open,
  close,
});

</script>

<style>
.custom-header-card {
  padding-left: 10px;
  padding-right: 10px;
}

.full-width {
  width: 100%;
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
</style>