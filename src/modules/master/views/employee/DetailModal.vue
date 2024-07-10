<template>
  <vc-modal ref="modal" :title="tl('Employee', 'DetailTitle')" width="80%" @close="close">
    <template #content>
      <el-form ref="employeeForm" :model="employee" :rules="rules" label-width="150px" label-position="right"
        require-asterisk-position="right" :disabled="type == POPUP_TYPE.VIEW">
        <vc-row :gutter="20">
          <!-- COL 1 -->
          <vc-col :lg="8" :md="12" :sm="24" :xs="24">
            <vc-input-group required prop="tempEmployee_code" :label="tl('Employee', 'Mã nhân sự')">
              <vc-input v-model="employee.tempEmployee_code" :formatter="(value: string) => value ? value : 'VHEC-'"
                :parser="(value: any) => 'VHEC-' + value.replaceAll(/VHEC-\s?|VHEC\s?/g, '')" :disabled="type != POPUP_TYPE.CREATE" />
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

            <vc-input-group required prop="tempDepartments" :label="tl('Employee', 'Phòng ban')">
              <vc-select v-model="employee.tempDepartments" :items="departments" fieldValue="value" fieldText="text" multiple>
                <template #footer>
                  <select-footer :label="'Thêm phòng ban'" :placeholder="'Nhập phòng ban'" @create:department="onCreateDepartment"></select-footer>
                </template>
              </vc-select>
            </vc-input-group>

            <vc-input-group required prop="tempPositions" :label="tl('Employee', 'Vị trí')">
              <vc-select v-model="employee.tempPositions" :items="positions" fieldValue="value" fieldText="text" multiple>
                <template #footer>
                  <select-footer :label="'Thêm vị trí'" :placeholder="'Nhập vị trí'" @create:department="onCreatePosition"></select-footer>
                </template>
              </vc-select>
            </vc-input-group>

            <vc-input-group v-if="type != POPUP_TYPE.CREATE"  required prop="current_group" :label="tl('Employee', 'Nhóm')">
              <vc-input disabled v-model="employee.current_group"></vc-input>
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
      <vc-button v-if="props.type != POPUP_TYPE.VIEW" class="ml-2" @click="resetTable" :icon="'Refresh'">
        {{ tl("Common", "") }}
      </vc-button>
      <vc-button v-if="props.type != POPUP_TYPE.VIEW" type="primary" class="ml-2" code="F00004"
        @click="onSave(employeeForm)" :loading="isLoading" :icon="'FolderChecked'">
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
import { POPUP_TYPE, BRANCHES, EMPLOYEE_STATES } from '@/commons/const'
import { useEmployeeStore } from '@master/stores/employee.store'
import { useDepartmentStore } from '@master/stores/department.store'
import { usePositionStore } from '@master/stores/position.store'
import SelectFooter from '@master/views/employee/SelectFooter.vue'

