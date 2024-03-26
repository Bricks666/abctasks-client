/* eslint-disable import/no-extraneous-dependencies */
import * as path from 'node:path';

import { babel } from '@rollup/plugin-babel';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const localeFileRegexp = /src\/([\w-/ ])*\/([\w-]+)\/([\w-]+)\.json$/;

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, '.', '');
	const __PROD__ = mode === 'production';

	const plugins = [
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
						const matches = path.match(localeFileRegexp);

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
	];

	if (__PROD__) {
		plugins.push(
			VitePWA({
				registerType: 'autoUpdate',
				manifest: {
					name: 'ABCTasks',
					short_name: 'ABC',
					description:
						'Simple and functional task manager. It is great for single and team usage.',
					screenshots: [
						{
							src: 'screenshots/rooms-light-desktop.webp',
							sizes: '1280x720',
							type: 'image/webp',
							form_factor: 'wide',
							label: 'Rooms list of user in light scheme',
						},
						{
							src: 'screenshots/rooms-dark-desktop.webp',
							sizes: '1280x720',
							type: 'image/webp',
							form_factor: 'wide',
							label: 'Rooms list of user in dark scheme',
						},
						{
							src: 'screenshots/tasks-light-desktop.webp',
							sizes: '1280x720',
							type: 'image/webp',
							form_factor: 'wide',
							label: 'Tasks page of user in light scheme',
						},
						{
							src: 'screenshots/tasks-dark-desktop.webp',
							sizes: '1280x720',
							type: 'image/webp',
							form_factor: 'wide',
							label: 'Tasks page of user in dark scheme',
						},

						{
							src: 'screenshots/rooms-light-mobile.webp',
							sizes: '360x720',
							type: 'image/webp',
							form_factor: 'narrow',
							label: 'Rooms list of user in light scheme',
						},
						{
							src: 'screenshots/rooms-dark-mobile.webp',
							sizes: '360x720',
							type: 'image/webp',
							form_factor: 'narrow',
							label: 'Rooms list of user in dark scheme',
						},
						{
							src: 'screenshots/tasks-light-mobile.webp',
							sizes: '360x720',
							type: 'image/webp',
							form_factor: 'narrow',
							label: 'Tasks page of user in light scheme',
						},
						{
							src: 'screenshots/tasks-dark-mobile.webp',
							sizes: '360x720',
							type: 'image/webp',
							form_factor: 'narrow',
							label: 'Tasks page of user in dark scheme',
						},
					],
					icons: [
						{
							src: 'images/icon-48.webp',
							type: 'image/webp',
							sizes: '48x48',
						},
						{
							src: 'images/icon-256.webp',
							type: 'image/webp',
							sizes: '256x256',
						},
						{
							src: 'images/icon-512.webp',
							type: 'image/webp',
							sizes: '512x512',
						},
						{
							src: 'images/icon.svg',
							sizes: 'any',
						},
					],
					start_url: '.',
					scope: '/',
					display: 'standalone',
					theme_color: '#f5f5f5',
					background_color: '#f5f5f5',
					categories: ['productivity', 'personalization', 'lifestyle'],
				},
			})
		);
	}

	return {
		build: {
			sourcemap: true,
		},
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
		plugins,
	};
});
