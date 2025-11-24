<template>
  <v-app>
    <NavBar />

    <v-main>
      <v-container class="py-4">

        <!-- 🔥 Aquí se renderiza el contenido local -->
        <router-view />

        <!-- 🔥 Aquí Qiankun inyecta los microfrontends -->
        <div id="micro-container"></div>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style scoped>
#micro-container {
  min-height: 400px;
  width: 100%;
}
</style>
