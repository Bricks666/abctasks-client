import { Page, expect } from '@playwright/test';
import { test } from './fixtures';

const getFormControls = (page: Page) => {
	const email = page.getByLabel('Email');
	const username = page.getByLabel('Username');
	const password = page.getByLabel('Password');
	const rememberMe = page.getByLabel('Remember me');
	const button = page.getByRole('button', { name: 'Login' });

	return {
		email,
		username,
		password,
		rememberMe,
		button,
	};
};

test.describe('login page', () => {
	const email = 'testemail@gmail.com';
	const password = 'password';

	test.beforeEach(async ({ page }) => {
		await page.goto('/login');
	});

	test('has title', async ({ page }) => {
		await expect(page).toHaveTitle('Login');
	});

	test('has correct view', async ({ page }) => {
		await expect(page).toHaveScreenshot();
	});

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

		const controls = getFormControls(page);

		await controls.email.fill(email);
		await controls.password.fill(password);
		await controls.rememberMe.check();
		await controls.button.click();

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

		const controls = getFormControls(page);

		await controls.email.fill(deactivated.email);
		await controls.password.fill(password);
		await controls.rememberMe.check();
		await controls.button.click();

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
			activated: true,
		});

		const controls = getFormControls(page);

		await controls.email.fill(registeredUser.email);
		await controls.password.fill(password);
		await controls.rememberMe.check();
		await controls.button.click();

		await expect(page).toHaveURL('/rooms');
	});
});
