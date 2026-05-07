<template>
  <div class="reimburse-page">
    <div class="summary-card">
      <div class="summary-item">
        <div class="label">待报销</div>
        <div class="value pending">{{ formatMoney(pendingAmount) }}</div>
      </div>
      <div class="summary-divider" />
      <div class="summary-item">
        <div class="label">已报销</div>
        <div class="value done">{{ formatMoney(doneAmount) }}</div>
      </div>
    </div>

    <div v-if="reimburseList.length === 0" class="empty-state">
      暂无报销记录
    </div>

    <div class="reimburse-list">
      <div class="reimburse-item" v-for="item in reimburseList" :key="item.id">
        <div class="reimburse-info">
          <div class="title">{{ item.title }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
        <div :class="['status', item.status]">
          {{ item.status === 'pending' ? '待报销' : '已报销' }}
        </div>
        <div class="amount">{{ formatMoney(item.amount) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatMoney } from '@/utils/format'

const reimburseList = ref([])

const pendingAmount = computed(() =>
  reimburseList.value
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.amount, 0)
)

const doneAmount = computed(() =>
  reimburseList.value
    .filter(r => r.status === 'done')
    .reduce((sum, r) => sum + r.amount, 0)
)
</script>

<style scoped lang="scss">
.reimburse-page {
  padding: 16px;
  padding-bottom: 80px;
}

.summary-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
}

.summary-item {
  text-align: center;
}

.summary-item .label {
  font-size: 13px;
  color: #999;
  margin-bottom: 8px;
}

.summary-item .value {
  font-size: 20px;
  font-weight: 600;

  &.pending {
    color: #FF9800;
  }

  &.done {
    color: #4CAF50;
  }
}

.summary-divider {
  width: 1px;
  height: 40px;
  background: #f0f0f0;
}

.empty-state {
  padding: 48px;
  text-align: center;
  color: #999;
}

.reimburse-list {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.reimburse-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  gap: 12px;

  &:last-child {
    border-bottom: none;
  }
}

.reimburse-info {
  flex: 1;
}

.reimburse-info .title {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.reimburse-info .date {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;

  &.pending {
    background: #FFF3E0;
    color: #FF9800;
  }

  &.done {
    background: #E8F5E9;
    color: #4CAF50;
  }
}

.amount {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}
</style>
