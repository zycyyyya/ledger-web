<template>
  <div class="record-item" @click="$emit('click', record)">
    <div class="record-icon" :style="{ backgroundColor: category?.color + '20' }">
      {{ category?.icon || '📝' }}
    </div>
    <div class="record-info">
      <div class="record-category">{{ category?.name || record.categoryName || '未分类' }}</div>
      <div v-if="record.note" class="record-note">{{ record.note }}</div>
    </div>
    <div :class="['record-amount', record.type]">
      {{ record.type === 'expense' ? '-' : '+' }}¥{{ formatAmount(record.amount) }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatAmount } from '@/utils/format'
import { useCategoryStore } from '@/stores/categories'

const props = defineProps({
  record: {
    type: Object,
    required: true
  }
})

const categoryStore = useCategoryStore()

const category = computed(() =>
  categoryStore.getCategoryById(props.record.categoryId, props.record.type)
)
</script>

<style scoped lang="scss">
.record-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f9f9f9;
  }
}

.record-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 12px;
  flex-shrink: 0;
}

.record-info {
  flex: 1;
  min-width: 0;
}

.record-category {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.record-note {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.record-amount {
  font-size: 16px;
  font-weight: 600;
  flex-shrink: 0;

  &.expense {
    color: #FF6B6B;
  }

  &.income {
    color: #4CAF50;
  }
}
</style>
