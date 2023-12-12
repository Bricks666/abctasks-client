import { expectAlert, expectRoomCard, getMenuItemByName } from './utils';
import { test, expect, Page } from '@playwright/test';

test.describe('rooms page', () => {
	const name = 'test room name';
	const description = 'test room description';

	test.beforeEach(async ({ page }) => {
		await page.request.post('/api/auth/login', {
			data: {
				password: process.env.REGISTERED_USER_PASSWORD!,
				email: process.env.REGISTERED_USER_EMAIL!,
				rememberMe: true,
			},
		});

		await page.goto('/rooms');
	});

	test('has message that there are no rooms', async ({ page }) => {
		await expect(page.getByText(/There are no room yet/)).toBeVisible();
	});

	test('can create room', async ({ page }) => {
		const button = page.getByRole('link');

		await expect(button).toBeVisible();

		await button.click();

		const form = page.locator('form');

		await expect(form).toBeVisible();

		await form.getByLabel('Name').fill(name);
		await form.getByLabel('Description').fill(description);
		await form.getByRole('button', { name: 'Create' }).click();

		await expect(form).toBeHidden();

		await expectAlert({
			parent: page,
			message: 'Room was created successfully',
			type: 'success',
		});

		await expectRoomCard({
			parent: page,
			name,
			description,
		});
	});

	test('open room page', async ({ page }) => {
		const button = page.getByRole('link', { name: 'Open' });

		await button.click();

		await expect(page).toHaveURL(/\/rooms\/[\d]+/);
	});

	test('edit room', async ({ page }) => {
		const button = page.getByRole('list').getByRole('button');

		await button.click();

		const editRoom = getMenuItemByName(page, 'Edit room');

		await editRoom.click();

		const form = page.locator('form');

		await expect(form).toBeVisible();

		const newName = 'new test room name';

		await form.getByLabel('Name').fill(newName);

		await form.getByRole('button').click();

		await expect(form).toBeHidden();

		await page.locator('body').click();

		await expectAlert({
			parent: page,
			message: 'Room was updated successfully',
			type: 'success',
		});

		await expectRoomCard({
			parent: page,
			name: newName,
			description,
		});
	});

	test('remove room', async ({ page }) => {
		const button = page.getByRole('list').getByRole('button');

		await button.click();

		const removeRoom = getMenuItemByName(page, 'Remove room');

		await removeRoom.click();

		const dialog = page.getByRole('dialog');

		await expect(dialog).toBeVisible();

		const cancelButton = dialog.getByRole('button', { name: 'Cancel' });

		await cancelButton.click();

		await expect(dialog).toBeHidden();

		await removeRoom.click();

		const removeButton = dialog.getByRole('button', { name: 'Remove' });

		await removeButton.click();

		await expect(dialog).toBeHidden();

		await page.locator('body').click();

		await expectAlert({
			parent: page,
			message: 'Room was removed successfully',
			type: 'success',
		});

		await expect(page.getByText(/There are no room yet/)).toBeVisible();
	});
});
