<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title class="text-h5">Panel de Usuario</v-card-title>
          <v-card-text>
            <!-- Información del usuario -->
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><strong>Nombre:</strong> {{ auth.user?.name }}</v-list-item-title>
                  <v-list-item-subtitle><strong>Email:</strong> {{ auth.user?.mail || auth.user?.email }}</v-list-item-subtitle>
                  <v-list-item-subtitle><strong>ID:</strong> {{ auth.user?.id }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider class="my-4"></v-divider>

            <!-- Permisos -->
            <div>
              <h3>Permisos:</h3>
              <v-chip-group>
                <v-chip v-for="p in auth.user?.permissions || []" :key="p" color="primary" class="ma-1">
                  Permiso #{{ p }}
                </v-chip>
              </v-chip-group>
            </div>

            <v-divider class="my-4"></v-divider>

            <!-- Access Token -->
            <div>
              <h3>Access Token:</h3>
              <v-textarea
                v-model="auth.accessToken"
                readonly
                rows="4"
              ></v-textarea>
            </div>
          </v-card-text>

          <!-- Botones de acción -->
          <v-card-actions>
            <v-btn color="green" @click="onRefresh" class="ma-2">🔁 Refrescar Token</v-btn>
            <v-btn color="red" @click="onLogout" class="ma-2">🚪 Cerrar Sesión</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

// Pinia store
const auth = useAuthStore()
const router = useRouter()

// Al montar, verificamos token y traemos usuario
onMounted(async () => {
  try {
    if (!auth.accessToken) {
      router.push('/login')
      return
    }
    await auth.fetchUser()
  } catch (err) {
    console.error('Error fetching user:', err)
    await auth.logout()
    router.push('/login')
  }
})

// Refrescar token
async function onRefresh() {
  try {
    await auth.refreshTokens()
    await auth.fetchUser()
    alert('Token renovado correctamente ✅')
  } catch (e) {
    console.error('Error refreshing token:', e)
    alert('No se pudo renovar token — inicia sesión de nuevo')
    await auth.logout()
    router.push('/login')
  }
}

// Logout
async function onLogout() {
  await auth.logout()
  router.push('/login')
}
</script>
