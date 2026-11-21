<template>
  <div class="auth-form">
    <h2>Вход</h2>
    <form @submit.prevent="handleLogin">
      <label>Email <input v-model="email" type="email" required /></label>
      <label
        >Пароль <input v-model="password" type="password" required
      /></label>
      <button type="submit" class="btn-primary">Войти</button>
      <p v-if="error" class="error">{{ error }}</p>
      <RouterLink to="/register">Нет аккаунта? Зарегистрироваться</RouterLink>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

const handleLogin = () => {
  try {
    userStore.login(email.value, password.value)
    router.push('/')
  } catch (e: unknown) {
    if (e instanceof Error) {
      error.value = e.message
    }
  }
}
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
  background: var(--panel);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border);
}
h2 {
  margin-bottom: 1.5rem;
  color: var(--primary);
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
}
input {
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
}
.btn-primary {
  background: var(--primary);
  color: #fff;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 0.5rem;
}
.error {
  color: #ef4444;
  font-size: 0.9rem;
  text-align: center;
}
a {
  color: var(--primary);
  text-align: center;
  font-size: 0.9rem;
}
</style>
