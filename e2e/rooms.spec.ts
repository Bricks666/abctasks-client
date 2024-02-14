import { faker } from '@faker-js/faker';
import { Locator, Page, expect } from '@playwright/test';

import { expectAlert, getMenuItemByName } from './utils';
import { User, test } from './fixtures';

const getFormControls = (loc: Locator | Page, buttonText: string) => {
	const name = loc.getByLabel('Name');
	const description = loc.getByLabel('Description');
	const button = loc.getByRole('button', { name: buttonText });

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
			hasText: new RegExp(`^${name}`),
		})
		.filter({ hasText: new RegExp(`${description}`) })
		.first();
};

test.describe('rooms page(online)', () => {
	let user: User;

	const name = faker.lorem.words({ min: 1, max: 3 });
	const description = faker.lorem.words({ min: 4, max: 6 });

	test.beforeEach(async ({ page, auth }) => {
		const data = await auth({
			email: faker.internet.email(),
		});

		user = data.user;

		await page.goto('/rooms');
	});

	test('can create room', async ({ page }) => {
		const button = page.getByRole('button', {
			name: 'Open create room form',
		});

		await expect(button).toBeVisible();
		await button.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const form = dialog.getByRole('form', { name: 'Create room' });
		await expect(form).toBeVisible();
		const controls = getFormControls(form, 'Create');

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

		const list = page.getByRole('list');

		await expect(list).toBeVisible();

		const card = getRoomCard(list, created.name, created.description);
		const button = card.getByRole('link', { name: 'Open', exact: true });

		await button.click();

		await expect(page).toHaveURL(/\/rooms\/[\d]+/);
	});

	test('can edit room', async ({ page, room }) => {
		const created = await room({
			ownerId: user.id,
			name,
			description: faker.lorem.words({ min: 4, max: 6 }),
		});

		const list = page.getByRole('list');

		await expect(list).toBeVisible();

		const card = getRoomCard(list, created.name, created.description);
		const button = card.getByRole('button');

		await button.click();
		const editRoom = getMenuItemByName(page, 'Edit room');
		await editRoom.click();
		const form = page.getByRole('form', { name: 'Edit room' });
		await expect(form).toBeVisible();

		const controls = getFormControls(form, 'Save');

		await expect(controls.name).toHaveValue(created.name);
		await expect(controls.description).toHaveValue(created.description);

		const newName = faker.lorem.words({ min: 1, max: 3 });
		await controls.name.fill(newName);
		await controls.button.click();

		await expect(form).toBeHidden();
		/**
		 * @remarks
		 * Need to close menu
		 */
		await expectAlert({
			parent: page,
			message: 'Room was updated successfully',
			type: 'success',
		});
		await expect(getRoomCard(page, newName, created.description)).toBeVisible();
	});

	test('can remove room', async ({ page, room }) => {
		const name = faker.lorem.words({ min: 4, max: 6 });

		const created = await room({
			ownerId: user.id,
			name,
		});

		await page.reload();

		const list = page.getByRole('list');

		await expect(list).toBeVisible({ timeout: 110000 });

		const card = getRoomCard(list, created.name, created.description);
		const menu = card.getByRole('button');

		await menu.click();
		const menuitem = getMenuItemByName(page, 'Remove room');
		await menuitem.click();
		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const cancelButton = dialog.getByRole('button', { name: 'Cancel' });
		await cancelButton.click();
		await expect(dialog).toBeHidden();
		await menu.click();
		await menuitem.click();
		const removeButton = dialog.getByRole('button', { name: 'Remove' });
		await removeButton.click();

		await expect(dialog).toBeHidden();
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
		const name = faker.lorem.words({ min: 4, max: 6 });
		const created = await room({
			ownerId: user.id,
			name,
		});

		await page.reload();

		const card = getRoomCard(page, created.name, created.description);

		await expect(card).toBeVisible({ timeout: 110000 });

		const menu = card.getByRole('button');

		await menu.click();
		const menuitem = getMenuItemByName(page, 'Exit from room');
		await menuitem.click();
		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const cancelButton = dialog.getByRole('button', { name: 'Cancel' });
		await cancelButton.click();
		await expect(dialog).toBeHidden();
		await menu.click();
		await menuitem.click();
		const removeButton = dialog.getByRole('button', { name: 'Exit' });
		await removeButton.click();

		await expect(dialog).toBeHidden();
		await expectAlert({
			parent: page,
			message: 'You exited from room successfully',
			type: 'success',
		});
		await expect(
			getRoomCard(page, created.name, created.description)
		).toBeHidden();
	});
});
