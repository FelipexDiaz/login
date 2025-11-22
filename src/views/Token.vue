<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" max-width="500">

      <!-- Cuadro donde se muestra el token -->
      <v-card class="pa-4 mb-4" outlined>
        <strong>TOKEN:</strong><br>
        {{ auth.accessToken }}
      </v-card>

      <!-- Botón debajo -->
      <v-btn color="green" @click="refresh" dark block>
        🔁 Refrescar Token
      </v-btn>

    </v-card>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const refresh = async () => {
  try {
    await auth.refreshTokens()
    alert('Token renovado correctamente ✅')
  } catch (e) {
    alert('Error al renovar token')
  }
}
</script>
