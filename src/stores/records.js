import { defineStore } from 'pinia'
import { generateId, groupByDate } from '@/utils/util'

const STORAGE_KEY = 'ledger_records'

export const useRecordStore = defineStore('records', {
  state: () => ({
    records: [],
    loading: false
  }),
  getters: {
    todayRecords: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.records.filter(r => r.date && r.date.startsWith(today))
    },
    monthRecords: (state) => {
      const now = new Date()
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
      return state.records.filter(r => r.date && r.date.startsWith(month))
    },
    groupedRecords: (state) => {
      return groupByDate(state.records)
    },
    totalExpense: (state) => {
      return state.records
        .filter(r => r.type === 'expense')
        .reduce((sum, r) => sum + r.amount, 0)
    },
    totalIncome: (state) => {
      return state.records
        .filter(r => r.type === 'income')
        .reduce((sum, r) => sum + r.amount, 0)
    },
    balance: (state) => {
      return state.totalIncome - state.totalExpense
    }
  },
  actions: {
    init() {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          this.records = JSON.parse(saved)
        } catch (e) {
          console.error('Failed to load records:', e)
          this.records = []
        }
      }
    },
    addRecord(record) {
      const newRecord = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        ...record
      }
      this.records.unshift(newRecord)
      this.save()
      return newRecord
    },
    updateRecord(id, updates) {
      const index = this.records.findIndex(r => r.id === id)
      if (index !== -1) {
        this.records[index] = { ...this.records[index], ...updates }
        this.save()
      }
    },
    deleteRecord(id) {
      this.records = this.records.filter(r => r.id !== id)
      this.save()
    },
    getRecordsByDate(date) {
      return this.records.filter(r => r.date && r.date.startsWith(date))
    },
    getRecordsByMonth(year, month) {
      const monthStr = `${year}-${String(month).padStart(2, '0')}`
      return this.records.filter(r => r.date && r.date.startsWith(monthStr))
    },
    getExpenseByCategory() {
      const map = {}
      this.records
        .filter(r => r.type === 'expense')
        .forEach(r => {
          if (!map[r.categoryId]) {
            map[r.categoryId] = 0
          }
          map[r.categoryId] += r.amount
        })
      return Object.entries(map)
        .map(([categoryId, amount]) => ({ categoryId, amount }))
        .sort((a, b) => b.amount - a.amount)
    },
    getMonthlyTrend(months = 6) {
      const result = []
      const now = new Date()
      for (let i = months - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const year = d.getFullYear()
        const month = d.getMonth() + 1
        const monthStr = `${year}-${String(month).padStart(2, '0')}`
        const monthRecords = this.records.filter(r => r.date && r.date.startsWith(monthStr))
        result.push({
          month: monthStr,
          expense: monthRecords.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0),
          income: monthRecords.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0)
        })
      }
      return result
    },
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.records))
    }
  }
})
