<template>
  <div class="budget-page">
    <div class="budget-summary">
      <div class="budget-item">
        <div class="label">本月预算</div>
        <div class="value">{{ formatMoney(budgetAmount) }}</div>
      </div>
      <div class="budget-item">
        <div class="label">已使用</div>
        <div class="value used">{{ formatMoney(usedAmount) }}</div>
      </div>
      <div class="budget-item">
        <div class="label">剩余</div>
        <div class="value remain">{{ formatMoney(remainAmount) }}</div>
      </div>
    </div>

    <div class="progress-section">
      <el-progress
        :percentage="usagePercent"
        :color="progressColor"
        :stroke-width="20"
        :show-text="false"
      />
      <div class="progress-text">已使用 {{ usagePercent }}%</div>
    </div>

    <div class="budget-settings">
      <div class="form-item">
        <label>月度预算</label>
        <el-input-number v-model="budgetAmount" :min="0" :precision="2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatMoney } from '@/utils/format'

const budgetAmount = ref(5000)
const usedAmount = ref(1234.56)

const remainAmount = computed(() => budgetAmount.value - usedAmount.value)

const usagePercent = computed(() => {
  if (budgetAmount.value === 0) return 0
  return Math.min(100, Math.round((usedAmount.value / budgetAmount.value) * 100))
})

const progressColor = computed(() => {
  if (usagePercent.value < 60) return '#4CAF50'
  if (usagePercent.value < 80) return '#FF9800'
  return '#FF6B6B'
})
</script>

<style scoped lang="scss">
.budget-page {
  padding: 16px;
  padding-bottom: 80px;
}

.budget-summary {
  display: flex;
  justify-content: space-around;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
}

.budget-item {
  text-align: center;
}

.budget-item .label {
  font-size: 13px;
  color: #999;
  margin-bottom: 8px;
}

.budget-item .value {
  font-size: 18px;
  font-weight: 600;
  color: #333;

  &.used {
    color: #FF9800;
  }

  &.remain {
    color: #4CAF50;
  }
}

.progress-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;

  .progress-text {
    text-align: center;
    margin-top: 12px;
    font-size: 13px;
    color: #999;
  }
}

.budget-settings {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
}

.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    font-size: 14px;
    color: #333;
  }
}
</style>
