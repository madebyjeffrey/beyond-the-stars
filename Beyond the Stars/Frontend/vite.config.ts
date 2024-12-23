import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import * as fs from 'node:fs';

// https://vite.dev/config/
export default defineConfig({
	server: {
		https: {
			key: fs.readFileSync('./192.168.50.136+4-key.pem'),
			cert: fs.readFileSync('./192.168.50.136+4.pem')
		},
		hmr: false // doesn't work in safari very well
	},
	plugins: [svelte(), tailwindcss()]
});
