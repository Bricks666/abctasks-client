import { faker } from '@faker-js/faker';
import { Locator, Page, expect } from '@playwright/test';
import {
	getTagsLabels,
	expectActivityItem,
	expectAlert,
	getMenuItemByName,
} from './utils';
import { Room, Tag, User, test } from './fixtures';

const getColumn = (locator: Locator | Page, type: string) => {
	return locator.getByRole('region').filter({ hasText: type });
};

const getFormControls = (locator: Locator | Page, buttonText: string) => {
	const title = locator.getByLabel('Title');
	const tags = locator.getByLabel('Tags');
	const status = locator.getByLabel('Status');
	const description = locator.getByLabel('Description');
	const button = locator.getByRole('button', { name: buttonText });

	return {
		title,
		tags,
		status,
		description,
		button,
	};
};

interface GetCardParams {
	readonly parent: Locator | Page;
	readonly title: string;
	readonly description: string;
	readonly tags: string[];
}

const getCard = (params: GetCardParams) => {
	const { description, parent, tags, title } = params;

	return parent
		.getByRole('article')
		.filter({ hasText: title })
		.filter({ hasText: description })
		.filter({ hasText: new RegExp(tags.join('|')) });
};

const data = {
	title: faker.lorem.words({ min: 1, max: 3 }),
	description: faker.lorem.words({ min: 4, max: 6 }),
};

