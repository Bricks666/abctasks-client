import { Locator, Page, expect } from '@playwright/test';
import { expectAlert } from './utils';
import { Room, User, test } from './fixtures';
import { faker } from '@faker-js/faker';

interface GetUserItemParams {
	readonly parent: Locator | Page;
	readonly username: string;
}

const getUserItem = (params: GetUserItemParams) => {
	const { parent, username } = params;

	return parent.getByRole('listitem').filter({ hasText: username });
};

interface GetInvitationParams {
	readonly parent: Locator | Page;
	readonly username: string;
}

const getInvitationItem = (params: GetInvitationParams) => {
	const { parent, username } = params;

	return parent.getByRole('listitem').filter({ hasText: new RegExp(username) });
};

test.describe('users page(online)', () => {
	let owner: User;
	let room: Room;

	test.beforeEach(async ({ auth, room: getRoom, page }) => {
		const data = await auth({
			email: faker.internet.email(),
		});

		owner = data.user;

		room = await getRoom({
			ownerId: owner.id,
		});

		await page.goto(`/rooms/${room.id}/users`);
	});

	test('has correct view', async ({ page }) => {
		await expect(page).toHaveScreenshot();
	});

	test('has right title', async ({ page }) => {
		await expect(page).toHaveTitle(/Users/);
	});

	test('can invite user', async ({ page, user: getUser }) => {
		const user = await getUser({
			email: faker.internet.email(),
			username: faker.internet.userName(),
		});

		const addUser = page.getByRole('button', { name: 'invite user' });
		await addUser.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const form = dialog.locator('form');
		await expect(form).toBeVisible();

		const selectButton = form.getByRole('button', {
			name: 'select user above',
		});
		await expect(selectButton).toBeVisible();

		const input = form.getByLabel('username');
		await input.fill(user.username.slice(0, 4));
		const option = page.getByRole('option');
		await option.click();

		const selectedUser = getUserItem({ parent: form, username: user.username });
		await expect(selectedUser).toBeVisible();
		await expect(input).toBeHidden();

		const removeSelection = form.getByRole('button', {
			name: `Unselect ${user.username}`,
		});
		await removeSelection.click();
		await expect(selectedUser).toBeHidden();
		await expect(input).toBeVisible();

		await input.fill(user.username.slice(0, 4));
		await option.click();

		const inviteUser = form.getByRole('button', {
			name: `invite ${user.username} to the room`,
		});
		await inviteUser.click();

		await expect(dialog).toBeHidden();
		await expectAlert({
			type: 'success',
			parent: page,
			message: 'Invitation was sent successfully',
		});

		const invitation = getInvitationItem({
			parent: page,
			username: user.username,
		});

		await expect(invitation).toBeVisible();
		await expect(invitation).toHaveText(
			new RegExp(`Invited by ${owner.username}`)
		);
	});

	test('can copy link for group invitation', async ({
		page,
		context,
		browserName,
	}) => {
		test.skip(browserName === 'firefox', 'Skip clipboard test in firefox');

		const link = new RegExp(
			`${process.env.BASE_CLIENT_URL}/rooms/invite\\?token=[a-z0-9-]+\.[a-z0-9-]+\.[a-z0-9-]+`
		);

		await context.grantPermissions(['clipboard-read', 'clipboard-write']);

		const addUser = page.getByRole('button', { name: 'invite user' });
		await addUser.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();

		const tab = dialog.getByRole('tab', { name: 'Via link' });
		await tab.click();

		const form = dialog.locator('form');
		await expect(form).toBeVisible();

		const input = form.getByLabel('Link', { exact: true });
		await expect(input).toBeVisible();
		await expect(input).toHaveValue(link);

		const copy = form.getByRole('button', { name: 'copy link' });
		await copy.click();

		await expect(dialog).toBeHidden();

		await expectAlert({
			type: 'info',
			parent: page,
			message: 'Link was copied',
		});

		const clipboard = await page.evaluate(() => navigator.clipboard.readText());

		expect(clipboard).toMatch(link);
	});

	test('existing member cannot be invited', async ({
		page,
		user: getUser,
		member: getMember,
	}) => {
		const user = await getUser({
			email: faker.internet.email(),
			username: faker.internet.userName(),
		});
		const member = await getMember({
			room,
			user,
			status: 'activated',
		});

		const addUser = page.getByRole('button', { name: 'invite user' });
		await addUser.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const form = dialog.locator('form');
		await expect(form).toBeVisible();

		const selectButton = form.getByRole('button', {
			name: 'select user above',
		});
		await expect(selectButton).toBeVisible();

		const input = form.getByLabel('username');
		await input.fill(user.username.slice(0, 4));
		const option = page.getByRole('option');
		await option.click();
		const inviteUser = form.getByRole('button', {
			name: `invite ${user.username} to the room`,
		});
		await inviteUser.click();

		await expect(dialog).toBeVisible();
		await expectAlert({
			type: 'error',
			parent: page,
			message: 'Invitation was not sent',
		});
	});

	test('common member cannot invite user', async ({
		page,
		user: getUser,
		member: getMember,
		logout,
		auth,
	}) => {
		test.skip(true, 'Need fix on test side');

		const user = await getUser({
			email: faker.internet.email(),
			username: faker.internet.userName(),
		});
		const member = await getMember({
			room,
			user,
			status: 'activated',
		});
		await logout({});
		await auth(user);

		await page.reload();
		await page.waitForSelector('li');

		const addUser = page.getByRole('button', { name: 'invite user' });
		await expect(addUser).toBeHidden();
	});

	test('can remove invitation', async ({
		page,
		invitation: getInvitation,
		user: getUser,
	}) => {
		const user = await getUser({
			email: faker.internet.email(),
			username: faker.internet.userName(),
		});
		const invitation = await getInvitation({
			room,
			user,
			inviter: owner,
		});

		const listitem = getInvitationItem({
			parent: page,
			username: user.username,
		});

		await expect(listitem).toBeVisible();
		const remove = listitem.getByRole('button', { name: 'Remove invitation' });
		await remove.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const accept = dialog.getByRole('button', { name: 'remove' });
		const cancel = dialog.getByRole('button', { name: 'cancel' });

		await cancel.click();
		await expect(dialog).toBeHidden();
		await expect(listitem).toBeVisible();

		await remove.click();
		await accept.click();
		await expect(dialog).toBeHidden();
		await expect(listitem).toBeHidden();

		await expectAlert({
			type: 'success',
			parent: page,
			message: 'Invitation was removed from the room successfully',
		});
	});

	test('room owner can remove user', async ({
		page,
		user: getUser,
		member: getMember,
	}) => {
		const user = await getUser({
			email: faker.internet.email(),
			username: faker.internet.userName(),
		});
		const member = await getMember({
			room,
			user,
			status: 'activated',
		});

		const listitem = getUserItem({
			parent: page,
			username: user.username,
		});

		await expect(listitem).toBeVisible();

		const remove = listitem.getByRole('button', { name: 'Remove user' });
		await remove.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const accept = dialog.getByRole('button', { name: 'remove' });
		const cancel = dialog.getByRole('button', { name: 'cancel' });

		await cancel.click();
		await expect(dialog).toBeHidden();
		await expect(listitem).toBeVisible();

		await remove.click();
		await accept.click();
		await expect(dialog).toBeHidden();
		await expect(listitem).toBeHidden();

		await expectAlert({
			type: 'success',
			parent: page,
			message: 'User was removed from the room successfully',
		});
	});

	test('common member can exit from room', async ({
		page,
		user: getUser,
		member: getMember,
		logout,
		auth,
	}) => {
		const user = await getUser({
			email: faker.internet.email(),
			username: faker.internet.userName(),
		});
		const member = await getMember({
			room,
			user,
			status: 'activated',
		});
		await logout({});
		await auth(user);

		await page.goto(`/rooms/${room.id}/users`);
		await page.waitForSelector('li');

		const listitem = getUserItem({
			parent: page,
			username: user.username,
		});
		await expect(listitem).toBeVisible();

		const exit = listitem.getByRole('button', { name: 'Exit from room' });
		await exit.click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		const accept = dialog.getByRole('button', { name: 'exit' });
		const cancel = dialog.getByRole('button', { name: 'cancel' });

		await cancel.click();
		await expect(dialog).toBeHidden();
		await expect(listitem).toBeVisible();

		await exit.click();
		await accept.click();
		await expect(dialog).toBeHidden();
		await expect(listitem).toBeHidden();

		await expectAlert({
			type: 'success',
			parent: page,
			message: 'You exited from room successfully',
		});
	});

	test('owner cannot exit from room', async ({ page }) => {
		const listitem = getUserItem({
			parent: page,
			username: owner.username,
		});

		await expect(listitem).toBeVisible();

		const exit = listitem.getByRole('button', { name: 'Exit from room' });
		await expect(exit).toBeHidden();
	});
});
