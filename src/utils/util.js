/**
 * 生成唯一ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

/**
 * 深拷贝对象
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 防抖函数
 */
export function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/**
 * 节流函数
 */
export function throttle(fn, interval = 300) {
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

/**
 * 数据分组 - 按日期分组记录列表
 */
export function groupByDate(list, dateKey = 'date') {
  const groups = {}
  list.forEach(item => {
    const key = item[dateKey] ? item[dateKey].substring(0, 10) : '未知日期'
    if (!groups[key]) {
      groups[key] = {
        date: key,
        records: []
      }
    }
    groups[key].records.push(item)
  })
  return Object.values(groups).sort((a, b) => b.date.localeCompare(a.date))
}

/**
 * 获取当前日期字符串 YYYY-MM-DD
 */
export function getTodayString() {
  return new Date().toISOString().split('T')[0]
}
