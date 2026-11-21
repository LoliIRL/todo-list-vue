import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import TodoPage from '../pages/TodoPage.vue'
import AboutPage from '../pages/AboutPage.vue'

const routes = [
  { path: '/', name: 'todo', component: TodoPage, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(), // Позволяет работать на GitHub Pages без настройки сервера
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router