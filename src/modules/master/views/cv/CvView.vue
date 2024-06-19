<template>
  <div class="vc-page page-dashboard">
    <vc-row class="mt-4 mb-4">
      <vc-col :span="6" class="d-flex"> </vc-col>

      <vc-col :md="18" class="d-flex flex-end">
        <select v-model="$i18n.locale">
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>

        <input
          type="file"
          @change="handleFileUpload"
          accepted=".xlxs"
          id="Import"
          style="display: none"
        />
        <vc-button
          class="ml-2"
          @click="onImport"
          type="success"
          :icon="'Upload'"
          :loading="isLoading"
          v-if="!_id"
        >
          {{ tl('Common', 'BtnImportExcel') }}
        </vc-button>

        <vc-button
          class="ml-2"
          @click="onSave"
          type="primary"
          :icon="'FolderChecked'"
          :loading="isLoading"
        >
          {{ tl('Common', 'BtnSave') }}
        </vc-button>
        <vc-button
          class="ml-2"
          @click="onClose"
          type="info"
          :icon="'Close'"
          :loading="isLoading"
        >
          {{ tl('Common', 'BtnClose') }}
        </vc-button>
      </vc-col>
    </vc-row>

    <el-form
      ref="cvForm"
      :model="cv"
      :rules="rules"
      label-width="200px"
      label-position="top"
      require-asterisk-position="right"
      :disabled="type == POPUP_TYPE.VIEW"
    >
      <!-- Invidual Info -->
      <vc-row :gutter="20" class="no-margin-left">
        <vc-row :gutter="20" class="full-width no-margin-left">
          <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="no-pading">
            <div
              class="full-width full-height center-item border label-style-custom"
            >
              <el-text class="w-150px mb-2" truncated>
                {{ tl('Curriculum vitae', $t('user_code')) }}
              </el-text>
            </div>
          </vc-col>
          <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="no-pading">
            <vc-input v-model="cv.user_code" class="full-height" />
          </vc-col>
          <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="no-pading">
            <div
              class="full-width full-height center-item border label-style-custom"
            >
              <el-text class="w-150px mb-2" truncated>
                {{ tl('Curriculum vitae', $t('branch')) }}
              </el-text>
            </div>
          </vc-col>
          <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="no-pading">
            <vc-input v-model="cv.branch" class="full-height" />
          </vc-col>
        </vc-row>
        <vc-row :gutter="20" class="full-width no-margin-left">
          <vc-col :lg="3" :md="3" :sm="3" :xs="3" class="no-pading">
            <vc-row style="height: 50%" class="label-style-custom">
              <div class="full-width full-height center-item border">
                <el-text class="w-150px mb-2" truncated>
                  {{ tl('Curriculum vitae', $t('furigana')) }}
                </el-text>
              </div>
            </vc-row>
            <vc-row style="height: 50%" class="label-style-custom">
              <div class="full-width full-height center-item border">
                <el-text class="w-150px mb-2" truncated>
                  {{ tl('Curriculum vitae', $t('fullname')) }}
                </el-text>
              </div>
            </vc-row>
          </vc-col>
          <vc-col
            :lg="21"
            :md="21"
            :sm="21"
            :xs="21"
            class="no-pading-left display-flex"
          >
            <vc-col
              :lg="14"
              :md="14"
              :sm="14"
              :xs="14"
              class="full-width full-height center-item no-pading"
            >
              <vc-row class="no-pading-left" style="height: 50%">
                <vc-col :lg="12" :md="12" :sm="12" :xs="12">
                  <vc-input v-model="cv.furigana" class="full-height" />
                </vc-col>
                <vc-col
                  :lg="5"
                  :md="5"
                  :sm="5"
                  :xs="5"
                  class="label-style-custom"
                >
                  <div class="full-width full-height center-item border">
                    <el-text class="w-150px mb-2" truncated>
                      {{ tl('Curriculum vitae', $t('gender')) }}
                    </el-text>
                  </div>
                </vc-col>
                <vc-col :lg="7" :md="7" :sm="7" :xs="7">
                  <div
                    class="full-width full-height center-item border label-style-custom"
                  >
                    <el-text class="w-150px mb-2" truncated>
                      {{ tl('Curriculum vitae', $t('birthday')) }}
                    </el-text>
                  </div>
                </vc-col>
              </vc-row>
              <vc-row style="height: 50%">
                <vc-col :lg="12" :md="12" :sm="12" :xs="12">
                  <!-- <vc-input v-model="cv.name"/> -->
                  <vc-input v-model="cv.name" class="full-height" />
                </vc-col>
                <vc-col :lg="5" :md="5" :sm="5" :xs="5">
                  <vc-select
                    v-model="cv.gender"
                    :items="genders"
                    fieldValue="key"
                    fieldText="value"
                    class="full-height full-height-select"
                  ></vc-select>
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
                  <div
                    class="full-width full-height center-item label-style-custom"
                  >
                    <el-text>
                      {{ tl('Curriculum vitae', $t('language')) }}
                    </el-text>
                  </div>
                </vc-col>
                <vc-col :lg="17" :md="17" :sm="17" :xs="17">
                  <vc-row class="border">
                    <div
                      class="full-width full-height center-item label-style-custom"
                    >
                      <el-text size="small" truncated>
                        {{ tl('Curriculum vitae', $t('evaluate')) }}
                      </el-text>
                    </div>
                  </vc-row>
                  <vc-row>
                    <vc-col :lg="12" :md="12" :sm="12" :xs="12">
                      <vc-row class="border">
                        <div
                          class="full-width full-height center-item label-style-custom"
                        >
                          <el-text>
                            {{ tl('Curriculum vitae', $t('conversation')) }}
                          </el-text>
                        </div>
                      </vc-row>
                      <vc-row>
                        <vc-col
                          :lg="12"
                          :md="12"
                          :sm="12"
                          :xs="12"
                          class="border"
                        >
                          <div
                            class="full-width full-height center-item label-style-custom"
                          >
                            <el-text>
                              {{ tl('Curriculum vitae', $t('listen')) }}
                            </el-text>
                          </div>
                        </vc-col>
                        <vc-col
                          :lg="12"
                          :md="12"
                          :sm="12"
                          :xs="12"
                          class="border"
                        >
                          <div
                            class="full-width full-height center-item label-style-custom"
                          >
                            <el-text>
                              {{ tl('Curriculum vitae', $t('speak')) }}
                            </el-text>
                          </div>
                        </vc-col>
                      </vc-row>
                    </vc-col>
                    <vc-col :lg="12" :md="12" :sm="12" :xs="12" class="d-flex">
                      <vc-col
                        :lg="12"
                        :md="12"
                        :sm="12"
                        :xs="12"
                        class="border full-height"
                      >
                        <div
                          class="full-width full-height center-item label-style-custom"
                        >
                          <el-text>
                            {{ tl('Curriculum vitae', $t('read')) }}
                          </el-text>
                        </div>
                      </vc-col>
                      <vc-col
                        :lg="12"
                        :md="12"
                        :sm="12"
                        :xs="12"
                        class="border full-height"
                      >
                        <div
                          class="full-width full-height center-item label-style-custom"
                        >
                          <el-text>
                            {{ tl('Curriculum vitae', $t('write')) }}
                          </el-text>
                        </div>
                      </vc-col>
                    </vc-col>
                  </vc-row>
                </vc-col>
              </vc-row>
              <vc-row>
                <vc-col :lg="7" :md="7" :sm="7" :xs="7" class="border">
                  <div
                    class="full-width full-height center-item label-style-custom"
                  >
                    <el-text>
                      {{ tl('Curriculum vitae', $t('english')) }}
                    </el-text>
                  </div>
                </vc-col>
                <vc-col :lg="17" :md="17" :sm="17" :xs="17" class="d-flex">
                  <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                    <vc-select
                      v-model="cv.lang1_hearing"
                      :items="rankLanguages"
                      fieldValue="key"
                      fieldText="value"
                      class="no-min-height"
                      clearable
                    ></vc-select>
                  </vc-col>
                  <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                    <vc-select
                      v-model="cv.lang1_speaking"
                      :items="rankLanguages"
                      fieldValue="key"
                      fieldText="value"
                      class="no-min-height"
                      clearable
                    ></vc-select>
                  </vc-col>
                  <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                    <vc-select
                      v-model="cv.lang1_reading"
                      :items="rankLanguages"
                      fieldValue="key"
                      fieldText="value"
                      class="no-min-height"
                      clearable
                    ></vc-select>
                  </vc-col>
                  <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                    <vc-select
                      v-model="cv.lang1_writing"
                      :items="rankLanguages"
                      fieldValue="key"
                      fieldText="value"
                      class="no-min-height"
                      clearable
                    ></vc-select>
                  </vc-col>
                </vc-col>
              </vc-row>
              <vc-row>
                <vc-col :lg="7" :md="7" :sm="7" :xs="7" class="border">
                  <div
                    class="full-width full-height center-item label-style-custom"
                  >
                    <el-text>
                      {{ tl('Curriculum vitae', $t('japanese')) }}
                    </el-text>
                  </div>
                </vc-col>
                <vc-col :lg="17" :md="17" :sm="17" :xs="17" class="d-flex">
                  <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                    <vc-select
                      v-model="cv.lang2_hearing"
                      :items="rankLanguages"
                      fieldValue="key"
                      fieldText="value"
                      class="no-min-height"
                      clearable
                    ></vc-select>
                  </vc-col>
                  <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                    <vc-select
                      v-model="cv.lang2_speaking"
                      :items="rankLanguages"
                      fieldValue="key"
                      fieldText="value"
                      class="no-min-height"
                      clearable
                    ></vc-select>
                  </vc-col>
                  <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                    <vc-select
                      v-model="cv.lang2_reading"
                      :items="rankLanguages"
                      fieldValue="key"
                      fieldText="value"
                      class="no-min-height"
                      clearable
                    ></vc-select>
                  </vc-col>
                  <vc-col :lg="6" :md="6" :sm="6" :xs="6">
                    <vc-select
                      v-model="cv.lang2_writing"
                      :items="rankLanguages"
                      fieldValue="key"
                      fieldText="value"
                      class="no-min-height"
                      clearable
                    ></vc-select>
                  </vc-col>
                </vc-col>
              </vc-row>
            </vc-col>
          </vc-col>
        </vc-row>

        <vc-row :gutter="20" class="full-width no-margin-left">
          <vc-col
            :lg="3"
            :md="3"
            :sm="3"
            :xs="3"
            class="border no-pading-right label-style-custom"
          >
            <div class="full-width full-height center-item">
              <el-text class="w-150px mb-2" truncated>
                {{ tl('Curriculum vitae', $t('education')) }}
              </el-text>
            </div>
          </vc-col>
          <vc-col :lg="6" :md="6" :sm="6" :xs="6" class="no-pading">
            <vc-row class="border">
              <div
                class="full-width full-height center-item label-style-custom"
              >
                <el-text class="w-150px mb-2" truncated>
                  {{ tl('Curriculum vitae', $t('university')) }}
                </el-text>
              </div>
            </vc-row>
            <vc-row>
              <vc-input v-model="cv.last_university_name" />
            </vc-row>
          </vc-col>
          <vc-col :lg="5" :md="5" :sm="5" :xs="5" class="no-pading">
            <vc-row class="border">
              <div
                class="full-width full-height center-item label-style-custom"
              >
                <el-text class="w-150px mb-2" truncated>
                  {{ tl('Curriculum vitae', $t('department')) }}
                </el-text>
              </div>
            </vc-row>
            <vc-row>
              <vc-input v-model="cv.subject" />
            </vc-row>
          </vc-col>
          <vc-col :lg="5" :md="5" :sm="5" :xs="5" class="no-pading">
            <vc-row class="border">
              <div
                class="full-width full-height center-item label-style-custom"
              >
                <el-text class="w-150px mb-2" truncated>
                  {{ tl('Curriculum vitae', $t('graduation')) }}
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
              <div
                class="full-width full-height center-item label-style-custom"
              >
                <el-text class="w-150px mb-2" truncated>
                  {{ tl('Curriculum vitae', $t('final_education')) }}
                </el-text>
              </div>
            </vc-row>
            <vc-row>
              <vc-input v-model="cv.final_education" />
            </vc-row>
          </vc-col>
        </vc-row>

        <vc-row :gutter="20" class="full-width no-margin-left">
          <vc-col
            :lg="3"
            :md="3"
            :sm="3"
            :xs="3"
            class="border no-pading-right label-style-custom"
          >
            <div class="full-width full-height center-item">
              <el-text class="w-150px mb-2">
                {{ tl('Curriculum vitae', $t('other_qualification')) }}
              </el-text>
            </div>
          </vc-col>
          <vc-col :lg="21" :md="21" :sm="21" :xs="21" class="no-pading-left">
            <vc-row>
              <vc-col
                :lg="14"
                :md="14"
                :sm="14"
                :xs="14"
                class="border no-pading"
              >
                <div
                  class="full-width full-height center-item label-style-custom"
                >
                  <el-text class="w-150px mb-2" truncated>
                    {{ tl('Curriculum vitae', $t('qualification')) }}
                  </el-text>
                </div>
              </vc-col>
              <vc-col :lg="10" :md="10" :sm="10" :xs="10" class="border">
                <div
                  class="full-width full-height center-item label-style-custom"
                >
                  <el-text class="w-150px mb-2" truncated>
                    {{ tl('Curriculum vitae', $t('acquisition_date')) }}
                  </el-text>
                </div>
              </vc-col>
            </vc-row>
            <vc-row class="no-pading">
              <vc-col :lg="14" :md="14" :sm="14" :xs="14">
                <div class="full-width center-item">
                  <vc-input v-model="cv.certificate1_name" />
                </div>
              </vc-col>
              <vc-col :lg="10" :md="10" :sm="10" :xs="10">
                <div class="full-width center-item">
                  <!-- <el-date-picker
                    v-model="cv.certificate1_year"
                    type="date"
                    placeholder="Pick a day"
                  /> -->
                  <el-input-number
                    v-model="cv.certificate1_year"
                    :min="1"
                    class="full-width"
                    :controls="false"
                  />
                  <!-- <vc-input v-model="cv.certificate1_year" /> -->
                </div>
              </vc-col>
            </vc-row>
            <vc-row>
              <vc-col :lg="14" :md="14" :sm="14" :xs="14">
                <div class="full-width center-item">
                  <vc-input v-model="cv.certificate2_name" />
                </div>
              </vc-col>
              <vc-col :lg="10" :md="10" :sm="10" :xs="10">
                <div class="full-width center-item">
                  <el-input-number
                    v-model="cv.certificate2_year"
                    :min="1"
                    class="full-width"
                    :controls="false"
                  />
                  <!-- <vc-input v-model="cv.certificate2_year"/> -->
                </div>
              </vc-col>
            </vc-row>
            <vc-row>
              <vc-col :lg="14" :md="14" :sm="14" :xs="14">
                <div class="full-width center-item">
                  <vc-input v-model="cv.certificate3_name" />
                </div>
              </vc-col>
              <vc-col :lg="10" :md="10" :sm="10" :xs="10">
                <div class="full-width center-item">
                  <el-input-number
                    v-model="cv.certificate3_year"
                    :min="1"
                    class="full-width"
                    :controls="false"
                  />
                  <!-- <vc-input v-model="cv.certificate3_year"/> -->
                </div>
              </vc-col>
            </vc-row>
          </vc-col>
        </vc-row>

        <vc-row :gutter="20" class="full-width no-margin-left">
          <vc-col
            :lg="3"
            :md="3"
            :sm="3"
            :xs="3"
            class="border no-pading-right label-style-custom"
          >
            <div class="full-width full-height center-item">
              <el-text class="w-150px mb-2">
                {{ tl('Curriculum vitae', $t('development_process')) }}
              </el-text>
            </div>
          </vc-col>
          <vc-col :lg="21" :md="21" :sm="21" :xs="21" class="no-pading-left">
            <div class="full-width center-item">
              <vc-textarea rows="6" v-model="cv.work_process" />
            </div>
          </vc-col>
        </vc-row>

        <vc-row :gutter="20" class="full-width no-margin-left">
          <vc-col
            :lg="3"
            :md="3"
            :sm="3"
            :xs="3"
            class="border no-pading-right label-style-custom"
          >
            <div class="full-width full-height center-item">
              <el-text class="w-150px mb-2" truncated>
                {{ tl('Curriculum vitae', $t('note')) }}
              </el-text>
            </div>
          </vc-col>
          <vc-col :lg="21" :md="21" :sm="21" :xs="21" class="no-pading-left">
            <div class="full-width center-item">
              <vc-textarea rows="6" v-model="cv.note" />
            </div>
          </vc-col>
        </vc-row>
      </vc-row>

      <!-- Technology/Experience -->
      <el-text class="w-150px mb-2 mt-4" tag="b" truncated>
        {{ $t('technical_experience') }}
      </el-text>
      <vc-row :gutter="20">
        <!-- <div class="full-width center-item">
          <el-text class="mx-1" truncated>
            {{ tl('Curriculum vitae', '◎: Familiarity ○: Can be performed ☆: Can be performed as instructed ●: During education and training') }}
          </el-text>
        </div> -->
        <vc-card v-for="item in technicals" class="pa-4">
          <vc-card-content>
            <vc-row
              style="padding-left: 10px; padding-right: 10px; width: 429px"
            >
              <vc-col
                :lg="4"
                :md="4"
                :sm="4"
                :xs="4"
                class="label-style-custom"
              >
                <vc-button
                  @click="TechnicalCategoryDelete(item.id)"
                  type="info"
                  :icon="'Close'"
                  :loading="isLoading"
                  class="invisible hover:visible label-style-custom"
                >
                </vc-button>
              </vc-col>
              <vc-col
                :lg="10"
                :md="10"
                :sm="10"
                :xs="10"
                class="pa-2 label-style-custom"
              >
                <span class="mb-2 center-item bold-item">
                  {{ item.name }}
                </span>
              </vc-col>
              <vc-col
                :lg="10"
                :md="10"
                :sm="10"
                :xs="10"
                style="padding-right: 8px"
                class="pa-2 pl-7 label-style-custom"
              >
                <span class="mb-2 center-item bold-item">
                  {{ $t('year_experience') }}
                </span>
              </vc-col>
            </vc-row>
            <vc-col v-for="(childItem, index) in item.technicals" :key="index">
              <vc-row class="label-style-custom">
                <vc-button
                  @click="TechnicalDelete(childItem.id)"
                  type="info"
                  :icon="'Close'"
                  :loading="isLoading"
                  class="invisible hover:visible"
                >
                </vc-button>
                <vc-input-group-custom
                  required
                  :prop="`technicals.${childItem.name}.${index}`"
                  :labelWidth="leftLabelWidth"
                  :layout="'horizontal'"
                  :label="tl('Curriculum vitae', childItem.name)"
                >
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
            <vc-col>
              <vc-row class="label-style-custom">
                <div class="vertical-item flex-center w-100 pa-4">
                  <vc-button
                    @click="TechnicalAddNew(item.id)"
                    type="primary"
                    :icon="'Plus'"
                    :loading="isLoading"
                  >
                    {{ tl('Common', 'BtnAddNew') }}
                  </vc-button>
                </div>
              </vc-row>
            </vc-col>
          </vc-card-content>
          <vc-confirm ref="confirmDialog"></vc-confirm>
        </vc-card>
        <vc-card class="pa-4">
          <vc-card-content>
            <vc-col>
              <vc-row class="label-style-custom">
                <div class="vertical-item flex-center w-100">
                  <vc-button
                    @click="TechnicalCategoryAddNew"
                    type="primary"
                    :icon="'Plus'"
                    :loading="isLoading"
                  >
                    {{ tl('Common', 'BtnAddTechnicalCategory') }}
                  </vc-button>
                </div>
              </vc-row>
            </vc-col>
          </vc-card-content>
          <vc-confirm ref="confirmDialog"></vc-confirm>
        </vc-card>
      </vc-row>

      <!-- Business content -->
      <vc-col :md="24" class="d-flex space-between">
        <el-text class="w-150px" tag="b" truncated>
          {{ $t('business_content') }}
        </el-text>
        <vc-button
          v-if="props.type != POPUP_TYPE.VIEW"
          class="ml-2"
          @click="BizAddNew"
          type="primary"
          :icon="'Plus'"
          :loading="isLoading"
        >
          {{ tl('Common', 'BtnAddNew') }}
        </vc-button>
      </vc-col>
      <vc-row :gutter="20">
        <vc-col :span="24">
          <el-scrollbar>
            <vc-table
              :datas="bizInfos"
              :tableConfig="tableConfig"
              :colConfigs="colConfig"
            >
              <template #action="{ data }">
                <div class="d-flex flex-center">
                  <vc-button
                    type="warning"
                    size="small"
                    class="btn-acttion"
                    @click="onViewTable(data)"
                    :icon="'View'"
                  ></vc-button>
                  <vc-button
                    type="primary"
                    size="small"
                    class="btn-acttion"
                    @click="onEditTable(data)"
                    :icon="'Edit'"
                  ></vc-button>
                  <vc-button
                    type="danger"
                    code="F00015"
                    size="small"
                    class="btn-acttion"
                    @click="onDeleteItem(data)"
                    :icon="'Delete'"
                  >
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
                <span v-if="data.functional_design">○</span>
              </template>
              <template #detail_design="{ data }">
                <span v-if="data.detailed_design">○</span>
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
    <detail-modal
      ref="detailRef"
      :type="popupType"
      @submit="handlePopupSubmit"
    ></detail-modal>
    <add-technical-category-modal
      ref="addTechnicalCategoryRef"
      :type="popupType"
      @submit="handleAddTechnicalCategoryPopupSubmit"
    ></add-technical-category-modal>
    <add-technical-modal
      ref="addTechnicalRef"
      :type="popupType"
      @submit="handleAddTechnicalPopupSubmit"
    ></add-technical-modal>
  </div>
  <vc-confirm ref="confirmPopupRef"></vc-confirm>
