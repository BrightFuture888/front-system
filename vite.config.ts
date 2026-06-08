import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'






// https://vite.dev/config/
export default defineConfig(()=>{
// 1.注入环境变量
const configEnv = loadEnv('.env', process.cwd())

const { VITE_PORT,VITE_HOST } = configEnv

  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
    ],
    server: {
      port: parseInt(VITE_PORT),
      open: true,
      host: VITE_HOST,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
