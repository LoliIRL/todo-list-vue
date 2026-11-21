<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
    <div
      class="modal-content"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">
        {{ initialTitle ? 'Редактировать' : 'Новая задача' }}
      </h2>
      <form @submit.prevent="onSubmit">
        <label>
          <span class="label-text">Название задачи</span>
          <input v-model="title" type="text" required class="input" />
        </label>
        <div class="modal-actions">
          <button type="button" @click="$emit('close')">Отмена</button>
          <button type="submit" class="btn-primary">Сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    isOpen: boolean
    initialTitle?: string
  }>(),
  {
    initialTitle: ''
  }
)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', title: string): void
}>()

const title = ref('')

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      title.value = props.initialTitle || ''
    }
  }
)

const onSubmit = () => {
  if (title.value.trim()) emit('save', title.value.trim())
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.modal-content {
  background: var(--panel);
  padding: 1.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
}
h2 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}
.label-text {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  margin-bottom: 1rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.btn-primary {
  background: var(--primary);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}
</style>
