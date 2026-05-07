import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    expenseCategories: [
      { id: 'food', name: '餐饮', icon: '🍜', color: '#FF6B6B' },
      { id: 'transport', name: '交通', icon: '🚗', color: '#4ECDC4' },
      { id: 'shopping', name: '购物', icon: '🛍️', color: '#45B7D1' },
      { id: 'housing', name: '住房', icon: '🏠', color: '#96CEB4' },
      { id: 'entertainment', name: '娱乐', icon: '🎮', color: '#DDA0DD' },
      { id: 'medical', name: '医疗', icon: '🏥', color: '#FF8C69' },
      { id: 'education', name: '教育', icon: '📚', color: '#6495ED' },
      { id: 'communication', name: '通讯', icon: '📱', color: '#87CEEB' },
      { id: 'clothing', name: '服饰', icon: '👔', color: '#FF69B4' },
      { id: 'beauty', name: '美容', icon: '💄', color: '#FFB6C1' },
      { id: 'sports', name: '运动', icon: '⚽', color: '#98D8C8' },
      { id: 'pet', name: '宠物', icon: '🐾', color: '#DEB887' },
      { id: 'travel', name: '旅行', icon: '✈️', color: '#87CEFA' },
      { id: 'gift', name: '礼物', icon: '🎁', color: '#FF7F50' },
      { id: 'other_expense', name: '其他', icon: '📝', color: '#B0BEC5' }
    ],
    incomeCategories: [
      { id: 'salary', name: '工资', icon: '💰', color: '#4CAF50' },
      { id: 'bonus', name: '奖金', icon: '🏆', color: '#FF9800' },
      { id: 'investment', name: '理财', icon: '📈', color: '#2196F3' },
      { id: 'parttime', name: '兼职', icon: '💼', color: '#9C27B0' },
      { id: 'redpacket', name: '红包', icon: '🧧', color: '#F44336' },
      { id: 'refund', name: '退款', icon: '↩️', color: '#607D8B' },
      { id: 'other_income', name: '其他', icon: '📝', color: '#B0BEC5' }
    ]
  }),
  getters: {
    getCategoriesByType: (state) => (type) => {
      return type === 'income' ? state.incomeCategories : state.expenseCategories
    },
    getCategoryById: (state) => (categoryId, type) => {
      const categories = type === 'income' ? state.incomeCategories : state.expenseCategories
      return categories.find(item => item.id === categoryId) || null
    }
  }
})
