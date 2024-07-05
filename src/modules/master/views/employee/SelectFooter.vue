<template>
  <el-button v-if="!isAdding" text bg size="small" @click="onAddOption">
    {{ label }}
  </el-button>
  <template v-else>
    <el-input v-model="optionName" class="option-input" :placeholder="placeholder" size="small" />
    <el-button type="primary" size="small" @click="onConfirm">
      Thêm
    </el-button>
    <el-button size="small" @click="clear">Hủy</el-button>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
  label: string,
  placeholder: string
}>()
const emit = defineEmits(['create:department'])

const isAdding = ref(false)
const optionName = ref('')

const onAddOption = () => {
  isAdding.value = true
}

const clear = () => {
  optionName.value = ''
  isAdding.value = false
}

const onConfirm = () => {
  emit('create:department', optionName.value)
  clear()
}
</script>