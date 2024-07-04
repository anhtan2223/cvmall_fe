<template>
  <vc-modal ref="modal" :title="tl('Employee', 'DetailTitle')" width="80%" @close="close">
    <template #content>
      <el-form ref="userForm" :model="employee" :rules="rules" label-width="150px" label-position="right"
        require-asterisk-position="right" :disabled="type == POPUP_TYPE.VIEW">
        <vc-row :gutter="20">
          <!-- COL 1 -->
          <vc-col :lg="8" :md="12" :sm="24" :xs="24">
            <vc-input-group required prop="employee_code" :label="tl('Employee', 'Mã nhân sự')">
              <vc-input v-model="employee.employee_code" :formatter="(value: string) => `VHEC-${value}`"
                :parser="(value: any) => value.replaceAll(/VHEC-\s?|VHEC\s?/g, '')" :disabled="type != POPUP_TYPE.CREATE" />
            </vc-input-group>

            <vc-input-group required prop="full_name" :label="tl('Employee', 'Họ và tên')">
              <vc-input v-model="employee.full_name" />
            </vc-input-group>

            <vc-input-group required prop="initial_name" :label="tl('Employee', 'Tên viết tắt')">
              <vc-input v-model="employee.initial_name" />
            </vc-input-group>

            <vc-input-group required prop="phone" :label="tl('Employee', 'SĐT')">
              <vc-input v-model="employee.phone"></vc-input>
            </vc-input-group>

            <vc-input-group required prop="birthday" :label="tl('Employee', 'Ngày sinh')">
              <vc-input-date format="DD/MM/YYYY" v-model="employee.birthday" />
            </vc-input-group>

            <vc-input-group required prop="permanent_address" :label="tl('Employee', 'Địa chỉ thường trú')">
              <vc-textarea v-model="employee.permanent_address" />
            </vc-input-group>

            <vc-input-group required prop="current_address" :label="tl('Employee', 'Địa chỉ hiện tại')">
              <vc-textarea v-model="employee.current_address" />
            </vc-input-group>
          </vc-col>

          <!-- COL 2 -->
          <vc-col :lg="8" :md="12" :sm="24" :xs="24">
            <vc-input-group required prop="branch" :label="tl('Employee', 'Chi nhánh')">
              <vc-select v-model="employee.branch" :items="branches" fieldValue="value" fieldText="text">
              </vc-select>
            </vc-input-group>

            <vc-input-group required prop="employeeDepartments" :label="tl('Employee', 'Phòng ban')">
              <vc-select v-model="employee.employeeDepartments" :items="departments" fieldValue="value" fieldText="text" multiple
                filterable allow-create>
              </vc-select>
            </vc-input-group>

            <vc-input-group required prop="employeePositions" :label="tl('Employee', 'Vị trí')">
              <vc-select v-model="employee.employeePositions" :items="positions" fieldValue="value" fieldText="text" multiple
                filterable allow-create>
              </vc-select>
            </vc-input-group>

            <vc-input-group required prop="current_group" :label="tl('Employee', 'Nhóm')">
              <vc-select v-model="employee.current_group" :items="groups" fieldValue="value" fieldText="text">
              </vc-select>
            </vc-input-group>

            <vc-input-group required prop="state" :label="tl('Employee', 'Thực trạng')">
              <vc-select v-model="employee.state" :items="statuses" fieldValue="value" fieldText="text">
              </vc-select>
            </vc-input-group>

            <vc-input-group required prop="personal_email" :label="tl('Employee', 'Email (cá nhân)')">
              <vc-input v-model="employee.personal_email" />
            </vc-input-group>

            <vc-input-group required prop="company_email" :label="tl('Employee', 'Email (công ty)')">
              <vc-input v-model="employee.company_email" />
            </vc-input-group>
          </vc-col>

          <!-- COL 3 -->
          <vc-col :lg="8" :md="12" :sm="24" :xs="24">
            <vc-input-group required prop="id_number" :label="tl('Employee', 'Số CCCD')">
              <vc-input v-model="employee.id_number" />
            </vc-input-group>

            <vc-input-group required prop="date_issue" :label="tl('Employee', 'Ngày cấp CCCD')">
              <vc-input-date format="DD/MM/YYYY" v-model="employee.date_issue" />
            </vc-input-group>

            <vc-input-group required prop="location_issue" :label="tl('Employee', 'Nơi cấp CCCD')">
              <vc-textarea v-model="employee.location_issue" />
            </vc-input-group>

            <vc-input-group required prop="is_married" :label="tl('Employee', 'Tình trạng hôn nhân')">
              <vc-select v-model="employee.is_married" :items="marital_statuses" fieldValue="value" fieldText="text">
              </vc-select>
            </vc-input-group>
          </vc-col>
        </vc-row>
      </el-form>
    </template>

    <template #acttion>
      <vc-button class="ml-2" @click="reloadTable" :icon="'Refresh'">
        {{ tl("Common", "") }}
      </vc-button>
      <vc-button v-if="props.type != POPUP_TYPE.VIEW" type="primary" class="ml-2" code="F00004"
        @click="onSave(userForm)" :loading="isLoading" :icon="'FolderChecked'">
        {{ tl('Common', 'BtnSave') }}
      </vc-button>
    </template>

    <vc-confirm ref="confirmDialog"></vc-confirm>
  </vc-modal>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, reactive } from 'vue'
