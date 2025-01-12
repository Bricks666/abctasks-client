import * as path from 'node:path';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		setupFiles: [path.resolve(__dirname, './configs/tests/setup.ts')],
		globalSetup: path.resolve(__dirname, './configs/tests/global-setup.ts'),
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
			'@reatom/form': path.resolve(
				__dirname,
				'src',
				'shared',
				'lib',
				'reatom-form'
			),
			'~/test-utils': path.resolve(__dirname, 'test-utils'),
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
