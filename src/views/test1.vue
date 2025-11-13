<template>
  <v-container class="py-6">
    <div v-if="hasPermission">
      <v-card class="pa-4">
        <v-card-title>Contenido Protegido</v-card-title>
        <v-card-text>
          ¡Tienes el permiso necesario para ver esta página!
        </v-card-text>
      </v-card>
    </div>

    <div v-else>
      <v-alert type="error" border="left" colored-border>
        ❌ No tienes permiso para acceder a esta página.
      </v-alert>
    </div>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../store/auth'

const auth = useAuthStore()

// Número de permiso requerido para acceder a la página
const requiredPermission = 1  // Cambia este número según tu lógica

// Computed para verificar si el usuario tiene el permiso
const hasPermission = computed(() => {
  return auth.user?.permissions?.includes(requiredPermission)
})
</script>