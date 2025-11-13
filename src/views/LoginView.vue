<template>
  <v-container class="py-4" max-width="400">
    <v-card>
      <v-card-title>Acceso</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="onLogin" ref="formRef">
          <v-text-field
            data-testid="email-input"
            v-model="email"
            label="Email"
            type="email"
            required
          />
          <v-text-field
            data-testid="password-input"
            v-model="password"
            label="Password"
            type="password"
            required
          />

          <v-btn type="submit" color="primary" class="mt-2" block>
            Ingresar
          </v-btn>

        </v-form>
      </v-card-text>
    </v-card>
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
const formRef = ref(null)

async function onLogin() {
  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    alert('Credenciales inválidas')
  }
}
</script>