const rules = reactive({
  tempEmployee_code: [
    {
      label: tl('Employee', 'Mã nhân sự'),
      required: true,
      validator: validate.required,
      trigger: ['blur'],
    },
    {
      label: tl('Employee', 'Mã nhân sự'),
      validator: validate.numberWithPrefix('VHEC-'),
      trigger: ['change', 'blur'],
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
      validator: validate.required,
      required: true,
      trigger: ['blur'],
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
  tempDepartments: [
    {
      label: tl('Employee', 'Phòng ban'),
      required: true,
      validator: validate.required,
      trigger: ['change'],
    }
  ],
  tempPositions: [
    {
      label: tl('Employee', 'Vị trí'),
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

const employeeForm = ref<FormInstance>()
const isLoading = ref(false)
const confirmDialog = ref<any>(null)
const modal = ref<any>(null)

const employeeStore = useEmployeeStore()
const departmentStore = useDepartmentStore()
const positionStore = usePositionStore()

const branches = ref<any[]>([])
const departments = ref<any[]>([])
const groups = ref<any[]>([])
const positions = ref<any[]>([])
const statuses = ref<any[]>([])
const marital_statuses = ref<any[]>([])

const employee = reactive({
  id: <any>null,
  employee_code: <any>null,
  tempEmployee_code: <any>null,
  full_name: null,
  initial_name: null,
  branch: null,
  tempDepartments: <any[]>[],
  employeeDepartments: <any[]>[],
  current_group: "",
  tempPositions: <any[]>[],
  employeePositions: <any[]>[],
  state: null,
  phone: null,
  company_email: null,
  personal_email: null,
  birthday: <any>null,
  permanent_address: null,
  current_address: null,
  id_number: null,
  date_issue: <any>null,
  location_issue: null,
  is_married: null,
})

const resetEmployee = () => {
  employee.tempEmployee_code = null
  employee.full_name = null
  employee.initial_name = null
  employee.branch = null
  employee.tempDepartments = []
  employee.employeeDepartments = []
  employee.current_group = ""
  employee.tempPositions = []
  employee.employeePositions = []
  employee.state = null
  employee.phone = null
  employee.company_email = null
  employee.personal_email = null
  employee.birthday = null
  employee.permanent_address = null
  employee.current_address = null
  employee.id_number = null
  employee.date_issue = null
  employee.location_issue = null
  employee.is_married = null
}

const onCreateDepartment = async (name: string) => {
  if (name) {
    await departmentStore.create({name: name})
      getListFilters()
      emits("update:fields")
  }
}

const onCreatePosition = async (name: string) => {
  if (name) {
    await positionStore.create({name: name})
      getListFilters()
      emits("update:fields")
  }
}

const emits = defineEmits(["update:fields"])

const onSave = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  let isValid = true

  await formEl.validate(async (valid) => {
    isValid = valid
  })

  if (!isValid) return
  employee.employee_code = employee.tempEmployee_code

  employee.employeeDepartments = employee.tempDepartments.map((department) => {
    const selectDepartment = departmentStore.getData.find((x:any) => x.name == department)
    return {
      department_id: selectDepartment.id
    }
  })

  employee.employeePositions = employee.tempPositions.map((position) => {
    const selectPosition = positionStore.getData.find((x:any) => x.name == position)
    return {
      position_id: selectPosition.id
    }
  })

  isLoading.value = true

  if (employee.id) {
    await employeeStore.update(employee).finally(() => {
      isLoading.value = false
    })
  } else {
    await employeeStore.create(employee).finally(() => {
      isLoading.value = false
    })
  }

  close()
}

const open = async (employeeSource: any) => {
  if (employeeSource) {
    employee.tempEmployee_code = employeeSource.employee_code

    employee.date_issue = employeeSource.date_issue ? new Date(employeeSource.date_issue)
      .toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit', year: 'numeric'}) : null

    employee.tempDepartments = employeeSource.employeeDepartments
      .map((employeeDepartment: any) => employeeDepartment.department.name)

    employee.tempPositions = employeeSource.employeePositions
      .map((employeePosition: any) => employeePosition.position.name)
  }
  
  Object.assign(employee, employeeSource)

  modal.value.open()
}

const close = () => {
  resetTable()
  employee.id = null
  employee.employee_code = null
  employee.tempEmployee_code = null
  employee.current_group = ""
  modal.value.close()
}

const resetTable = async () => {
  const tempGroup = employee.current_group
  if (employeeForm.value) employeeForm.value.resetFields()
  resetEmployee()
  if (props.type == POPUP_TYPE.EDIT) {
    employee.tempEmployee_code = employee.employee_code
    employee.current_group = tempGroup
  }
};

onBeforeMount(async () => {
  await departmentStore.getList()
  await positionStore.getList()
  await employeeStore.getGroups()

  getListFilters()

  branches.value = BRANCHES.map(branch => ({value: branch, text: branch}))

  statuses.value = EMPLOYEE_STATES.map((state, index) => ({value: index, text: state})) 

  marital_statuses.value = [
    { value: false, text: 'Độc thân' },
    { value: true, text: 'Đã kết hôn' },
  ]
})

const getListFilters = () => {
  departments.value = [...departmentStore.getData].map(department => ({
    value: department.name,
    text: department.name,
  }))

  positions.value = [...positionStore.getData].map(position => ({
    value: position.name,
    text: position.name,
  }))

  groups.value = [...employeeStore.getGroupsData].map(group => ({
    value: group.initial_name,
    text: group.initial_name,
  }))

  if(groups.value.length == 0) {
    groups.value = [
      {
        value: "Không có",
        text: "Không có"
      }
    ]
  }
}

defineExpose({
  open,
  close,
})
</script>
