/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { babel } from '@rollup/plugin-babel';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 3000,
		host: 'localhost',
		cors: true,
		open: true,
		hmr: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	css: {
		devSourcemap: true,
		modules: {},
		postcss: {},
	},
	plugins: [
		babel({
			babelrc: true,
			configFile: './configs/.babelrc',
			babelHelpers: 'bundled',
			browserslistConfigFile: true,
		}),
		react(),
	],
});
