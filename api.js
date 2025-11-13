import axios from 'axios'
import { useAuthStore } from './store/auth'

const api = axios.create({
  baseURL: 'http://localhost/dev',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const auth = useAuthStore()
    if (error.response && error.response.status === 401 && auth.refreshToken) {
      try {
        await auth.refreshTokens()
        return api(error.config)
      } catch (e) {
        await auth.logout()
      }
    }
    return Promise.reject(error)
  }
)

export default api