import validate from '@/utils/validate_elp'
import tl from '@/utils/locallize'
import type { FormInstance } from 'element-plus'
import { POPUP_TYPE } from '@/commons/const'
import { useEmployeeStore } from '../../stores/employee.store'
import { useDepartmentStore } from '@master/stores/department.store'
import { usePositionStore } from '@master/stores/position.store'

const rules = reactive({
  employee_code: [
    {
      label: tl('Employee', 'Mã nhân sự'),
      required: true,
      validator: validate.required,
      trigger: ['blur'],
    },
    {
      label: tl('Employee', 'Mã nhân sự'),
      validator: validate.numberValidator,
      trigger: ['change'],
    },
  ],
  full_name: [
    {
      label: tl('Employee', 'Họ và tên'),
      required: true,
      validator: validate.required,
      trigger: ['blur'],
    },
    {
      label: tl('Employee', 'Họ và tên'),
      validator: validate.maxLengthRule,
      trigger: ['change'],
      max: 100,
    },
  ],
  initial_name: [
    {
      label: tl('Employee', 'Tên viết tắt'),
      required: true,
      validator: validate.required,
      trigger: ['blur'],
    },
    {
      label: tl('Employee', 'Tên viết tắt'),
      validator: validate.maxLengthRule,
      trigger: ['change'],
      max: 100,
    },
  ],
  phone: [
    {
      label: tl('Employee', 'SĐT'),
      validator: validate.phoneNumberRule,
      trigger: ['blur'],
    },
    {
      label: tl('Role', 'SĐT'),
      validator: validate.maxLengthRule,
      trigger: ['change'],
      max: 50,
    },
  ],
  birthday: [
    {
      label: tl('Employee', 'Ngày sinh'),
      validator: validate.dateRule,
      trigger: ['change'],
    },
  ],
  permanent_address: [
    {
      label: tl('Employee', 'Địa chỉ thường trú'),
      validator: validate.maxLengthRule,
      trigger: ['change'],
      max: 100,
    }
  ],
  current_address: [
    {
      label: tl('Employee', 'Địa chỉ hiện tại'),
      validator: validate.maxLengthRule,
      trigger: ['change'],
      max: 100,
    }
  ],
  branch: [
    {
      label: tl('Employee', 'Chi nhánh'),
      required: true,
      validator: validate.required,
      trigger: ['change'],
    }
  ],
  employeeDepartments: [
    {
      label: tl('Employee', 'Phòng ban'),
      required: true,
      validator: validate.required,
      trigger: ['change'],
    }
  ],
  employeePositions: [
    {
      label: tl('Employee', 'Vị trí'),
      required: true,
      validator: validate.required,
      trigger: ['change'],
    }
  ],
  current_group: [
    {
      label: tl('Employee', 'Nhóm'),
      required: true,
      validator: validate.required,
      trigger: ['change'],
    }
  ],
  state: [
    {
      label: tl('Employee', 'Thực trạng'),
      required: true,
      validator: validate.required,
      trigger: ['change'],
    }
  ],
  personal_email: [
    {
      label: tl('Employee', 'Email (cá nhân)'),
      validator: validate.emailRule,
      trigger: ['blur'],
    },
    {
      label: tl('Employee', 'Email (cá nhân)'),
      validator: validate.maxLengthRule,
      trigger: ['change'],
      max: 100,
    }
  ],
  company_email: [
    {
      label: tl('Employee', 'Email (công ty)'),
      validator: validate.emailRule,
      trigger: ['blur'],
    },
    {
      label: tl('Employee', 'Email (công ty)'),
      validator: validate.maxLengthRule,
      trigger: ['change'],
      max: 100,
    }
  ],
  id_number: [
    {
      label: tl('Employee', 'Số CCCD'),
      validator: validate.numberValidator,
      trigger: ['change'],
    }
  ],
  date_issue: [
    {
      label: tl('Employee', 'Ngày cấp CCCD'),
      validator: validate.dateRule,
      trigger: ['change'],
    },
  ],
  location_issue: [
    {
      label: tl('Employee', 'Nơi cấp CCCD'),
      validator: validate.maxLengthRule,
      trigger: ['change'],
      max: 100,
    }
  ],
  is_married: [
    {
      label: tl('Employee', 'Tình trạng hôn nhân'),
      required: true,
      validator: validate.required,
      trigger: ['change'],
    }
  ]
})

