import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [
		vue(),
	],
	resolve: {
		alias: {
			'src/': `${path.resolve(__dirname, 'src')}/`,
		}
	}
})
