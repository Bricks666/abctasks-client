import {
	RenderResult,
	fireEvent,
	render,
	waitFor
} from '@testing-library/react';
import { Scope, allSettled, fork } from 'effector';
import { Provider } from 'effector-react';
import { HttpResponse, http } from 'msw';
import { beforeEach, describe, expect, test } from 'vitest';

import { invitationsModel } from '@/entities/invitations';

import { popupsMap, routes } from '@/shared/configs';
import { notificationsModel, popupsModel } from '@/shared/models';

import { ConfirmRemoveInvitation } from './confirm';
import { openConfirm } from './model';

import { server } from '~/tests';

describe('features/invitation/remove-invitation/confirm', () => {
	const id = 123;
	const roomId = 44;
	let scope: Scope;
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<ConfirmRemoveInvitation isOpen />
			</Provider>
		);
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
		scope = fork({
			values: [
				[
					invitationsModel.query.$data,
					[
						{
							id,
						}
					]
				],
				[
					routes.room.users.$params,
					{
						id: roomId,
					}
				]
			],
		});

		await allSettled(openConfirm, { params: id, scope, });
	});

	test('should render dialog with title, text and 2 buttons', () => {
		createComponent();

		expect(findConfirm()).toMatchSnapshot();
	});

	test('should remove on user confirmation', async () => {
		createComponent();

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
		server.use(
			http.delete('/api/invitations/invite/:roomId/:id', () => {
				return HttpResponse.json(
					{
						message: 'Not Found',
					},
					{ status: 404, statusText: 'Not Found', }
				);
			})
		);

		createComponent();

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
		createComponent();

		const button = findDisagreeButton();
		fireEvent.click(button);

		expect(scope.getState(popupsModel.$popups)).not.toContain(
			popupsMap.removeInvitation
		);
	});
});
