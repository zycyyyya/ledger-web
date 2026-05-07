<template>
  <div class="settings-page">
    <div class="settings-group">
      <h3>通用设置</h3>
      <div class="setting-item">
        <span>主题</span>
        <el-switch v-model="darkMode" active-text="深色" inactive-text="浅色" />
      </div>
      <div class="setting-item">
        <span>货币单位</span>
        <span class="setting-value">¥ 人民币</span>
      </div>
    </div>

    <div class="settings-group">
      <h3>数据管理</h3>
      <div class="setting-item clickable" @click="exportData">
        <span>导出数据</span>
        <el-icon><ArrowRight /></el-icon>
      </div>
      <div class="setting-item clickable" @click="clearAllData">
        <span class="danger">清除所有数据</span>
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>

    <div class="settings-group">
      <h3>关于</h3>
      <div class="setting-item">
        <span>版本</span>
        <span class="setting-value">1.0.0</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'

const darkMode = ref(false)

function exportData() {
  const records = localStorage.getItem('ledger_records')
  if (!records) {
    ElMessage.warning('暂无数据可导出')
    return
  }
  const blob = new Blob([records], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ledger-export-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('导出成功')
}

function clearAllData() {
  ElMessageBox.confirm(
    '确定要清除所有数据吗？此操作不可撤销。',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    localStorage.removeItem('ledger_records')
    ElMessage.success('数据已清除')
    window.location.reload()
  }).catch(() => {})
}
</script>

<style scoped lang="scss">
.settings-page {
  padding: 16px;
  padding-bottom: 80px;
}

.settings-group {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;

  h3 {
    font-size: 13px;
    color: #999;
    padding: 12px 16px;
    background: #f5f6fa;
    margin: 0;
  }
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &.clickable {
    cursor: pointer;

    &:hover {
      background: #f9f9f9;
    }
  }
}

.setting-value {
  color: #666;
  font-size: 14px;
}

.danger {
  color: #FF6B6B;
}
</style>
