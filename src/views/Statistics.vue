<template>
  <div class="statistics-page">
    <DatePicker v-model="selectedMonth" />

    <!-- 分类占比饼图 -->
    <div class="chart-section">
      <h3>支出分类占比</h3>
      <div ref="pieChartRef" class="chart-container" />
      <div v-if="categoryData.length === 0" class="chart-empty">暂无数据</div>
    </div>

    <!-- 月度趋势折线图 -->
    <div class="chart-section">
      <h3>月度趋势</h3>
      <div ref="lineChartRef" class="chart-container" />
    </div>

    <!-- 分类明细列表 -->
    <div class="category-list">
      <div
        v-for="item in categoryData"
        :key="item.categoryId"
        class="category-row"
      >
        <div class="category-info">
          <span class="category-icon">{{ getCategoryIcon(item.categoryId) }}</span>
          <span class="category-name">{{ getCategoryName(item.categoryId) }}</span>
        </div>
        <div class="category-detail">
          <span class="category-amount">{{ formatMoney(item.amount) }}</span>
          <span class="category-percent">{{ getPercent(item.amount) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useRecordStore } from '@/stores/records'
import { useCategoryStore } from '@/stores/categories'
import { formatMoney } from '@/utils/format'
import DatePicker from '@/components/DatePicker.vue'

const recordStore = useRecordStore()
const categoryStore = useCategoryStore()

const selectedMonth = ref(new Date().toISOString().slice(0, 7))
const pieChartRef = ref(null)
const lineChartRef = ref(null)

let pieChart = null
let lineChart = null

onMounted(() => {
  recordStore.init()
  initCharts()
})

watch(selectedMonth, () => {
  updateCharts()
})

const monthRecords = computed(() =>
  recordStore.records.filter(r => r.date && r.date.startsWith(selectedMonth.value))
)

const categoryData = computed(() => {
  const map = {}
  monthRecords.value
    .filter(r => r.type === 'expense')
    .forEach(r => {
      if (!map[r.categoryId]) map[r.categoryId] = 0
      map[r.categoryId] += r.amount
    })
  return Object.entries(map)
    .map(([categoryId, amount]) => ({ categoryId, amount }))
    .sort((a, b) => b.amount - a.amount)
})

const totalExpense = computed(() =>
  categoryData.value.reduce((sum, item) => sum + item.amount, 0)
)

function getCategoryIcon(categoryId) {
  return categoryStore.getCategoryById(categoryId, 'expense')?.icon || '📝'
}

function getCategoryName(categoryId) {
  return categoryStore.getCategoryById(categoryId, 'expense')?.name || '未分类'
}

function getCategoryColor(categoryId) {
  return categoryStore.getCategoryById(categoryId, 'expense')?.color || '#B0BEC5'
}

function getPercent(amount) {
  if (totalExpense.value === 0) return 0
  return ((amount / totalExpense.value) * 100).toFixed(1)
}

function initCharts() {
  pieChart = echarts.init(pieChartRef.value)
  lineChart = echarts.init(lineChartRef.value)
  updateCharts()
  window.addEventListener('resize', handleResize)
}

function updateCharts() {
  updatePieChart()
  updateLineChart()
}

function updatePieChart() {
  if (!pieChart) return
  const option = {
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: { show: false },
      data: categoryData.value.map(item => ({
        name: getCategoryName(item.categoryId),
        value: item.amount,
        itemStyle: { color: getCategoryColor(item.categoryId) }
      }))
    }]
  }
  pieChart.setOption(option)
}

function updateLineChart() {
  if (!lineChart) return
  const trend = recordStore.getMonthlyTrend(6)
  const option = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['支出', '收入'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: trend.map(t => t.month.slice(5) + '月')
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '支出',
        type: 'line',
        data: trend.map(t => t.expense),
        smooth: true,
        itemStyle: { color: '#FF6B6B' }
      },
      {
        name: '收入',
        type: 'line',
        data: trend.map(t => t.income),
        smooth: true,
        itemStyle: { color: '#4CAF50' }
      }
    ]
  }
  lineChart.setOption(option)
}

function handleResize() {
  pieChart?.resize()
  lineChart?.resize()
}
</script>

<style scoped lang="scss">
.statistics-page {
  padding: 16px;
  padding-bottom: 80px;
}

.chart-section {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-top: 12px;
  margin-bottom: 16px;

  h3 {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;
  }
}

.chart-container {
  width: 100%;
  height: 300px;
}

.chart-empty {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 14px;
}

.category-list {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.category-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.category-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.category-icon {
  font-size: 20px;
}

.category-name {
  font-size: 14px;
  color: #333;
}

.category-detail {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-amount {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.category-percent {
  font-size: 12px;
  color: #999;
  min-width: 45px;
  text-align: right;
}
</style>
