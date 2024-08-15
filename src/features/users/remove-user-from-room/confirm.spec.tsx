import { beforeEach, describe, expect, test } from 'vitest';

import { usersInRoomModel } from '@/entities/users';

import { router } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';

import { ConfirmRemoveUser } from './confirm';
import { openConfirm, popupControls } from './model';

import {
	HttpResponse,
	RenderResult,
	Scope,
	act,
	allSettled,
	fork,
	http,
	render,
	server,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/users/remove-user-from-room/confirm', () => {
	const userId = 1;
	let scope: Scope;
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<ConfirmRemoveUser isOpen />, { scope, router, });
	};

	const findPopup = () =>
		wrapper.getByRole('dialog', {
			name: 'actions.remove_user.title',
		});
	const findAgree = () =>
		wrapper.getByRole('button', {
			name: 'actions.remove_user.actions.agree',
		});
	const findDisagree = () =>
		wrapper.getByRole('button', {
			name: 'actions.remove_user.actions.disagree',
		});

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({
			scope,
			router,
			options: { initialEntries: [`/rooms/1/users`], },
		});

		await allSettled(openConfirm, {
			scope,
			params: userId,
		});

		await allSettled(usersInRoomModel.query.start, {
			scope,
			params: {
				roomId: 1,
			},
		});

		await act(async () => createComponent());
	});

	test('should render popup with text and 2 buttons', () => {
		expect(findPopup()).toMatchSnapshot();
	});

	test('should remove user from room on approve button click', async () => {
		const button = findAgree();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.remove_user.notifications.success',
					color: 'success',
				})
			);
			expect(scope.getState(usersInRoomModel.query.$data)).not.toContainEqual(
				expect.objectContaining({
					id: userId,
				})
			);
		});
	});

	test('should create notification and keep popup opened on server error', async () => {
		server.use(
			http.delete('/api/members/:roomId/remove/:userId', () => {
				return HttpResponse.json(
					{
						message: 'Not Found',
					},
					{ status: 404, statusText: 'Not Found', }
				);
			})
		);

		const button = findAgree();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.remove_user.notifications.error',
					color: 'error',
				})
			);
			expect(scope.getState(usersInRoomModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: userId,
				})
			);
		});
	});

	test('should just close popup on reject button click', async () => {
		const button = findDisagree();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
		});
	});
});
