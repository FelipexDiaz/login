import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '../views/Login.vue'
import DashboardView from '../views/Permisos.vue'
import TokenView from '../views/Token.vue'
import { useAuthStore } from '../store/auth'
import axios from 'axios'

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

/* ===========================================================
   🔥 FUNCION: Cargar módulos dinámicos según permisos
   =========================================================== */
let modulosCargados = false

export async function cargarModulosDinamicos() {
  if (modulosCargados) return

  const auth = useAuthStore()
  if (!auth.accessToken) return

  try {
    const response = await axios.get('http://localhost/login-backend/modulos', {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })

    if (response.data.ok) {
      response.data.modulos.forEach(mod => {
        // Evitar agregar rutas duplicadas
        if (!router.hasRoute(mod.nombre)) {
          router.addRoute({
            path: mod.ruta,
            name: mod.nombre,
            component: () =>
              import(`../modules/${mod.componente}.vue`)
          })
          console.log(`🔥 Módulo añadido: ${mod.nombre} → ${mod.ruta}`)
        }
      })

      modulosCargados = true
    }
  } catch (error) {
    console.error("❌ Error cargando módulos dinámicos:", error)
  }
}

/* ===========================================================
   🔹 Guard de autenticación
   =========================================================== */
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const requiresAuth = to.meta.requiresAuth
  const guest = to.meta.guest

  // Si requiere auth y no hay token → login
  if (requiresAuth && !auth.accessToken) {
    return next('/login')
  }

  // Si está logueado, cargar módulos dinámicos
  if (auth.accessToken) {
    await cargarModulosDinamicos()
  }

  next()
})

export default router

