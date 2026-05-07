<template>
  <div class="home-page">
    <!-- 头部统计卡片 -->
    <div class="summary-card">
      <div class="summary-item">
        <div class="summary-label">本月支出</div>
        <div class="summary-value expense">{{ formatMoney(monthExpense) }}</div>
      </div>
      <div class="summary-divider" />
      <div class="summary-item">
        <div class="summary-label">本月收入</div>
        <div class="summary-value income">{{ formatMoney(monthIncome) }}</div>
      </div>
    </div>

    <!-- 今日记录 -->
    <div class="section">
      <div class="section-header">
        <h3>今日</h3>
        <el-button text type="primary" @click="$router.push('/bill')">查看全部</el-button>
      </div>
      <div v-if="todayRecords.length === 0" class="empty-state">
        今日暂无记录
      </div>
      <RecordItem
        v-for="record in todayRecords.slice(0, 5)"
        :key="record.id"
        :record="record"
      />
    </div>

    <!-- 快捷操作 -->
    <div class="section">
      <div class="quick-actions">
        <div class="action-btn" @click="$router.push('/statistics')">
          <div class="action-icon">📊</div>
          <span>统计</span>
        </div>
        <div class="action-btn" @click="$router.push('/budget')">
          <div class="action-icon">💰</div>
          <span>预算</span>
        </div>
        <div class="action-btn" @click="$router.push('/assets')">
          <div class="action-icon">🏦</div>
          <span>资产</span>
        </div>
        <div class="action-btn" @click="$router.push('/reimburse')">
          <div class="action-icon">🧾</div>
          <span>报销</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRecordStore } from '@/stores/records'
import { formatMoney } from '@/utils/format'
import RecordItem from '@/components/RecordItem.vue'

const router = useRouter()
const recordStore = useRecordStore()

onMounted(() => {
  recordStore.init()
})

const monthExpense = computed(() =>
  recordStore.monthRecords
    .filter(r => r.type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0)
)

const monthIncome = computed(() =>
  recordStore.monthRecords
    .filter(r => r.type === 'income')
    .reduce((sum, r) => sum + r.amount, 0)
)

const todayRecords = computed(() => recordStore.todayRecords)
</script>

<style scoped lang="scss">
.home-page {
  padding: 16px;
  padding-bottom: 80px;
}

.summary-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(135deg, #4A90D9 0%, #357ABD 100%);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  color: #fff;
}

.summary-item {
  text-align: center;
}

.summary-label {
  font-size: 13px;
  opacity: 0.8;
  margin-bottom: 8px;
}

.summary-value {
  font-size: 22px;
  font-weight: 600;

  &.expense {
    color: #FFD9D9;
  }

  &.income {
    color: #B8E6B8;
  }
}

.summary-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

.section {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;

  h3 {
    font-size: 15px;
    font-weight: 600;
    color: #333;
  }
}

.empty-state {
  padding: 32px;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 16px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 12px;
  border-radius: 12px;
  transition: background 0.2s;

  &:hover {
    background: #f5f6fa;
  }
}

.action-icon {
  font-size: 24px;
}

.action-btn span {
  font-size: 12px;
  color: #666;
}
</style>
