import { expect } from '@playwright/test';
import { Room, User, test } from './fixtures';

test.describe('activities page(online)', () => {
	const iterator = new Array(100).fill(true);

	let user: User;
	let room: Room;

	test.beforeEach(async ({ auth, room: getRoom, activity, page }) => {
		const data = await auth({
			email: 'test@test.com',
		});

		user = data.user;

		room = await getRoom({
			ownerId: user.id,
		});

		await Promise.all(
			iterator.map((_, index) => {
				const moreThanHalf = index >= 50;
				const action = moreThanHalf ? 'update' : 'create';

				return activity({ room, activist: user, action });
			})
		);

		await page.goto(`/rooms/${room.id}/activities`);
	});

	test('has correct view', async ({ page }) => {
		await expect(page).toHaveScreenshot();
	});

	test('has right title', async ({ page }) => {
		await expect(page).toHaveTitle(/Activities/);
	});

	test('has been navigated to first page by default', async ({ page }) => {
		await expect(
			page.getByRole('link', { name: 'page 1', exact: true })
		).toBeVisible();
	});

	test('can navigate to another page', async ({ page }) => {
		const link = page.getByRole('link', { name: 'Go to page 2', exact: true });
		await link.click();

		await expect(page).toHaveURL(/p=2/);
		await expect(
			page.getByRole('link', { name: 'page 2', exact: true })
		).toBeVisible();
	});

	test('can filter activities', async ({ page }) => {
		const filterButton = page.getByRole('button', {
			name: 'Activities filters',
		});
		await filterButton.click();

		const form = page.getByRole('form', {
			name: 'Activities filters',
			exact: true,
		});
		await expect(form).toBeVisible();
		const action = form.getByLabel('Action');
		await action.fill('create');
		await page.getByRole('option').click();
		const apply = form.getByRole('button', { name: 'Apply', exact: true });
		await apply.click();

		await expect(page).toHaveURL(/action=1/);
		await expect(
			page.getByRole('link', { name: 'Go to page 2', exact: true })
		).toBeHidden();
		await expect(page.getByText('updated')).toBeHidden();

		await filterButton.click();
		const sphere = form.getByLabel('Sphere');
		await sphere.fill('tag');
		await page.getByRole('option').click();
		await apply.click();
		370;

		await expect(page).toHaveURL(/action=1&sphere=2/);
		await expect(page.getByRole('list')).toBeHidden();

		await filterButton.click();
		await form.getByRole('button', { name: 'Reset' }).click();

		await expect(
			page.getByRole('link', { name: 'Go to page 2', exact: true })
		).toBeVisible();
		await expect(
			page.getByRole('list').filter({ hasText: 'User' })
		).toBeVisible();
	});

	test('add activities if there has been added new one', async ({
		page,
		activity,
	}) => {
		const data = {
			room,
			activist: user,
			action: 'remove',
			sphere: 'tag',
			createdAt: new Date(),
		};

		const listitem = page.getByRole('listitem').filter({ hasText: 'removed' });

		await expect(listitem).toBeHidden();

		await activity(data);

		await expect(listitem).toBeVisible();
	});
});