</template>

<script setup lang="ts">
  import tl from '@/utils/locallize'
  import validate from '@/utils/validate_elp'
  import * as XLSX from 'xlsx'
  import { POPUP_TYPE } from '@/commons/const'
  import { onBeforeMount, onMounted, reactive, ref } from 'vue'
  import { colConfig, tableConfig } from '@/commons/config/biz-info.config'
  import type { FormInstance } from 'element-plus'
  import { useRouter, useRoute } from 'vue-router'
  import technicalService from '@master/services/technical.service'
  import cvService from '@master/services/cv-info.service'
  import DetailModal from './DetailBizModal.vue'
  import AddTechnicalCategoryModal from './AddTechnicalCategoryModal.vue'
  import AddTechnicalModal from './AddTechnicalModal.vue'
  import { useToastStore } from '@/stores/toast.store'
  import technicalCategoryService from '@master/services/technical-category.service'
  import { useI18n } from 'vue-i18n'

  const router = useRouter()
  const route = useRoute()
  const leftLabelWidth = ref<any>('200px')
  const modal = ref<any>(null)
  const technicals = ref<any>([])
  const bizInfos = ref<any>([])
  const cvInfo = ref<any>()
  const rankTechnicals = ref<any>([])
  const rankLanguages = ref<any>([])
  const genders = ref<any>([])
  const cvForm = ref<FormInstance>()
  const isLoading = ref(false)
  const detailRef = ref<any>(null)
  const addTechnicalCategoryRef = ref<any>(null)
  const confirmPopupRef = ref<any>(null)
  const addTechnicalRef = ref<any>(null)
  const confirmDialog = ref<any>(null)
  const _id = route.params.id as string
  const popupType = ref<POPUP_TYPE>(POPUP_TYPE.CREATE)
  const toastStore = useToastStore()
  const props = defineProps<{
    type: POPUP_TYPE
  }>()
  const { t } = useI18n()

  onBeforeMount(async () => {
    await onReload()
  })

  const getListTechnicalCategory = async () => {
    await technicalCategoryService
      .getList({
        page: 1,
        size: 9999,
      })
      .then(async (data) => {
        mapDataTechnical(data.data ?? [])
      })
  }

  const sheet = ref([])
  const json = ref([])

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      sheet.value = worksheet

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      json.value = jsonData
      mappingFromFile()
    }

    reader.readAsArrayBuffer(file)
  }
  const onImport = async () => {
    await document.getElementById('Import').click()
  }
  const mappingValueLanguage = {
    '○': 1,
    '☆': 2,
    '△': 3,
  }
  const mappingFromFile = () => {
    mappingInfoCV()
    mappingBiz()
    mappingTech()
  }
  const mappingInfoCV = () => {
    const index_sheet = {
      furigana: 'J2',
      name: 'J4',
      gender: 'AF4',
      birthday: 'AJ4',
      lang1_hearing: 'AT5',
      lang1_speaking: 'AW5',
      lang1_reading: 'BA5',
      lang1_writing: 'BE5',
      lang2_hearing: 'AT6',
      lang2_speaking: 'AW6',
      lang2_reading: 'BA6',
      lang2_writing: 'BE6',
      last_university_name: 'J8',
      subject: 'AD8',
      graduation_year: 'AP8',
      final_education: 'AW8',
      certificate1_name: 'K10',
      certificate1_year: 'AW10',
      certificate2_name: 'K11',
      certificate2_year: 'AW11',
      certificate3_name: 'K12',
      certificate3_year: 'AW12',
      work_process: 'J13',
      note: 'J22',
    }
    // alert(cv)
    for (const i in index_sheet) {
      const cell = index_sheet[i]
      let value = sheet.value[cell] ? sheet.value[cell].v : null
      if (i == 'birthday') {
        const nowYear = new Date().getFullYear()
        value = new Date(nowYear - value, 0, 1)
      }
      if (i == 'gender') {
        if (['male', '男'].includes(value.trim().toLowerCase())) continue
        else value = 1
      }
      if (
        [
          'lang1_speaking',
          'lang1_hearing',
          'lang1_reading',
          'lang1_writing',
          'lang2_speaking',
          'lang2_hearing',
          'lang2_reading',
          'lang2_writing',
        ].includes(i)
      ) {
        value = mappingValueLanguage[value]
      }
      if (
        [
          'certificate1_year',
          'certificate2_year',
          'certificate3_year',
        ].includes(i)
      ) {
        value = value
          ? new Date(
              new Date(1900, 0, 1).getTime() + value * 24 * 60 * 60 * 1000
            ).getFullYear()
          : null
      }
      cv[i] = value
    }
  }
  const mappingBiz = () => {
    const biz_columns = {
      prj_name: 3,
      prj_content: 15,
      period: 28,
      system_analysis: 31,
      overview_design: 33,
      basic_design: 35,
      functional_design: 37,
      detailed_design: 39,
      coding: 41,
      unit_test: 43,
      operation: 45,
      os_db: 47,
      language: 51,
      role: 60,
    }
    const _biz = {
      id: '00000000-0000-0000-0000-000000000000',
      prj_name: null,
      prj_content: null,
      period: 1,
      system_analysis: false,
      overview_design: false,
      basic_design: false,
      functional_design: false,
      detailed_design: false,
      coding: false,
      unit_test: false,
      operation: false,
      os_db: null,
      language: null,
      role: 'Dev',
    }
    bizInfos.value = []
    for (let index = 56; index < json.value.length; index++) {
      if (json.value[index].length == 0 || json.value[index][2] == null)
        continue
      const OneBiz = { ..._biz }
      for (let j in biz_columns) {
        if (j == 'period') {
          let value = json.value[index + 2][biz_columns['period'] - 2]
          if (typeof value == 'string')
            value = parseInt(value.replace(/[a-zA-Z]/g, ''))
          OneBiz[j] = value
        } else if (json.value[index][biz_columns[j] - 1]) {
          if (
            [
              'system_analysis',
              'overview_design',
              'basic_design',
              'functional_design',
              'detailed_design',
              'coding',
              'unit_test',
              'operation',
            ].includes(j)
          ) {
            OneBiz[j] = true
          } else OneBiz[j] = json.value[index][biz_columns[j] - 1] + ''
        }
      }
      bizInfos.value.push(OneBiz)
    }
  }

  interface Experience {
    name: string | null
    year: number
    month: number
  }

  interface TechnicalDetail {
    name: string
    value?: number | null
  }