test.describe('tasks page(online)', () => {
	let user: User;
	let room: Room;
	let tags: Tag[];

	test.beforeEach(async ({ auth, room: getRoom, tag, page }) => {
		const data = await auth({
			email: faker.internet.email(),
		});

		user = data.user;

		room = await getRoom({
			ownerId: user.id,
		});

		tags = await Promise.all([
			tag({
				name: faker.lorem.words({ min: 1, max: 3 }),
				room,
			}),
			tag({
				name: faker.lorem.words({ min: 1, max: 3 }),
				room,
			}),
		]);

		await page.goto(`/rooms/${room.id}/tasks`);
	});

	test('has correct view', async ({ page }) => {
		await expect(page).toHaveScreenshot();
	});

	test('has right title', async ({ page }) => {
		await expect(page).toHaveTitle(/Tasks/);
	});

	test('can create task with one tag', async ({ page }) => {
		const column = getColumn(page, 'Ready');

		const create = column.getByRole('button', {
			name: 'Create task',
			exact: true,
		});

		await create.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const form = dialog.locator('form');
		await expect(form).toBeVisible();
		const controls = getFormControls(form, 'Create');

		await controls.title.fill(data.title);
		await controls.description.fill(data.description);
		await controls.tags.fill(getTagsLabels(tags)[0]);
		await page.getByRole('option').click();
		await controls.button.click();

		await expect(dialog).toBeHidden();
		await expectAlert({
			type: 'success',
			parent: page,
			message: 'Task was created successfully',
		});
		await expectActivityItem({
			content: `User ${user.username} has created the task`,
			parent: page,
			type: 'success',
		});
		const card = getCard({
			parent: page,
			description: data.description,
			title: data.title,
			tags: [getTagsLabels(tags)[0]],
		});
		await expect(card).toBeVisible();
	});

	test('can create task with several tags tag', async ({ page }) => {
		const column = getColumn(page, 'Ready');

		const create = column.getByRole('button', {
			name: 'Create task',
			exact: true,
		});
		await create.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const form = dialog.locator('form');
		await expect(form).toBeVisible();
		const controls = getFormControls(form, 'Create');

		await controls.title.fill(data.title);
		await controls.description.fill(data.description);
		await controls.tags.fill(getTagsLabels(tags)[0]);
		await page.getByRole('option').click();
		await controls.tags.fill(getTagsLabels(tags)[1]);
		await page.getByRole('option').click();
		await controls.button.click();

		await expect(dialog).toBeHidden();
		await expectAlert({
			type: 'success',
			parent: page,
			message: 'Task was created successfully',
		});
		await expectActivityItem({
			content: `User ${user.username} has created the task`,
			parent: page,
			type: 'success',
		});
		const card = getCard({
			parent: page,
			description: data.description,
			title: data.title,
			tags: getTagsLabels(tags),
		});
		await expect(card).toBeVisible();
	});

	test('can not create task with done status', async ({ page }) => {
		const column = getColumn(page, 'Done');

		await expect(column).toBeVisible();

		const create = column.getByRole('button', {
			name: 'Create task',
			exact: true,
		});

		await expect(create).toBeHidden();
	});

	test('can change task via popup', async ({ page, task }) => {
		const created = await task({
			tags,
			room,
			author: user,
		});

		const newTitle = faker.lorem.words({ min: 1, max: 3 });

		const card = getCard({
			parent: page,
			description: created.description,
			tags: getTagsLabels(created.tags),
			title: created.title,
		});
		await expect(card).toBeVisible();

		const openMenu = card.getByRole('button');
		await expect(openMenu).toBeVisible();
		await openMenu.click();
		const menu = page.getByRole('menu');
		await expect(menu).toBeVisible();
		const menuItem = getMenuItemByName(menu, 'Update task');
		await menuItem.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const form = dialog.locator('form');
		await expect(form).toBeVisible();
		const controls = getFormControls(form, 'Save');
		// const tagName = getTagsLabels(tags).join('|') + '\\+1';
		await expect(controls.title).toHaveValue(created.title);
		await expect(controls.description).toHaveValue(created.description);
		await expect(controls.status).toContainText(created.status, {
			ignoreCase: true,
		});
		/**
		 * @todo
		 */
		// await expect(controls.tags).toContainText(new RegExp(tagName));
		await controls.title.fill(newTitle);
		await controls.button.click();

		await expectAlert({
			type: 'success',
			parent: page,
			message: 'Task was updated successfully',
		});
		await expectActivityItem({
			content: `User ${user.username} has updated the task`,
			parent: page,
			type: 'warning',
		});
		const updatedCard = getCard({
			parent: page,
			description: created.description,
			tags: getTagsLabels(created.tags),
			title: newTitle,
		});
		await expect(updatedCard).toBeVisible();
	});

	test('can change task status via dnd', async ({ page, task }) => {
		const created = await task({
			tags,
			room,
			author: user,
		});

		const card = getCard({
			parent: page,
			description: created.description,
			tags: getTagsLabels(created.tags),
			title: created.title,
		});
		await expect(card).toBeVisible();
		const targetColumn = getColumn(page, 'In progress');
		await card.dragTo(targetColumn);

		await expect(
			getCard({
				parent: targetColumn,
				description: created.description,
				tags: getTagsLabels(created.tags),
				title: created.title,
			})
		).toBeVisible();
		await expect(
			getCard({
				parent: getColumn(page, 'Ready'),
				description: created.description,
				tags: getTagsLabels(created.tags),
				title: created.title,
			})
		).toBeHidden();
		await expectAlert({
			type: 'success',
			parent: page,
			message: 'Task was updated successfully',
		});
		await expectActivityItem({
			content: `User ${user.username} has updated the task`,
			parent: page,
			type: 'warning',
		});
	});

	test('can remove task', async ({ page, task }) => {
		const created = await task({
			tags,
			room,
			author: user,
		});

		const card = getCard({
			parent: page,
			description: created.description,
			tags: getTagsLabels(created.tags),
			title: created.title,
		});
		await expect(card).toBeVisible();

		const openMenu = card.getByRole('button');
		await expect(openMenu).toBeVisible();
		await openMenu.click();
		const menu = page.getByRole('menu');
		await expect(menu).toBeVisible();
		const menuItem = getMenuItemByName(menu, 'Remove task');
		await menuItem.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const cancelButton = dialog.getByRole('button', { name: 'Cancel' });
		await cancelButton.click();
		await expect(dialog).toBeHidden();

		await openMenu.click();
		await menuItem.click();
		const removeButton = dialog.getByRole('button', { name: 'Remove' });
		await removeButton.click();

		await expect(dialog).toBeHidden();
		await expectAlert({
			parent: page,
			message: 'Task was removed successfully',
			type: 'success',
		});
		await expectActivityItem({
			content: `User ${user.username} has removed the task`,
			parent: page,
			type: 'error',
		});
		await expect(card).toBeHidden();
	});

	test('can go to last activities', async ({ page }) => {
		const lastActivities = page.getByRole('region', {
			name: 'Last activities',
		});
		const link = lastActivities.getByRole('link', {
			name: 'open all activities',
		});

		await link.click();

		await expect(page).toHaveURL(new RegExp(`/${room.id}/activities`));
	});

	test.describe('tasks filtering', () => {});
});
