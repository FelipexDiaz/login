import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '../views/Login.vue'
import DashboardView from '../views/Permisos.vue'
import TokenView from '../views/Token.vue'
import { useAuthStore } from '../store/auth'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView, meta: { guest: true } },
  { path: '/token', name: 'Token', component: TokenView, meta: { requiresAuth: true } },
  { path: '/permisos', name: 'Permisos', component: DashboardView, meta: { requiresAuth: true } },  
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