const props = defineProps<{
  type: POPUP_TYPE
}>()

const userForm = ref<FormInstance>()
const isLoading = ref(false)
const confirmDialog = ref<any>(null)
const modal = ref<any>(null)

// ###########TEST
const employeeStore = useEmployeeStore()
const departmentStore = useDepartmentStore()
const positionStore = usePositionStore()

const branches = ref<any>([])
const departments = ref<any>([])
const groups = ref<any>([])
const positions = ref<any>([])
const statuses = ref<any>([])
const marital_statuses = ref<any>([])

const employee = reactive({
  id: '',
  employee_code: null,
  full_name: null,
  initial_name: null,
  branch: null,
  employeeDepartments: [],
  current_group: null,
  employeePositions: [],
  state: null,
  phone: null,
  company_email: null,
  personal_email: null,
  birthday: null,
  permanent_address: null,
  current_address: null,
  id_number: null,
  date_issue: null,
  location_issue: null,
  is_married: null,
})

onBeforeMount(async () => {
  await init()

  // if (employee.id) await getUserDetail()
})

const getUserDetail = async () => {
  // const response = await userService.detail(employee.id)
  // Object.assign(user, response?.data)
}

const init = async () => {
  // genders.value = (await masterCodeService.getByType('GENDER'))?.data
  // branches.value = (await brancheservice.getList({ page: 1, size: 100 }))?.data
}

const onSave = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (!valid) return
  })

  //   isLoading.value = true
  //   employee.role_cds = employee.role_cds ?? []

  //   if (employee.id) {
  //     await userService.update(user).finally(() => {
  //       isLoading.value = false
  //     })
  //   } else {
  //     await userService.create(user).finally(() => {
  //       isLoading.value = false
  //     })
  //   }
  // })
}

const open = async (employeeSource: any) => {
  employeeSource.id = Number.parseInt(employeeSource.employee_code.replace("VHEC-", ""))
  console.log(employeeSource.id)
  if (employeeSource)
    Object.assign(employee, employeeSource)

  modal.value.open()
}

const close = () => {
  console.log({...employee})
  if (userForm.value) userForm.value.resetFields()
  modal.value.close()
}

const reloadTable = async () => {
  if (userForm.value) userForm.value.resetFields()
};

onBeforeMount(async () => {
  await departmentStore.getList()
  await positionStore.getList()

  branches.value = [
    { value: 'Hà Nội', text: 'Hà Nội' },
    { value: 'Nha Trang', text: 'Nha Trang' },
    { value: 'Cần Thơ', text: 'Cần Thơ' },
  ]

  departments.value = [...departmentStore.getData].map(department => ({
    value: department.name,
    text: department.name,
  }))

  groups.value = [
    { value: 'Nguyen Van A', text: 'NV' },
    { value: 'Nguyen Van B', text: 'GS' },
    { value: 'Nguyen Van C', text: 'QL' },
  ]

  positions.value = [...positionStore.getData].map(position => ({
    value: position.name,
    text: position.name,
  }))

  statuses.value = [
    { value: 0, text: "Đang làm việc" },
    { value: 1, text: "Đang thử việc" },
    { value: 2, text: "Đang thực tập" },
    { value: 3, text: "Đã nghĩ việc" }
  ]

  marital_statuses.value = [
    { value: false, text: 'Độc thân' },
    { value: true, text: 'Đã kết hôn' },
  ]
})

defineExpose({
  open,
  close,
})
</script>
