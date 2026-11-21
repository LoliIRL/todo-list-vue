<template>
  <div class="auth-form">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleRegister">
      <label>Email <input v-model="email" type="email" required /></label>
      <label
        >Пароль <input v-model="password" type="password" required
      /></label>
      <label
        >Подтвердите пароль
        <input v-model="confirmPassword" type="password" required
      /></label>
      <button type="submit" class="btn-primary">Зарегистрироваться</button>
      <p v-if="error" class="error">{{ error }}</p>
      <RouterLink to="/login">Уже есть аккаунт? Войти</RouterLink>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

const handleRegister = () => {
  error.value = ''
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    error.value = 'Некорректный email'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Пароли не совпадают'
    return
  }
  try {
    userStore.register(email.value, password.value)
    router.push('/login')
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
