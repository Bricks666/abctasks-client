import { faker } from '@faker-js/faker';
import { Page, expect } from '@playwright/test';
import { test } from './fixtures';

const getFormControls = (page: Page) => {
	const email = page.getByLabel('Email');
	const username = page.getByLabel('Username');
	const password = page.getByLabel('Password', { exact: true });
	const repeatPassword = page.getByLabel('Repeat password');
	const button = page.getByRole('button', { name: 'Registration' });

	return {
		email,
		username,
		password,
		repeatPassword,
		button,
	};
};

test.describe('registration page(online)', () => {
	const email = faker.internet.email();
	const password = faker.internet.password();
	const username = faker.internet.userName();

	test.beforeEach(async ({ page }) => {
		await page.goto('/registration');
	});

	test.afterEach(async ({ context }) => {
		await context.clearCookies();
	});

	test('has title', async ({ page }) => {
		await expect(page).toHaveTitle('Registration');
	});

	test('has correct view', async ({ page }) => {
		await expect(page).toHaveScreenshot();
	});

	test('has error on registered account', async ({ page, user }) => {
		const registered = await user({
			email,
			password,
		});

		const controls = getFormControls(page);
		await controls.email.fill(registered.email);
		await controls.username.fill(registered.username);
		await controls.password.fill(password);
		await controls.repeatPassword.fill(password);
		await controls.button.click();

		const error = page.getByText('User already registered');

		await expect(error).toBeVisible();
		await expect(error).toHaveCSS('color', 'rgb(211, 47, 47)');
		await expect(page.locator('label', { hasText: 'Email' })).toHaveCSS(
			'color',
			'rgb(211, 47, 47)'
		);
		await expect(controls.password).toBeEmpty();
		await expect(controls.repeatPassword).toBeEmpty();
	});

	test('has link into login page', async ({ page }) => {
		const link = page.getByRole('link');

		await expect(link).toBeVisible();

		await link.click();

		await expect(page).toHaveURL('/login');
	});

	test('redirect into thanks page after success registration', async ({
		page,
		removeUser,
	}) => {
		await removeUser({
			email,
		});

		const controls = getFormControls(page);

		await controls.email.fill(email);
		await controls.username.fill(username);
		await controls.password.fill(password);
		await controls.repeatPassword.fill(password);
		await controls.button.click();

		await expect(page).toHaveURL(
			`/registration/thanks?` +
				new URLSearchParams({
					email,
					username,
				})
		);
		await expect(page).toHaveTitle('Thanks for registration');
		await expect(page.getByRole('link')).toBeVisible();
		await page.getByRole('link').click();
		await expect(page).toHaveURL('/login');
	});
});
