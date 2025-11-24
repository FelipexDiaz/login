import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '../views/Login.vue'
import DashboardView from '../views/Permisos.vue'
import TokenView from '../views/Token.vue'
import { useAuthStore } from '../store/auth'
import api from '../api'
import { registerMicroApps } from 'qiankun'

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

  // Asegurarse de que los datos del usuario estén disponibles
  if (!auth.user) {
    try {
      await auth.fetchUser?.() // si tienes un método para cargar user desde API
    } catch (e) {
      console.error("❌ Error cargando datos del usuario:", e)
      return
    }
  }

  try {
    const response = await api.get('/modulos') // <-- reemplazamos axios por api

    if (response.data.ok) {
      const apps = response.data.modulos.map(mod => ({
        name: mod.nombre,
        entry: mod.entry,
        container: mod.container,
        activeRule: mod.ruta,
        props: {
          token: auth.accessToken, 
          user: auth.user          
        }
      }))

      // Registrar micro-apps dinámicamente
      registerMicroApps(apps)

      console.log("🔥 Micro-frontends registrados:", apps)

      modulosCargados = true
    }
  } catch (error) {
    console.error("❌ Error cargando micro-frontends dinámicos:", error)
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
