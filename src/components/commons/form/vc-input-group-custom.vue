<template>
  <div :class="layoutClass" style="display: flex; justify-content: center;">
    <el-text class="mb-2 label-style" truncated :style="componentStyle">
      {{ label }}
    </el-text>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  required?: boolean;
  label?: string;
  layout?: 'vertical' | 'horizontal';
  labelWidth?: string
}>();

const layoutClass = computed(() => {
  return props.layout === 'horizontal' ? 'horizontal-layout' : 'vertical-layout';
});

const componentStyle = computed(() => {
  return {
    width: props.labelWidth || 'auto' // Default width to 'auto' if not provided
  };
});
</script>

<style scoped>
.vertical-layout {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.horizontal-layout {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.label-style{
  text-align: center;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  width: 100%; /* Ensures it takes up the full width of the parent */
  white-space: nowrap; 
  margin-bottom: 18px;
}

</style>