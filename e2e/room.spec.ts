import { expectActivityItem } from './utils/expect-activity-item';
import { expectAlert } from './utils/expect-alert';
import { Locator, Page, expect } from '@playwright/test';
import { Room, Tag, User, test } from './fixtures';

test.describe('room page', () => {
	let user: User;
	let room: Room;

	test.beforeEach(async ({ auth, room: getRoom }) => {
		const data = await auth({
			email: 'test@test.com',
		});
		user = data.user;

		room = await getRoom({
			ownerId: user.id,
		});
	});

	test.describe('tasks', () => {
		const data = {
			title: 'Task',
			description: 'It is important task',
		};

		let tags: Tag[];

		const getColumn = (locator: Locator | Page, type: string) => {
			return locator.locator('header').filter({ hasText: type });
		};

		const getFormControls = (locator: Locator | Page) => {
			const title = locator.getByLabel('Title');
			const tags = locator.getByLabel('Tags');
			const status = locator.getByLabel('Status');
			const description = locator.getByLabel('Description');
			const button = locator.getByRole('button', { name: 'Create' });

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

		test.beforeEach(async ({ page, tag }) => {
			tags = await Promise.all([
				tag({
					name: 'Tag 1',
					room,
				}),
				tag({
					name: 'Tag 2',
					room,
				}),
			]);

			await page.goto(`/rooms/${room.id}/tasks`);
		});

		test('has right title', async ({ page }) => {
			await expect(page).toHaveTitle(/Tasks/);
		});

		test('can create task with one tag', async ({ page, removeTask }) => {
			await removeTask({
				title: 'Task',
			});

			const column = getColumn(page, 'Ready');

			const create = column.getByRole('button', {
				name: 'Create task',
				exact: true,
			});

			await create.click();

			await page.waitForURL(/popup=create-task/, { waitUntil: 'commit' });

			const dialog = page.getByRole('dialog');

			await expect(dialog).toBeVisible();

			const form = dialog.locator('form');

			await expect(form).toBeVisible();

			const controls = getFormControls(form);

			await controls.title.fill(data.title);
			await controls.description.fill(data.description);
			await controls.tags.fill(tags[0].name);
			await page.getByRole('option').click();
			await controls.tags.fill(tags[0].name);
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
				tags: tags.map((tag) => tag.name),
			});

			await expect(card).toBeVisible();
		});

		test('can create task with several tags tag', () => {});

		test('can not create task with done status', () => {});

		test('can change task via popup', () => {});

		test('can change task status via dnd', () => {});

		test('can remove task', () => {});

		test('can go to last activities', () => {});
	});
});
