import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [], // { id, email, password }
    currentUser: null
  }),
  actions: {
    register(email, password) {
      if (this.users.some(u => u.email === email)) {
        throw new Error('Пользователь с таким email уже существует')
      }
      this.users.push({ id: Date.now().toString(), email, password })
    },
    login(email, password) {
      const user = this.users.find(u => u.email === email && u.password === password)
      if (!user) throw new Error('Неверный email или пароль')
      this.currentUser = user
    },
    logout() {
      this.currentUser = null
    }
  },
  persist: true // Плагин сохранит users и currentUser в localStorage
})