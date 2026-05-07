<template>
  <div class="date-picker">
    <button class="nav-btn" @click="changeMonth(-1)">
      <el-icon><ArrowLeft /></el-icon>
    </button>
    <span class="current-month">{{ displayMonth }}</span>
    <button class="nav-btn" @click="changeMonth(1)">
      <el-icon><ArrowRight /></el-icon>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: () => new Date().toISOString().slice(0, 7)
  }
})

const emit = defineEmits(['update:modelValue'])

const currentDate = ref(new Date(props.modelValue + '-01'))

const displayMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth() + 1
  return `${year}年${month}月`
})

function changeMonth(delta) {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + delta)
  currentDate.value = newDate
  emit('update:modelValue', newDate.toISOString().slice(0, 7))
}
</script>

<style scoped lang="scss">
.date-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px;
  background: #fff;
  border-radius: 12px;
}

.nav-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f6fa;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #4A90D9;
    color: #fff;
  }
}

.current-month {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  min-width: 100px;
  text-align: center;
}
</style>
