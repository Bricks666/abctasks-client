import { test, expect } from '@playwright/test';

test.describe('login page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/login');
	});

	test('has title', async ({ page }) => {
		await expect(page).toHaveTitle('Login');
	});

	test('has login form', async ({ page }) => {
		const loginForm = page.locator('form');

		await expect(loginForm).toBeVisible();
		await expect(loginForm.getByLabel('Email')).toBeVisible();
		await expect(loginForm.getByLabel('Password')).toBeVisible();
		await expect(loginForm.getByLabel('Remember me')).toBeVisible();
		await expect(loginForm.getByText('Login')).toBeVisible();
	});

	test('has header', async ({ page }) => {
		const header = page.locator('header');

		await expect(header).toBeVisible();
		// await expect(header.getByText('English')).toBeVisible();
		await expect(header.getByLabel('dark scheme')).toBeVisible();
		await expect(header.getByLabel('system scheme')).toBeVisible();
		await expect(header.getByLabel('light scheme')).toBeVisible();

		await expect(header).toHaveScreenshot();
	});

	test('has link to registration page', async ({ page }) => {
		const link = page.getByRole('link');

		await expect(link).toBeVisible();

		await link.click();

		await expect(page).toHaveURL('/registration');
	});

	test('login into account', async ({ page }) => {
		await page.getByLabel('Email').fill('testemail@gmail.com');
		await page.getByLabel('Password').fill('test-password');
		await page.getByLabel('Remember me').check();
		await page.getByRole('button', { name: 'Login' }).click();

		const error = page.getByText('User was not found');

		await expect(error).toBeVisible();
		await expect(error).toHaveCSS('color', 'rgb(211, 47, 47)');
		await expect(page.locator('label', { hasText: 'Email' })).toHaveCSS(
			'color',
			'rgb(211, 47, 47)'
		);
	});

	test('toggle password visibility', async ({ page }) => {
		const password = 'test-password';
		const passwordFiledContainer = page
			.locator('div')
			.filter({ hasText: /^Password$/ });
		const passwordInput = passwordFiledContainer.getByLabel('Password');
		await passwordInput.fill(password);

		expect(await passwordInput.getAttribute('type')).toBe('password');

		await passwordFiledContainer.getByRole('button').click();

		expect(await passwordInput.getAttribute('type')).toBe('text');

		await passwordFiledContainer.getByRole('button').click();

		expect(await passwordInput.getAttribute('type')).toBe('password');
	});
});
