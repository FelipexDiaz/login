import { defineStore } from 'pinia'
import api from '../api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    modulos: JSON.parse(localStorage.getItem('modulos') || '[]'),
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  }),

  actions: {
    /* =============================
       🔹 LOGIN
       ============================= */
    async login(email, password) {
      const { data } = await api.post('/login', { email, password })

      this.accessToken = data.access_token
      this.refreshToken = data.refresh_token
      this.user = data.user

      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)

      // 🔥 cargar módulos permitidos después del login
      await this.fetchModulos()
    },

    /* =============================
       🔹 OBTENER USER (en reload)
       ============================= */
    async fetchUser() {
      const { data } = await api.get('/user')
      this.user = data.user

      // 🔥 volver a cargar módulos si no hay o si están vacíos
      if (this.modulos.length === 0) {
        await this.fetchModulos()
      }
    },

    /* =============================
       🔹 OBTENER MODULOS
       ============================= */
    async fetchModulos() {
      try {
        const { data } = await api.get('/modulos')
        this.modulos = data.modulos

        // Guardar para mantener menú tras F5
        localStorage.setItem('modulos', JSON.stringify(this.modulos))
      } catch (err) {
        console.error('Error cargando módulos:', err)
      }
    },

    /* =============================
       🔹 REFRESH TOKENS
       ============================= */
    async refreshTokens() {
      const { data } = await api.post('/refresh', { refresh_token: this.refreshToken })

      this.accessToken = data.access_token
      this.refreshToken = data.refresh_token

      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)
    },

    /* =============================
       🔹 LOGOUT
       ============================= */
    async logout() {
      try {
        await api.post('/logout', { refresh_token: this.refreshToken })
      } catch (e) {}

      this.user = null
      this.modulos = []
      this.accessToken = null
      this.refreshToken = null

      localStorage.clear()
    },
  },
})
