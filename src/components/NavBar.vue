<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    app
  >
    <v-list>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
        @click="drawer = false"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Sistema</v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="auth.user">
      <span class="me-3">
        {{ auth.user?.id }} | {{ auth.user?.name }} | {{ auth.user?.email }}
      </span>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>

    <template v-else>
      <v-btn text :to="{ path: '/login' }">Login</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const drawer = ref(false)
const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  router.push('/login')
}

/* =======================================================
   🔥 Cargar módulos dinámicos ya guardados en el auth store
   ======================================================= */
const modulos = computed(() => auth.modulos || [])

/* =======================================================
   🔥 Mezclar items fijos con módulos dinámicos
   ======================================================= */
const navItems = computed(() => {
  const baseItems = [
    { title: 'Home', to: '/', visible: true },
    { title: 'Token', to: '/Token', visible: !!auth.user },
  ]

  const dynamicItems = modulos.value.map(m => ({
    title: m.nombre,
    to: m.ruta,
    visible: true
  }))

  return [...baseItems, ...dynamicItems].filter(item => item.visible)
})
</script>

<style scoped>
.me-3 {
  margin-right: 1rem;
}
</style>
