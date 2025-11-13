<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
    <div class="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg">
      <h2 class="text-xl font-semibold mb-4">Bienvenido, {{ auth.user?.name }}</h2>
      <p><b>Email:</b> {{ auth.user?.mail }}</p>
      <p><b>ID:</b> {{ auth.user?.id }}</p>

      <h3 class="mt-4 font-semibold">Permisos:</h3>
      <ul class="list-disc list-inside">
        <li v-for="p in auth.user?.permissions" :key="p">Permiso #{{ p }}</li>
      </ul>

      <div class="flex justify-between mt-6">
        <button @click="refresh" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          🔁 Refrescar Token
        </button>

        <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          🚪 Cerrar Sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  router.push('/login')
}

const refresh = async () => {
  try {
    await auth.refreshTokens()
    alert('Token renovado correctamente ✅')
  } catch (e) {
    alert('Error al renovar token')
  }
}
</script>
