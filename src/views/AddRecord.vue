<template>
  <div class="add-record-page">
    <!-- 分类选择器 -->
    <CategoryPicker @select="onCategorySelect" />

    <!-- 金额输入 -->
    <div class="section">
      <AmountInput v-model="amount" />
    </div>

    <!-- 备注和日期 -->
    <div class="section form-section">
      <div class="form-item">
        <label>备注</label>
        <input v-model="note" type="text" placeholder="添加备注" class="form-input" />
      </div>
      <div class="form-item">
        <label>日期</label>
        <input v-model="date" type="date" class="form-input" />
      </div>
    </div>

    <!-- 快捷金额 -->
    <div class="section quick-amount">
      <div
        v-for="amt in [10, 20, 50, 100, 200, 500]"
        :key="amt"
        :class="['amount-btn', { active: amount === String(amt) }]"
        @click="amount = String(amt)"
      >
        {{ amt }}
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="submit-section">
      <el-button
        type="primary"
        size="large"
        class="submit-btn"
        :disabled="!amount || !selectedCategory"
        @click="submitRecord"
      >
        保存记录
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useRecordStore } from '@/stores/records'
import { getTodayString } from '@/utils/util'
import CategoryPicker from '@/components/CategoryPicker.vue'
import AmountInput from '@/components/AmountInput.vue'

const router = useRouter()
const recordStore = useRecordStore()

const amount = ref('')
const note = ref('')
const date = ref(getTodayString())
const selectedCategory = ref(null)

onMounted(() => {
  recordStore.init()
})

function onCategorySelect(category) {
  selectedCategory.value = category
}

function submitRecord() {
  if (!selectedCategory.value) {
    ElMessage.warning('请选择分类')
    return
  }

  const amountNum = parseFloat(amount.value)
  if (isNaN(amountNum) || amountNum <= 0) {
    ElMessage.warning('请输入有效金额')
    return
  }

  recordStore.addRecord({
    type: selectedCategory.value.type,
    categoryId: selectedCategory.value.id,
    categoryName: selectedCategory.value.name,
    amount: amountNum,
    note: note.value,
    date: date.value
  })

  ElMessage.success('记录已保存')
  router.push('/')
}
</script>

<style scoped lang="scss">
.add-record-page {
  padding: 16px;
  padding-bottom: 100px;
}

.section {
  background: #fff;
  border-radius: 12px;
  margin-top: 16px;
  overflow: hidden;
}

.form-section {
  padding: 16px;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.form-item label {
  width: 60px;
  font-size: 14px;
  color: #666;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  background: transparent;

  &::placeholder {
    color: #ccc;
  }
}

.quick-amount {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px;
}

.amount-btn {
  padding: 12px;
  text-align: center;
  border-radius: 8px;
  background: #f5f6fa;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #4A90D920;
  }

  &.active {
    background: #4A90D9;
    color: #fff;
  }
}

.submit-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}

.submit-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
}
</style>
