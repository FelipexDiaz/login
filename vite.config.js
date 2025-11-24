import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
    server: {
    port: 5173
  },
  plugins: [
    vue(),
    vuetify({
      autoImport: true, // esto importa automáticamente todos los componentes que uses en templates
    })
  ],
})
