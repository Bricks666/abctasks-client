import { Page, expect, test } from '@playwright/test';

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

test.describe('registration page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/registration');
	});

	test('has title', async ({ page }) => {
		await expect(page).toHaveTitle('Registration');
	});

	test('has correct view', async ({ page }) => {
		await expect(page).toHaveScreenshot();
	});

	test('has error on registered account', async ({ page }) => {
		const controls = getFormControls(page);
		await controls.email.fill(process.env.REGISTERED_USER_EMAIL!);
		await controls.username.fill('username');
		await controls.password.fill('test-password');
		await controls.repeatPassword.fill('test-password');
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
		browserName,
	}) => {
		const controls = getFormControls(page);

		await controls.email.fill(`test-${browserName}@email.com`);
		await controls.username.fill('username');
		await controls.password.fill('test-password');
		await controls.repeatPassword.fill('test-password');
		await controls.button.click();

		await expect(page).toHaveURL(
			'/registration/thanks?email=test%40email.com&username=username'
		);
		await expect(page).toHaveTitle('Thanks for registration');
		await expect(page.getByRole('link')).toBeVisible();
		await page.getByRole('link').click();

		await expect(page).toHaveURL('/login');
	});
});
