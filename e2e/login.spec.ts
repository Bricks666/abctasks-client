import { expect } from '@playwright/test';
import { test } from './fixtures/testing-api';

const email = 'testemail@gmail.com';
const password = 'password';

test.describe('login page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/login');
	});

	test('has title', async ({ page }) => {
		await expect(page).toHaveTitle('Login');
	});

	test('has correct view', async ({ page }) => {
		await expect(page).toHaveScreenshot();
	});

	/**
	 * @todo move into integration tests
	 */
	// test('has login form', async ({ page }) => {
	// 	const loginForm = page.locator('form');

	// 	await expect(loginForm).toBeVisible();
	// 	await expect(loginForm.getByLabel('Email')).toBeVisible();
	// 	await expect(loginForm.getByLabel('Password')).toBeVisible();
	// 	await expect(loginForm.getByLabel('Remember me')).toBeVisible();
	// 	await expect(loginForm.getByText('Login')).toBeVisible();
	// });

	test('has link to registration page', async ({ page }) => {
		const link = page.getByRole('link');

		await expect(link).toBeVisible();

		await link.click();

		await expect(page).toHaveURL('/registration');
	});

	test('has error on incorrect login into account', async ({
		page,
		removeUser,
	}) => {
		await removeUser({
			email,
		});
		await page.getByLabel('Email').fill(email);
		await page.getByLabel('Password').fill(password);
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

	test('has error on try log in into inactivated account', async ({
		page,
		user,
	}) => {
		const deactivated = await user({
			email,
			password,
			activated: false,
		});
		await page.getByLabel('Email').fill(deactivated.email);
		await page.getByLabel('Password').fill(password);
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

	test('redirect into rooms page after success login', async ({
		page,
		user,
	}) => {
		const registeredUser = await user({
			email,
			password,
		});

		await page.getByLabel('Email').fill(registeredUser.email);
		await page.getByLabel('Password').fill(password);
		await page.getByLabel('Remember me').check();
		await page.getByRole('button', { name: 'Login' }).click();

		await expect(page).toHaveURL('/rooms');
	});

	/**
	 * @todo move into integration tests
	 */
	// test('toggle password visibility', async ({ page }) => {
	// 	const password = password;
	// 	const passwordFiledContainer = page
	// 		.locator('div')
	// 		.filter({ hasText: /^Password$/ });
	// 	const passwordInput = passwordFiledContainer.getByLabel('Password');
	// 	await passwordInput.fill(password);

	// 	expect(await passwordInput.getAttribute('type')).toBe('password');

	// 	await passwordFiledContainer.getByRole('button').click();

	// 	expect(await passwordInput.getAttribute('type')).toBe('text');

	// 	await passwordFiledContainer.getByRole('button').click();

	// 	expect(await passwordInput.getAttribute('type')).toBe('password');
	// });
});
