<template>
  <v-app>
    <NavBar />

    <v-main>
      <v-container class="py-4">
        <router-view />
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style scoped>
</style>