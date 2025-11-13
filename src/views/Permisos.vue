<template>
<v-container class="fill-height d-flex align-center justify-center">
<v-card class="pa-6" max-width="500">
<v-card-title class="text-h6">Permisos:</v-card-title>


<v-card-text>
<v-list>
<v-list-item v-for="p in auth.user?.permissions" :key="p">
<v-list-item-content>Permiso #{{ p }}</v-list-item-content>
</v-list-item>
</v-list>
</v-card-text>

</v-card>
</v-container>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

</script>
