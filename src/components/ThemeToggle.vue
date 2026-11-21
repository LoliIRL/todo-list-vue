<template>
  <button
    class="theme-btn"
    :aria-label="theme === 'dark' ? 'Включить светлую' : 'Включить тёмную'"
    @click="$emit('toggle')"
  >
    {{ theme === 'dark' ? '☀️' : '🌙' }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ theme: string }>()
defineEmits<{ (e: 'toggle'): void }>()
</script>

<style scoped>
.theme-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  background: var(--bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}
</style>
