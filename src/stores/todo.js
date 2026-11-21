import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [] // { id, title, done, userId }
  }),
  getters: {
    userTasks: (state) => {
      const userStore = useUserStore()
      if (!userStore.currentUser) return []
      return state.tasks.filter(t => t.userId === userStore.currentUser.id)
    }
  },
  actions: {
    addTask(title) {
      const userStore = useUserStore()
      if (!userStore.currentUser) return
      this.tasks.push({
        id: Date.now(),
        title,
        done: false,
        userId: userStore.currentUser.id
      })
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) task.done = !task.done
    },
    updateTask(id, title) {
      const task = this.tasks.find(t => t.id === id)
      if (task) task.title = title
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  },
  persist: true
})