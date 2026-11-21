import { defineStore } from 'pinia'
import type { User } from '../types/user'

interface UserState {
  users: User[]
  currentUser: User | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    currentUser: null
  }),
  actions: {
    register(email: string, password: string): void {
      if (this.users.some((u) => u.email === email)) {
        throw new Error('Пользователь с таким email уже существует')
      }
      this.users.push({ id: Date.now().toString(), email, password })
    },
    login(email: string, password: string): void {
      const user = this.users.find(
        (u) => u.email === email && u.password === password
      )
      if (!user) throw new Error('Неверный email или пароль')
      this.currentUser = user
    },
    logout(): void {
      this.currentUser = null
    }
  },
  persist: true
})
