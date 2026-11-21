<template>
  <ul class="list">
    <TodoItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="$emit('toggle', task.id)"
      @edit="$emit('edit', task)"
      @delete="$emit('delete', task.id)"
    />
  </ul>
</template>

<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import type { Task } from '../types/todo'

defineProps<{ tasks: Task[] }>()
defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'edit', task: Task): void
  (e: 'delete', id: number): void
}>()
</script>

<style scoped>
.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
