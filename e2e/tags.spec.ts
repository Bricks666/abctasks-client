import { faker } from '@faker-js/faker';
import { Locator, Page, expect } from '@playwright/test';
import { expectAlert } from './utils';
import { Room, User, test } from './fixtures';

const getFormControls = (locator: Locator | Page, buttonText: string) => {
	const name = locator.getByLabel('Name');
	const primaryColor = locator.getByLabel('Primary color');
	const secondaryColor = locator.getByLabel('Secondary color');
	const button = locator.getByRole('button', { name: buttonText });

	return {
		name,
		primaryColor,
		secondaryColor,
		button,
	};
};

interface GetListItemParams {
	readonly parent: Locator | Page;
	readonly name: string;
}

const getListItem = (params: GetListItemParams) => {
	const { parent, name } = params;

	return parent.getByRole('listitem').filter({ hasText: name });
};

interface ExpectListItemParams extends GetListItemParams {
	readonly primaryColor: string;
	readonly secondaryColor: string;
}

const expectListItem = async (params: ExpectListItemParams) => {
	const { name, secondaryColor, primaryColor } = params;

	const tag = getListItem(params);

	await expect(tag).toBeVisible();
	await expect(tag).toHaveText(name);
	await expect(tag.getByText(name)).toHaveCSS('color', primaryColor);
	await expect(tag.getByText(name)).toHaveCSS(
		'background-color',
		secondaryColor
	);
};

const data = {
	name: faker.lorem.words({ min: 1, max: 3 }),
	primaryColor: '#000000',
	secondaryColor: '#ffffff',
};

test.describe('tags page(online)', () => {
	let user: User;
	let room: Room;

	test.beforeEach(async ({ auth, room: getRoom, page }) => {
		const data = await auth({
			email: faker.internet.email(),
		});

		user = data.user;

		room = await getRoom({
			ownerId: user.id,
		});

		await page.goto(`/rooms/${room.id}/tags`);
	});

	test('has correct view', async ({ page }) => {
		await expect(page).toHaveScreenshot();
	});

	test('has right title', async ({ page }) => {
		await expect(page).toHaveTitle(/Tags/);
	});

	test('can create tag', async ({ page, removeTag }) => {
		await removeTag({
			name: data.name,
		});

		const create = page.getByRole('button', {
			name: 'Create tag',
			exact: true,
		});

		await create.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const heading = dialog.getByRole('heading', { name: 'Create tag' });
		await expect(heading).toBeVisible();
		const form = dialog.locator('form');
		await expect(form).toBeVisible();
		const controls = getFormControls(form, 'Create');

		await controls.name.fill(data.name);
		await controls.primaryColor.fill(data.primaryColor);
		await controls.secondaryColor.fill(data.secondaryColor);
		await controls.button.click();

		await expect(dialog).toBeHidden();
		await expectAlert({
			type: 'success',
			parent: page,
			message: 'Tag was created successfully',
		});
		await expectListItem({
			parent: page,
			name: data.name,
			primaryColor: 'rgb(0, 0, 0)',
			secondaryColor: 'rgb(255, 255, 255)',
		});
	});

	test('can change tag', async ({ page, tag }) => {
		const created = await tag({
			room,
			mainColor: data.primaryColor,
			secondColor: data.secondaryColor,
		});

		const listItem = getListItem({
			parent: page,
			name: created.name,
		});
		await expect(listItem).toBeVisible();

		const open = listItem.getByRole('button', { name: 'Update tag' });
		await expect(open).toBeVisible();
		await open.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const form = dialog.locator('form');
		await expect(form).toBeVisible();
		const controls = getFormControls(form, 'Save');
		await expect(controls.name).toHaveValue(created.name);
		await expect(controls.primaryColor).toHaveValue(created.mainColor);
		await expect(controls.secondaryColor).toHaveValue(created.secondColor);
		await controls.name.fill('Some another name');
		await controls.button.click();

		await expectAlert({
			type: 'success',
			parent: page,
			message: 'Tag was updated successfully',
		});
		await expectListItem({
			parent: page,
			name: 'Some another name',
			primaryColor: 'rgb(0, 0, 0)',
			secondaryColor: 'rgb(255, 255, 255)',
		});
	});

	test('can remove tag', async ({ page, tag }) => {
		const created = await tag({
			room,
			mainColor: data.primaryColor,
			secondColor: data.secondaryColor,
		});

		const listItem = getListItem({
			parent: page,
			name: created.name,
		});
		await expect(listItem).toBeVisible();

		const open = listItem.getByRole('button', { name: 'Remove tag' });
		await expect(open).toBeVisible();
		await open.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();

		const cancel = dialog.getByRole('button', { name: 'Cancel' });
		await cancel.click();
		await expect(dialog).toBeHidden();
		await expect(listItem).toBeVisible();

		await open.click();

		const remove = dialog.getByRole('button', { name: 'Remove' });
		await remove.click();
		await expect(dialog).toBeHidden();
		await expect(listItem).toBeHidden();
		await expectAlert({
			type: 'success',
			parent: page,
			message: 'Tag was removed successfully',
		});
	});
});
