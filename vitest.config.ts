import * as path from 'node:path';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		setupFiles: ['./configs/tests/setup.ts'],
		include: ['./src/**/*.spec.{ts,tsx}'],
		clearMocks: true,
		globals: true,
		coverage: {
			reporter: ['text', 'json-summary', 'json'],
			reportOnFailure: true,
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'~': path.resolve(__dirname, 'configs'),
		},
	},
	plugins: [
		babel({
			babelrc: true,
			configFile: true,
			babelHelpers: 'bundled',
			browserslistConfigFile: true,
			extensions: ['.ts', '.tsx'],
		}),
	],
});
