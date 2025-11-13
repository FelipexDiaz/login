<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <v-text-field v-model="email" label="Email" />
            <v-text-field v-model="password" label="Password" type="password" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="onLogin">Ingresar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

async function onLogin() {
  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    alert('Credenciales inválidas')
  }
}
</script>