const mappingTech = () => {
  const Arr: any[] = [];
  const experience: Experience[] = [];
  const tech: Array<Experience | number> = [];
  
  for (let index = 30; index < 50; index++) {
    Arr.push(json.value[index].filter((i: any) => i != null));
  }

  for (const value of Arr) {
    for (const index in value) {
      if (value[index] == "M") {  
        const exp: Experience = {
          name: null,
          year: 0,
          month: 0,
        };

          if (typeof value[index - 1] == 'number') {
            if (typeof value[index * 1 - 3] == 'number') {
              exp.name = value[index * 1 - 4]
              exp.year = value[index * 1 - 3]
            } else {
              exp.name = value[index * 1 - 3]
            }
            exp.month = value[index * 1 - 1]
            experience.push(exp)
          } else {
            if (typeof value[index - 2] == 'number') {
              exp.year = value[index - 2]
              exp.name = value[index - 3]
              experience.push(exp)
            }
          }
        }
      }
    }

    tech.push(experience)

    for (const techCat in technicals.value) {
      technicals.value[techCat].technicals.forEach(
        (techItem: TechnicalDetail) => {
          if (techItem.name) {
            const name = techItem.name.toUpperCase()
            const time = experience.find(
              (item) => item && item.name && item.name.toUpperCase() === name
            )

            if (time) {
              const year = time.month >= 6 ? time.year + 1 : time.year
              techItem.value = year || null
              tech.push(time)
              tech.push(year)
            }
          }
        }
      )
    }
  }
  const getCvDetail = async () => {
    await cvService.detail(_id).then(async (data) => {
      mapDataCv(data.data)
      mapDataBizInfo(data.data)
    })
  }

  const mapDataTechnical = (technicalData: any) => {
    const oldTechnicals = technicals.value
    technicals.value = []

  technicalData?.forEach((item: any) => {
    let technicalList: { id: any; name: any; cvTechInfoId: any; value: null; }[] = []

      item.technicals.forEach((childItem: any) => {
        let cvTechInfo: null
        let oldTechnical: null

        if (cv?.cvTechInfos != null) {
          cvTechInfo = cv.cvTechInfos.find((x) => x.technicalId == childItem.id)
          oldTechnical = oldTechnicals
            .find((x) => x.id == item.id)
            ?.technicals?.find((x) => x.id == childItem.id)
        }

        let technical = {
          id: childItem.id,
          name: childItem.name,
          cvTechInfoId: cvTechInfo?.id,
          value: oldTechnical?.value || cvTechInfo?.value,
        }
        technicalList.push(technical)
      })

      technicals.value.push({
        id: item.id,
        name: item.name,
        technicals: technicalList,
      })
    })
  }

  const mapDataCv = (cvData: any) => {
    if (cvData != null) {
      let cvInfo = {
        id: cvData.id,
        furigana: cvData.furigana,
        is_actived: cvData.is_actived,
        branch: cvData.branch,
        user_code: cvData.user_code,
        name: cvData.name,
        gender: cvData.gender ?? 0,
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
        cvTechInfos: cvData.cvTechInfos,
        bizInfos: cvData.bizInfos,
      }

      Object.assign(cv, cvInfo)
    }
  }

  const mapDataBizInfo = (data: any) => {
    bizInfos.value = []

    if (data.bizInfos != null) {
      data.bizInfos.forEach((item) => {
        let bizData = {
          id: item.id,
          cvInfoId: item.cvInfoId,
          prj_name: item.prj_name,
          prj_content: item.prj_content,
          period: item.period,
          system_analysis: item.system_analysis,
          overview_design: item.overview_design,
          basic_design: item.basic_design,
          functional_design: item.functional_design,
          detailed_design: item.detailed_design,
          coding: item.coding,
          unit_test: item.unit_test,
          operation: item.operation,
          os_db: item.os_db,
          language: item.language,
          role: item.role,
        }
        bizInfos.value.push(bizData)
      })
    }
  }

  const getTechnicalDataToCv = () => {
    cv.cvTechInfos = []

    technicals.value?.forEach((techItem: any) => {
      techItem.technicals.forEach((childItem: any) => {
        if (childItem.value != null && childItem.value != '') {
          let cvTechnicalInfo = {
            id: childItem.cvTechInfoId,
            cvInfoId: _id,
            technicalId: childItem.id,
            value: childItem.value,
          }
          cv.cvTechInfos.push(cvTechnicalInfo)
        }
      })
    })
  }

  const handlePopupSubmit = (data: any, index: number) => {
    let newData = {
      id: data.id,
      cvInfoId: _id,
      prj_name: data.prj_name,
      prj_content: data.prj_content,
      period: data.period,
      system_analysis: data.system_analysis,
      overview_design: data.overview_design,
      basic_design: data.basic_design,
      functional_design: data.functional_design,
      detailed_design: data.detailed_design,
      coding: data.coding,
      unit_test: data.unit_test,
      operation: data.operation,
      os_db: data.os_db,
      language: data.language,
      role: data.role,
    }

    if (Number.isInteger(index) && index >= -1) {
      bizInfos.value[index] = newData
    } else {
      bizInfos.value.push(newData)
    }
  }

  const handleAddTechnicalCategoryPopupSubmit = async (data: any) => {
    technicalCategoryService
      .create(data)
      .then((res) => {
        toastStore.push({
          type: 'success',
          message: tl('Common', 'AddSuccess'),
        })
        getListTechnicalCategory()
      })
      .catch(() => {
        toastStore.push({
          type: 'error',
          message: tl('Common', 'AddFail'),
        })
      })
  }

  const handleAddTechnicalPopupSubmit = async (data: any) => {
    technicalService
      .create(data)
      .then((res) => {
        toastStore.push({
          type: 'success',
          message: tl('Common', 'AddSuccess'),
        })
        getListTechnicalCategory()
      })
      .catch(() => {
        toastStore.push({
          type: 'error',
          message: tl('Common', 'AddFail'),
        })
      })
  }

  const getBizInfoData = () => {
    cv.bizInfos = bizInfos.value
  }

  const rules = reactive({
    name: [
      {
        label: tl('Curriculum vitae', 'Name'),
        required: true,
        validator: validate.required,
        trigger: ['blur'],
      },
      {
        label: tl('Role', 'Name'),
        validator: validate.maxLengthRule,
        trigger: ['blur'],
        max: 100,
      },
    ],
    furigana: [
      {
        label: tl('Curriculum vitae', 'Furigana'),
        required: true,
        validator: validate.required,
        trigger: ['blur'],
      },
      {
        label: tl('Role', 'Furigana'),
        validator: validate.maxLengthRule,
        trigger: ['blur'],
        max: 100,
      },
    ],
    birthday: [
      {
        label: tl('Curriculum vitae', 'Birthday'),
        validator: validate.dateRule,
        trigger: ['change'],
      },
    ],
  })

  const cv = reactive({
    id: null,
    furigana: '',
    is_actived: true,
    name: '',
    branch: '',
    user_code: '',
    gender: 0,
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
    cvTechInfos: [],
    bizInfos: [],
  })

  const onReload = async () => {
    isLoading.value = true
    initData()
    if (_id) await getCvDetail()
    await getListTechnicalCategory()
    isLoading.value = false
  }

  const onSave = async (formEl: FormInstance | undefined) => {
    if (checkValidateForm()) return

    isLoading.value = true

  getTechnicalDataToCv()
  
  getBizInfoData()

  const nowBirthDay = new Date(cv.birthday)
  const offSet = Math.abs(nowBirthDay.getTimezoneOffset()/60)
  cv.birthday = new Date(nowBirthDay.setHours(offSet))
  
  //Update
  if (_id) {
    await cvService.update(cv).finally(() => {
      isLoading.value = false;
    });
    onReload();
  } 
  //Create
  else {
    await cvService.create(cv).finally(() => {
      isLoading.value = false;
    });
    router.go(-1)
  }
};

  const checkValidateForm = () => {
    let isValid = false

    if (!cv.user_code || cv.user_code.trim() === '') {
      toastStore.push({
        type: 'warning',
        message: tl('Common', 'UserCode là bắt buộc'),
      })
      isValid = true
    }
    if (!cv.branch || cv.branch.trim() === '') {
      toastStore.push({
        type: 'warning',
        message: tl('Common', 'Branch là bắt buộc'),
      })
      isValid = true
    }
    if (!cv.name || cv.name.trim() === '') {
      toastStore.push({
        type: 'warning',
        message: tl('Common', 'Name là bắt buộc'),
      })
      isValid = true
    }
    if (!cv.furigana || cv.furigana.trim() === '') {
      toastStore.push({
        type: 'warning',
        message: tl('Common', 'Furigana là bắt buộc'),
      })
      isValid = true
    }

    return isValid
  }

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
    popupType.value = POPUP_TYPE.CREATE
    detailRef.value.open()
  }

  const TechnicalCategoryAddNew = () => {
    popupType.value = POPUP_TYPE.CREATE
    addTechnicalCategoryRef.value.open()
  }

  const TechnicalAddNew = (technicalCategoryId: string) => {
    popupType.value = POPUP_TYPE.CREATE
    addTechnicalRef.value.open(technicalCategoryId)
  }

  const TechnicalCategoryDelete = async (data: any) => {
    confirmPopupRef.value.confirm(
      tl('Common', 'Delete'),
      `Bạn có chắc chắn muốn xóa ${tl(
        'Technology/Experience',
        t('TechnicalCategory')
      )} này không ?`,
      async (res: any) => {
        if (res) {
          technicalCategoryService
            .delete(data)
            .then((res) => {
              toastStore.push({
                type: 'success',
                message: tl('Common', 'DeleteSuccess'),
              })
              getListTechnicalCategory()
            })
            .catch(() => {
              toastStore.push({
                type: 'error',
                message: tl('Common', 'DeleteFail'),
              })
            })
        }
      }
    )
  }

  const TechnicalDelete = async (data: any) => {
    confirmPopupRef.value.confirm(
      tl('Common', 'Delete'),
      `Bạn có chắc chắn muốn xóa ${tl(
        'Technology/Experience',
        t('Technical')
      )} này không ?`,
      async (res: any) => {
        if (res) {
          technicalService
            .delete(data)
            .then((res) => {
              toastStore.push({
                type: 'success',
                message: tl('Common', 'DeleteSuccess'),
              })
              getListTechnicalCategory()
            })
            .catch(() => {
              toastStore.push({
                type: 'error',
                message: tl('Common', 'DeleteFail'),
              })
            })
        }
      }
    )
  }

  const onEditTable = (item: any) => {
    const index = bizInfos.value.findIndex((x) => x === item)
    popupType.value = POPUP_TYPE.EDIT
    detailRef.value.open(item, index)
  }

  const onViewTable = (item: any) => {
    popupType.value = POPUP_TYPE.VIEW
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
    const index = bizInfos.value.findIndex((x) => x.id === item.id)
    if (index !== -1) {
      bizInfos.value.splice(index, 1)
    }
  }

  const initData = () => {
    rankTechnicals.value = [
      {
        key: 1,
        value: '◎',
      },
      {
        key: 2,
        value: '○',
      },
      {
        key: 3,
        value: '☆',
      },
      {
        key: 4,
        value: '●',
      },
    ]

    rankLanguages.value = [
      {
        key: 1,
        value: '○',
      },
      {
        key: 2,
        value: '☆',
      },
      {
        key: 3,
        value: '△',
      },
    ]

    genders.value = [
      {
        key: 0,
        value: tl('Curriculum vitae', 'Male'),
      },
      {
        key: 1,
        value: tl('Curriculum vitae', 'Female'),
      },
    ]
  }

  // onMounted(() => {
  //   // TechnicalAddNew('DB')
  //   // TechnicalCategoryAddNew()
  // })
</script>

<style>
  .custom-header-card {
    padding-left: 10px;
    padding-right: 10px;
  }

  .full-width {
    width: 100% !important;
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
    padding-right: 0px !important;
  }

  .no-pading {
    padding: 0px !important;
  }

  .no-pading-left {
    padding-left: 0px !important;
  }

  .border {
    border: 1px solid #b9bcc1;
  }

  .no-min-height .el-select__wrapper {
    min-height: 0 !important;
  }

  .full-height-select .el-select__wrapper {
    height: 100%;
  }

  .display-flex {
    display: flex !important;
  }

  .no-margin-left {
    margin-left: 0 !important;
  }

  .text-center .flex-start {
    justify-content: center !important;
  }

  .label-style-custom {
    background-color: #c7cad2;
  }

  .bg-white {
    background-color: white;
  }

  .invisible {
    opacity: 0;
  }

  .hover\:visible:hover {
    opacity: 100;
    transition: opacity 0.3s ease-in-out;
  }
</style>
