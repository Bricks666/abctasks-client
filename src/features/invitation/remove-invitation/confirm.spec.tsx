import { beforeEach, describe, expect, test } from 'vitest';

import { invitationsModel } from '@/entities/invitations';

import { popupsMap, router } from '@/shared/configs';
import { notificationsModel, popupsModel } from '@/shared/models';

import { ConfirmRemoveInvitation } from './confirm';
import { openConfirm } from './model';

import {
	RenderResult,
	Scope,
	act,
	allSettled,
	defaultInvitation,
	defaultRoom,
	fireEvent,
	fork,
	handlers,
	render,
	server,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/invitation/remove-invitation/confirm', () => {
	const { id, } = defaultInvitation;
	const { id: roomId, } = defaultRoom;
	let scope: Scope;
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<ConfirmRemoveInvitation isOpen />, { scope, router, });
	};
	const findConfirm = () =>
		wrapper.getByRole('dialog', { name: 'actions.remove_invitation.title', });
	const findAgreeButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.remove_invitation.actions.agree',
		});
	const findDisagreeButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.remove_invitation.actions.disagree',
		});

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({
			scope,
			router,
			options: {
				initialEntries: [`/rooms/${roomId}/users`],
			},
		});
		await allSettled(openConfirm, { params: id, scope, });
		await allSettled(invitationsModel.query.start, {
			params: { roomId, },
			scope,
		});
		await allSettled(openConfirm, { params: id, scope, });

		await act(async () => createComponent());
	});

	test('should render dialog with title, text and 2 buttons', () => {
		expect(findConfirm()).toMatchSnapshot();
	});

	test('should remove on user confirmation', async () => {
		const button = findAgreeButton();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(invitationsModel.query.$data)).not.toContainEqual(
				expect.objectContaining({ id, })
			);

			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					color: 'success',
					message: 'actions.remove_invitation.notifications.success',
				})
			);
		});
	});

	test('should show error notification on failed removing', async () => {
		server.use(handlers.invitations.error.remove);

		const button = findAgreeButton();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(invitationsModel.query.$data)).toContainEqual(
				expect.objectContaining({ id, })
			);

			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					color: 'error',
					message: 'actions.remove_invitation.notifications.error',
				})
			);
		});
	});

	test('should just close confirm on rejection', async () => {
		const button = findDisagreeButton();
		fireEvent.click(button);

		expect(scope.getState(popupsModel.$popups)).not.toContain(
			popupsMap.removeInvitation
		);
	});
});
