import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.test' });

export default defineConfig({
	testDir: './e2e',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: 2,
	/* Opt out of parallel tests on CI. */
	workers: 1,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.BASE_CLIENT_URL,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	expect: {
		timeout: 7 * 1000,
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				viewport: {
					width: 1920,
					height: 960,
				},
			},
		},

		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
				viewport: {
					width: 1920,
					height: 960,
				},
			},
		},

		// {
		// 	name: 'webkit',
		// 	use: { ...devices['Desktop Safari'] },
		// },

		/* Test against mobile viewports. */
		// {
		// 	name: 'Mobile Chrome',
		// 	use: { ...devices['Pixel 5'] },
		// },
		// {
		// 	name: 'Mobile Firefox',
		// 	use: { ...devices['Pixel 5'], defaultBrowserType: 'firefox' },
		// },
		// {
		// 	name: 'Mobile Safari',
		// 	use: { ...devices['iPhone 12'] },
		// },
	],
});
