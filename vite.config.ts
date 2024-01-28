/* eslint-disable import/no-extraneous-dependencies */
import * as path from 'path';

import { babel } from '@rollup/plugin-babel';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const LOCALE_FILE_REGEXP = /src\/([\w-/ ])*\/([\w-]+)\/([\w-]+)\.json$/;

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, '.', '');

	return {
		server: {
			port: 3000,
			cors: true,
			proxy: {
				'/api': {
					changeOrigin: true,
					target: env.API_HOST,
					rewrite: (url) => url.replace('/api', ''),
				},
			},
		},
		preview: {
			port: 3000,
			cors: true,
			proxy: {
				'/api': {
					changeOrigin: true,
					target: env.API_HOST,
					rewrite: (url) => url.replace('/api', ''),
				},
			},
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		css: {
			devSourcemap: true,
		},
		plugins: [
			react(),
			babel({
				babelrc: true,
				configFile: true,
				babelHelpers: 'bundled',
				browserslistConfigFile: true,
				extensions: ['.ts', '.tsx'],
			}),
			splitVendorChunkPlugin(),
			viteStaticCopy({
				targets: [
					{
						src: 'src/**/locales/**/*.json',
						rename: (_name, _extension, path) => {
							const matches = path.match(LOCALE_FILE_REGEXP);

							if (matches.length < 4) {
								return '';
							}

							const [, , language, namespace] = matches;

							return `${language}/${namespace}.json`;
						},
						dest: 'locales',
					},
				],
			}),
		],
	};
});
