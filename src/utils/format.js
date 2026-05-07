/**
 * 金额格式化 - 保留两位小数
 */
export function formatAmount(amount, decimals = 2) {
  if (amount === null || amount === undefined || isNaN(amount)) return '0.00'
  const num = Number(amount)
  return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 金额格式化 - 带货币符号
 */
export function formatMoney(amount, symbol = '¥') {
  return symbol + formatAmount(amount)
}

/**
 * 日期格式化
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
}

/**
 * 获取相对日期描述
 */
export function getRelativeDate(dateStr) {
  const today = new Date()
  const date = new Date(dateStr)
  const todayStr = today.toISOString().split('T')[0]
  const dateStrFormatted = date.toISOString().split('T')[0]

  if (dateStrFormatted === todayStr) return '今天'

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (dateStrFormatted === yesterday.toISOString().split('T')[0]) return '昨天'

  return dateStrFormatted
}
