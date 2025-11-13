<template>
<v-container class="fill-height d-flex align-center justify-center">
<v-card class="pa-6" max-width="500">

<v-card-actions class="d-flex justify-space-between">
<v-btn color="green" @click="refresh" dark>
🔁 Refrescar Token
</v-btn>

</v-card-actions>
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
