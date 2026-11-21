import { defineStore } from 'pinia'
import { useUserStore } from './user'
import type { Task } from '../types/todo'

interface TodoState {
  tasks: Task[]
}

export const useTodoStore = defineStore('todo', {
  state: (): TodoState => ({
    tasks: []
  }),
  getters: {
    userTasks(state): Task[] {
      const userStore = useUserStore()
      if (!userStore.currentUser) return []
      return state.tasks.filter((t) => t.userId === userStore.currentUser!.id)
    }
  },
  actions: {
    addTask(title: string): void {
      const userStore = useUserStore()
      if (!userStore.currentUser) return
      this.tasks.push({
        id: Date.now(),
        title,
        done: false,
        userId: userStore.currentUser.id
      })
    },
    toggleTask(id: number): void {
      const task = this.tasks.find((t) => t.id === id)
      if (task) task.done = !task.done
    },
    updateTask(id: number, title: string): void {
      const task = this.tasks.find((t) => t.id === id)
      if (task) task.title = title
    },
    deleteTask(id: number): void {
      this.tasks = this.tasks.filter((t) => t.id !== id)
    }
  },
  persist: true
})
