<template>
  <div style="margin-bottom: 1rem">
    <label for="search" class="sr-only">Поиск задач</label>
    <input
      id="search"
      type="search"
      :value="modelValue"
      placeholder="Найти задачу..."
      class="search-input"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--panel);
  color: var(--text);
  font-size: 1rem;
}
</style>
