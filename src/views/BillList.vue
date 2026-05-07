<template>
  <div class="bill-list-page">
    <DatePicker v-model="selectedMonth" />

    <div class="bill-summary">
      <div class="summary-row">
        <span>支出</span>
        <span class="expense">{{ formatMoney(monthExpense) }}</span>
      </div>
      <div class="summary-row">
        <span>收入</span>
        <span class="income">{{ formatMoney(monthIncome) }}</span>
      </div>
    </div>

    <div v-if="groupedRecords.length === 0" class="empty-state">
      本月暂无记录
    </div>

    <div v-for="group in groupedRecords" :key="group.date" class="date-group">
      <div class="date-header">
        <span>{{ getRelativeDate(group.date) }}</span>
        <span class="day-total">
          支出 {{ formatMoney(group.records.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0)) }}
        </span>
      </div>
      <RecordItem
        v-for="record in group.records"
        :key="record.id"
        :record="record"
        @click="showRecordDetail(record)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useRecordStore } from '@/stores/records'
import { formatMoney, getRelativeDate } from '@/utils/format'
import DatePicker from '@/components/DatePicker.vue'
import RecordItem from '@/components/RecordItem.vue'

const recordStore = useRecordStore()
const selectedMonth = ref(new Date().toISOString().slice(0, 7))

onMounted(() => {
  recordStore.init()
})

const monthRecords = computed(() =>
  recordStore.records.filter(r => r.date && r.date.startsWith(selectedMonth.value))
)

const monthExpense = computed(() =>
  monthRecords.value
    .filter(r => r.type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0)
)

const monthIncome = computed(() =>
  monthRecords.value
    .filter(r => r.type === 'income')
    .reduce((sum, r) => sum + r.amount, 0)
)

const groupedRecords = computed(() => {
  const groups = {}
  monthRecords.value.forEach(item => {
    const date = item.date ? item.date.substring(0, 10) : '未知日期'
    if (!groups[date]) {
      groups[date] = { date, records: [] }
    }
    groups[date].records.push(item)
  })
  return Object.values(groups).sort((a, b) => b.date.localeCompare(a.date))
})

function showRecordDetail(record) {
  ElMessageBox.confirm(
    `确定删除这条${record.type === 'expense' ? '支出' : '收入'}记录吗？`,
    '删除确认',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    recordStore.deleteRecord(record.id)
  }).catch(() => {})
}
</script>

<style scoped lang="scss">
.bill-list-page {
  padding: 16px;
  padding-bottom: 80px;
}

.bill-summary {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-top: 12px;
  margin-bottom: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #666;

  span:last-child {
    font-weight: 600;
  }
}

.expense {
  color: #FF6B6B;
}

.income {
  color: #4CAF50;
}

.empty-state {
  padding: 48px;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.date-group {
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.date-header {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f5f6fa;
  font-size: 13px;
  color: #666;
}

.day-total {
  color: #FF6B6B;
  font-weight: 500;
}
</style>
