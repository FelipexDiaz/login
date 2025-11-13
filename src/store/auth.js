import { defineStore } from 'pinia'
import api from '../api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  }),

  actions: {
    async login(email, password) {
      const { data } = await api.post('/login', { email, password })
      this.accessToken = data.access_token
      this.refreshToken = data.refresh_token
      this.user = data.user
      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)
    },

    async fetchUser() {
      const { data } = await api.get('/user')
      this.user = data.user
    },

    async refreshTokens() {
      const { data } = await api.post('/refresh', { refresh_token: this.refreshToken })
      this.accessToken = data.access_token
      this.refreshToken = data.refresh_token
      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)
    },

    async logout() {
      try {
        await api.post('/logout', { refresh_token: this.refreshToken })
      } catch (e) {}
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      localStorage.clear()
    },
  },
})
