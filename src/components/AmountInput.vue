<template>
  <div class="amount-input">
    <div class="currency-symbol">¥</div>
    <input
      type="text"
      :value="displayValue"
      @input="onInput"
      class="input-field"
      placeholder="0.00"
      :maxlength="12"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  return String(props.modelValue)
})

function onInput(e) {
  let value = e.target.value.replace(/[^\d.]/g, '')
  // 确保只有一个小数点
  const parts = value.split('.')
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('')
  }
  // 限制小数位数
  if (parts[1] && parts[1].length > 2) {
    value = parts[0] + '.' + parts[1].slice(0, 2)
  }
  emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
.amount-input {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 16px 20px;
  gap: 8px;
}

.currency-symbol {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.input-field {
  flex: 1;
  border: none;
  outline: none;
  font-size: 28px;
  font-weight: 600;
  color: #333;
  background: transparent;

  &::placeholder {
    color: #ccc;
  }
}
</style>
