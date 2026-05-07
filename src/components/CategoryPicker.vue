<template>
  <div class="category-picker">
    <div class="category-type-tabs">
      <div
        :class="['tab', { active: currentType === 'expense' }]"
        @click="switchType('expense')"
      >
        支出
      </div>
      <div
        :class="['tab', { active: currentType === 'income' }]"
        @click="switchType('income')"
      >
        收入
      </div>
    </div>
    <div class="category-grid">
      <div
        v-for="cat in categories"
        :key="cat.id"
        :class="['category-item', { selected: selectedId === cat.id }]"
        @click="selectCategory(cat)"
      >
        <div class="category-icon" :style="{ backgroundColor: cat.color + '20' }">
          {{ cat.icon }}
        </div>
        <div class="category-name">{{ cat.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCategoryStore } from '@/stores/categories'

const categoryStore = useCategoryStore()
const emit = defineEmits(['select'])

const currentType = ref('expense')
const selectedId = ref('')

const categories = computed(() =>
  categoryStore.getCategoriesByType(currentType.value)
)

function switchType(type) {
  currentType.value = type
  selectedId.value = ''
}

function selectCategory(cat) {
  selectedId.value = cat.id
  emit('select', { ...cat, type: currentType.value })
}
</script>

<style scoped lang="scss">
.category-picker {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
}

.category-type-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  background: #f5f6fa;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &.active {
    background: #4A90D9;
    color: #fff;
  }
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &.selected {
    background: #4A90D920;
  }
}

.category-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.category-name {
  font-size: 12px;
  color: #666;
}
</style>
