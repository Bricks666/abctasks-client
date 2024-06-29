import { defineConfig } from 'vitest/config';
export default defineConfig({
	test: {
		environment: 'jsdom',
		setupFiles: ['./configs/tests/setup.ts'],
		include: ['./src/**/*.spec.{ts,tsx}'],
		clearMocks: true,
		globals: true,
	},
});
