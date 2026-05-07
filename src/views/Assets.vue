<template>
  <div class="assets-page">
    <div class="total-card">
      <div class="label">净资产</div>
      <div class="value">{{ formatMoney(totalAssets) }}</div>
    </div>

    <div class="asset-list">
      <div class="asset-item" v-for="asset in assets" :key="asset.name">
        <div class="asset-info">
          <span class="asset-icon">{{ asset.icon }}</span>
          <span class="asset-name">{{ asset.name }}</span>
        </div>
        <div class="asset-value">{{ formatMoney(asset.amount) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRecordStore } from '@/stores/records'
import { formatMoney } from '@/utils/format'

const recordStore = useRecordStore()

const assets = ref([
  { name: '现金', icon: '💵', amount: 0 },
  { name: '银行卡', icon: '💳', amount: 0 },
  { name: '支付宝', icon: '📱', amount: 0 },
  { name: '微信', icon: '💬', amount: 0 }
])

const totalAssets = computed(() =>
  assets.value.reduce((sum, a) => sum + a.amount, 0)
)
</script>

<style scoped lang="scss">
.assets-page {
  padding: 16px;
  padding-bottom: 80px;
}

.total-card {
  background: linear-gradient(135deg, #4A90D9 0%, #357ABD 100%);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  color: #fff;
  margin-bottom: 20px;

  .label {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: 8px;
  }

  .value {
    font-size: 28px;
    font-weight: 600;
  }
}

.asset-list {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.asset-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.asset-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.asset-icon {
  font-size: 24px;
}

.asset-name {
  font-size: 15px;
  color: #333;
}

.asset-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
</style>
