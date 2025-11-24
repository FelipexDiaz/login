import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

// Qiankun
import { registerMicroApps, start } from 'qiankun'
import { useAuthStore } from './store/auth'
import { cargarModulosDinamicos } from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components: {
    ...components,
    VListItemContent: components.VListItemContent,
    VListItemTitle: components.VListItemTitle,
    VListItemSubtitle: components.VListItemSubtitle,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

async function bootstrap() {
  const app = createApp(App)

  app.use(createPinia())

  // ======================================================
  // 🔥 1) Inicializar store y router (para obtener token)
  // ======================================================
  app.use(router)
  app.use(vuetify)

  // ======================================================
  // 🔥 2) Intentar cargar microfrontends dinámicos
  // ======================================================
  const auth = useAuthStore()
  
  if (auth.accessToken) {
    await cargarModulosDinamicos()
  }

  // ======================================================
  // 🔥 3) Iniciar Qiankun (solo una vez)
  // ======================================================
  start()

  // ======================================================
  // 🔥 4) Finalmente montar Vue
  // ======================================================
  app.mount('#app')
}

bootstrap()
