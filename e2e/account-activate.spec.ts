import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { User, test } from './fixtures';
import { expectAlert } from './utils';

test.describe('account activate page(online)', () => {
	let user: User;
	let activateLink: string;

	test.beforeEach(
		async ({
			page,
			user: getUser,
			activateAccountLink: getActivateAccountLink,
		}) => {
			user = await getUser({
				email: faker.internet.email(),
				activated: false,
			});

			activateLink = await getActivateAccountLink(user);

			await page.goto(activateLink);
		}
	);

	test('has correct view', async ({ page }) => {
		await expect(page).toHaveScreenshot();
	});

	test('has right title', async ({ page }) => {
		await expect(page).toHaveTitle(/Account activation/);
	});

	test('can navigate to login page', async ({ page }) => {
		const link = page.getByRole('link', { name: 'go to login page' });

		await link.click();

		await expect(page).toHaveURL('/login');
	});

	test('cannot open if authorized', async ({ page, auth }) => {
		const u = await auth({
			email: faker.internet.email(),
		});

		await page.reload();

		await expect(page).toHaveURL('/rooms');
	});

	test('show error if account has been already activated', async ({
		page,
		user: getUser,
		activateAccountLink: getActivateAccountLink,
	}) => {
		user = await getUser({
			email: faker.internet.email(),
			activated: true,
		});

		activateLink = await getActivateAccountLink(user);

		await page.goto(activateLink);

		await expectAlert({
			type: 'error',
			parent: page,
			message: 'The account has already been activated',
		});
	});
});
