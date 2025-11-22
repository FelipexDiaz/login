import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router, { cargarModulosDinamicos } from './router'

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

  // 🔥 Cargar módulos dinámicos ANTES de que Vue monte
  await cargarModulosDinamicos()

  app.use(router)
  app.use(vuetify)

  app.mount('#app')
}

bootstrap()
