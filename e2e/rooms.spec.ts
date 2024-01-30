import { Locator, Page, expect } from '@playwright/test';

import { expectAlert, getMenuItemByName } from './utils';
import { User, test } from './fixtures/testing-api';

const getFormControls = (loc: Locator | Page) => {
	const name = loc.getByLabel('Name');
	const description = loc.getByLabel('Description');
	const button = loc.getByRole('link', { name: 'Open' });

	return {
		name,
		description,
		button,
	};
};

const getRoomCard = (
	loc: Locator | Page,
	name: string,
	description: string
) => {
	return loc
		.getByRole('listitem')
		.filter({
			hasText: new RegExp(`^${name}Description: ${description}`),
		})
		.first();
};

test.describe('rooms page', () => {
	let user: User;

	const name = 'test room name';
	const description = 'test room description';

	test.beforeEach(async ({ page, auth }) => {
		const data = await auth({
			email: 'test@test.com',
		});

		user = data.user;

		await page.goto('/rooms');
	});

	test('can create room', async ({ page, removeRoom }) => {
		await removeRoom({
			ownerId: user.id,
			name,
			description,
		});

		const button = page.getByRole('button', {
			name: 'Open create room form',
		});

		await expect(button).toBeVisible();

		await button.click();

		const form = page.locator('form');
		await expect(form).toBeVisible();

		const controls = getFormControls(form);

		await expect(controls.name).toHaveValue('');
		await expect(controls.description).toHaveValue('');

		await controls.name.fill(name);
		await controls.description.fill(description);
		await controls.button.click();

		await expect(form).toBeHidden();

		await expectAlert({
			parent: page,
			message: 'Room was created successfully',
			type: 'success',
		});

		await expect(getRoomCard(page, name, description)).toBeVisible();
	});

	test('can open room page', async ({ page, room }) => {
		const created = await room({
			name,
			description,
			ownerId: user.id,
		});

		const card = getRoomCard(page, created.name, created.description);

		const button = card.getByRole('link', { name: 'Open', exact: true });

		await button.click();

		await expect(page).toHaveURL(/\/rooms\/[\d]+/);
	});

	test('can edit room', async ({ page, room }) => {
		const created = await room({
			ownerId: user.id,
			name,
		});

		const card = getRoomCard(page, created.name, created.description);

		const button = card.getByRole('button');

		await button.click();

		const editRoom = getMenuItemByName(page, 'Edit room');

		await editRoom.click();

		const form = page.locator('form');

		await expect(form).toBeVisible();

		const controls = getFormControls(form);

		await expect(controls.name).toHaveValue(created.name);
		await expect(controls.description).toHaveValue(created.description);

		const newName = `new ${created.name}`;

		await controls.name.fill(newName);

		await controls.button.click();

		await expect(form).toBeHidden();

		/**
		 * @remarks
		 * Need to close menu
		 */
		await page.locator('body').click();

		await expectAlert({
			parent: page,
			message: 'Room was updated successfully',
			type: 'success',
		});

		await expect(getRoomCard(page, newName, created.description)).toBeVisible();
	});

	test('can remove room', async ({ page, room }) => {
		const name = 'room-for-removing';

		const created = await room({
			ownerId: user.id,
			name,
		});

		const card = getRoomCard(page, created.name, created.description);

		const button = card.getByRole('button');

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

		await expect(
			getRoomCard(page, created.name, created.description)
		).toBeHidden();
	});

	test('can exit room', async ({ page, room }) => {
		const name = 'room-for-exit';

		const created = await room({
			ownerId: user.id,
			name,
		});

		const card = getRoomCard(page, created.name, created.description);

		const button = card.getByRole('button');

		await button.click();

		const exitRoom = getMenuItemByName(page, 'Exit from room');

		await exitRoom.click();

		const dialog = page.getByRole('dialog');

		await expect(dialog).toBeVisible();

		const cancelButton = dialog.getByRole('button', { name: 'Cancel' });

		await cancelButton.click();

		await expect(dialog).toBeHidden();

		await exitRoom.click();

		const removeButton = dialog.getByRole('button', { name: 'Exit' });

		await removeButton.click();

		await expect(dialog).toBeHidden();

		await page.locator('body').click();

		await expectAlert({
			parent: page,
			message: 'You exited from user successfully',
			type: 'success',
		});

		await expect(
			getRoomCard(page, created.name, created.description)
		).toBeHidden();
	});
});
