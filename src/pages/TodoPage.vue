<template>
  <div>
    <div class="toolbar">
      <button class="btn-primary" @click="openModal()">➕ Добавить</button>
    </div>
    
    <SearchBar v-model="searchQuery" />

    <section class="section">
      <h2 class="section-title">Активные</h2>
      <TodoList :tasks="activeTasks" @toggle="todoStore.toggleTask" @edit="openModal" @delete="todoStore.deleteTask" />
      <p v-if="activeTasks.length === 0" class="empty">Активных задач нет</p>
    </section>

    <section class="section">
      <h2 class="section-title">Выполненные</h2>
      <TodoList :tasks="doneTasks" @toggle="todoStore.toggleTask" @edit="openModal" @delete="todoStore.deleteTask" />
      <p v-if="doneTasks.length === 0" class="empty">Выполненных задач нет</p>
    </section>

    <AddTodoModal 
      :isOpen="isModalOpen" 
      :initialTitle="editingTask ? editingTask.title : ''"
      @close="closeModal" 
      @save="saveTask" 
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/todo'
import SearchBar from '../components/SearchBar.vue'
import TodoList from '../components/TodoList.vue'
import AddTodoModal from '../components/AddTodoModal.vue'

const todoStore = useTodoStore()
const searchQuery = ref('')
const isModalOpen = ref(false)
const editingTask = ref(null)

const filteredTasks = computed(() => {
  return todoStore.userTasks.filter(t => t.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const activeTasks = computed(() => filteredTasks.value.filter(t => !t.done))
const doneTasks = computed(() => filteredTasks.value.filter(t => t.done))

const openModal = (task = null) => {
  editingTask.value = task
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingTask.value = null
}

const saveTask = (title) => {
  if (editingTask.value) {
    todoStore.updateTask(editingTask.value.id, title)
  } else {
    todoStore.addTask(title)
  }
  closeModal()
}
</script>

<style scoped>
.toolbar { margin-bottom: 1rem; }
.btn-primary { background: var(--primary); color: #fff; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 500; }
.section { margin-bottom: 2rem; }
.section-title { font-size: 1.1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
.section-title::before { content: ''; display: block; width: 4px; height: 1.2rem; background: var(--primary); border-radius: 2px; }
.empty { color: var(--muted); font-style: italic; padding: 1rem 0; text-align: center; }
</style>