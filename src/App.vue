<template>
  <header class="header">
    <div class="header-inner">
      <h1>📝 To-Do (Vue)</h1>
      <nav class="nav">
        <RouterLink to="/">Задачи</RouterLink>
        <RouterLink to="/about">О нас</RouterLink>
        <template v-if="userStore.currentUser">
          <span class="user-email">{{ userStore.currentUser.email }}</span>
          <button @click="logout" class="btn-primary">Выйти</button>
        </template>
        <template v-else>
          <RouterLink to="/login">Вход</RouterLink>
          <RouterLink to="/register">Регистрация</RouterLink>
        </template>
        <ThemeToggle @toggle="toggleTheme" :theme="theme" />
      </nav>
    </div>
  </header>
  <main class="main">
    <RouterView />
  </main>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user'
import ThemeToggle from './components/ThemeToggle.vue'

const userStore = useUserStore()
const router = useRouter()
const theme = ref(localStorage.getItem('vue-todo-theme') || 'light')

watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('vue-todo-theme', newTheme)
}, { immediate: true })

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.header { background: var(--panel); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 10; }
.header-inner { max-width: 800px; margin: 0 auto; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
h1 { font-size: 1.5rem; color: var(--primary); }
.nav { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
.nav a { color: var(--text); text-decoration: none; font-weight: 500; }
.nav a:hover { color: var(--primary); }
.user-email { font-size: 0.9rem; color: var(--muted); }
.btn-primary { background: var(--primary); color: #fff; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 500; }
.btn-primary:hover { filter: brightness(1.1); }
.main { max-width: 800px; margin: 0 auto; padding: 2rem 1.5rem; }
</style>