import { Locator, Page, expect } from '@playwright/test';

import { expectAlert, getMenuItemByName } from './utils';
import { Invitation, Room, User, test } from './fixtures';

const getInvitationCard = (parent: Page | Locator): Locator => {
	/**
	 * @todo
	 * Add more safe selector
	 */
	return parent.locator('main > div > div');
};

test.describe('invitation page(online)', () => {
	let owner: User;
	let user: User;
	let room: Room;
	let invitation: Invitation;
	let invitationLink: string;

	test.beforeEach(
		async ({
			page,
			auth,
			user: getUser,
			room: getRoom,
			invitationLink: getInvitationLink,
			invitation: getInvitation,
		}) => {
			owner = await getUser({
				email: 'test@test.com',
			});
			room = await getRoom({
				ownerId: owner.id,
			});
			user = await auth({
				email: 'requested-user@example.com',
			}).then((data) => data.user);
			invitation = await getInvitation({
				room,
				user,
				inviter: owner,
			});
			invitationLink = await getInvitationLink(invitation);

			await page.goto(invitationLink);
		}
	);

	test('has correct view', async ({ page }) => {
		await expect(page).toHaveScreenshot();
	});

	test('has right title', async ({ page }) => {
		await expect(page).toHaveTitle(/Invitation answer/);
	});

	test('can approve invitation', async ({ page }) => {
		const card = getInvitationCard(page);

		await expect(card).toBeVisible();

		const approve = card.getByRole('button', { name: 'approve' });

		await approve.click();

		await expect(page).toHaveURL(`/rooms/${room.id}/tasks`);

		await expectAlert({
			parent: page,
			type: 'success',
			message: 'Invitation was successfully approved',
		});
	});

	test('can reject invitation', async ({ page }) => {
		const card = getInvitationCard(page);

		await expect(card).toBeVisible();

		const reject = card.getByRole('button', { name: 'reject' });

		await reject.click();

		await expect(page).toHaveURL('/rooms');

		await expectAlert({
			parent: page,
			type: 'success',
			message: 'Invitation was successfully rejected',
		});
	});

	test('cannot open invitation of another user', async ({ page, auth }) => {
		await auth({
			email: 'another-user@member.com',
		});

		await page.reload();

		const card = getInvitationCard(page);

		await expect(card).toBeVisible();

		await expect(page).toHaveURL('/rooms');

		await expectAlert({
			parent: page,
			type: 'error',
			message: "Invitation was not loaded. It's not available for you",
		});
	});

	test('cannot open finished invitation', async ({
		page,
		removeInvitation,
		invitationLink: getInvitationLink,
	}) => {
		await removeInvitation(invitation);
		const link = await getInvitationLink({
			room,
			inviter: owner,
			user,
			status: 'approved',
		});
		await page.waitForLoadState();
		await page.goto(link);

		const card = getInvitationCard(page);

		await expect(card).toBeVisible();

		await expect(page).toHaveURL('/rooms');

		await expectAlert({
			parent: page,
			type: 'error',
			message: "Invitation was not loaded. It's not available for you",
		});
	});
});
