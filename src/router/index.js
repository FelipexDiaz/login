import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '../store/auth'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView, meta: { guest: true } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔹 Guard global de rutas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const guest = to.meta.guest
  const auth = useAuthStore()

  if (requiresAuth && !auth.accessToken) return next('/login')
  


  next()
})

export default router

