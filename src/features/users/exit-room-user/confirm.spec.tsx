import { beforeEach, describe, expect, test } from 'vitest';

import { roomsModel } from '@/entities/rooms';
import { usersInRoomModel } from '@/entities/users';

import { router, routes } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';

import { ConfirmUserExit } from './confirm';
import { openConfirm, popupControls } from './model';

import {
	RenderResult,
	Scope,
	act,
	allSettled,
	fork,
	handlers,
	render,
	server,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/users/remove-user-from-room/confirm.tsx', () => {
	const roomId = 1;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<ConfirmUserExit isOpen />, { scope, router, });
	};

	const findPopup = () =>
		wrapper.getByRole('dialog', {
			name: 'actions.exit_room.title',
		});
	const findAgree = () =>
		wrapper.getByRole('button', {
			name: 'actions.exit_room.actions.agree',
		});
	const findDisagree = () =>
		wrapper.getByRole('button', {
			name: 'actions.exit_room.actions.disagree',
		});

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({
			scope,
			router,
			options: { initialEntries: ['/rooms/1/users'], },
		});
		await allSettled(openConfirm, {
			scope,
			params: roomId,
		});
		await allSettled(roomsModel.query.start, {
			scope,
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
					message: 'actions.exit_room.notifications.success',
					color: 'success',
				})
			);
			expect(scope.getState(usersInRoomModel.query.$data)).not.toContainEqual(
				expect.objectContaining({
					id: roomId,
				})
			);
			expect(scope.getState(routes.rooms.base.$isOpened)).toBeTruthy();
		});
	});

	test('should create notification and keep popup opened on server error', async () => {
		server.use(handlers.members.error.exit);

		const button = findAgree();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.exit_room.notifications.error',
					color: 'error',
				})
			);
			expect(scope.getState(roomsModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: roomId,
				})
			);
		});
	});

	test('should just close popup on reject button click', async () => {
		const button = findDisagree();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(scope.getState(routes.rooms.base.$isOpened)).toBeFalsy();
		});
	});
});
