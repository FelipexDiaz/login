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
import { useStore } from 'vuex'
import NavBar from './components/NavBar.vue'
const store = useStore()
</script>

<style scoped>
</style>