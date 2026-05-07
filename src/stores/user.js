import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    currentBookId: localStorage.getItem('currentBookId') || 'default',
    theme: localStorage.getItem('theme') || 'light'
  }),
  actions: {
    setUserInfo(info) {
      this.userInfo = info
    },
    setCurrentBookId(bookId) {
      this.currentBookId = bookId
      localStorage.setItem('currentBookId', bookId)
    },
    setTheme(theme) {
      this.theme = theme
      localStorage.setItem('theme', theme)
    }
  }
})
