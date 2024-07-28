import { fireEvent, waitFor } from '@testing-library/react';
import { allSettled } from 'effector';
import { HttpResponse, http } from 'msw';
import { beforeEach, describe, expect, test } from 'vitest';

import { roomsModel } from '@/entities/rooms';
import { usersInRoomModel } from '@/entities/users';

import { routes } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';

import { ConfirmUserExit } from './confirm';
import { openConfirm, popupControls } from './model';

import {
	createRootProvider,
	server,
	useCreateComponent,
	useTestRouter,
	useTestScope
} from '~/tests';

describe('features/users/remove-user-from-room/confirm', () => {
	const roomId = 1;
	const testScope = useTestScope();
	const testRouter = useTestRouter();
	const RootProvider = createRootProvider(
		testScope.Provider,
		testRouter.Provider
	);
	const component = useCreateComponent({
		Component: ConfirmUserExit,
		defaultProps: {
			isOpen: true,
		},
		options: {
			wrapper: RootProvider,
		},
	});

	const findPopup = () =>
		component.wrapper.getByRole('dialog', {
			name: 'actions.exit_room.title',
		});
	const findAgree = () =>
		component.wrapper.getByRole('button', {
			name: 'actions.exit_room.actions.agree',
		});
	const findDisagree = () =>
		component.wrapper.getByRole('button', {
			name: 'actions.exit_room.actions.disagree',
		});

	beforeEach(async () => {
		await testRouter.initRouter(testScope.scope);
		await allSettled(routes.room.users.open, {
			scope: testScope.scope,
			params: {
				id: 1,
			},
		});
		await allSettled(openConfirm, {
			scope: testScope.scope,
			params: roomId,
		});

		await allSettled(roomsModel.query.start, {
			scope: testScope.scope,
		});
	});

	test('should render popup with text and 2 buttons', () => {
		component.createComponent();

		expect(findPopup()).toMatchSnapshot();
	});

	test('should remove user from room on approve button click', async () => {
		component.createComponent();

		const button = findAgree();

		fireEvent.click(button);

		await waitFor(() => {
			expect(testScope.scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(
				testScope.scope.getState(notificationsModel.$items)
			).toContainEqual(
				expect.objectContaining({
					message: 'actions.exit_room.notifications.success',
					color: 'success',
				})
			);
			expect(
				testScope.scope.getState(usersInRoomModel.query.$data)
			).not.toContainEqual(
				expect.objectContaining({
					id: roomId,
				})
			);
			expect(
				testScope.scope.getState(routes.rooms.base.$isOpened)
			).toBeTruthy();
		});
	});

	test('should create notification and keep popup opened on server error', async () => {
		server.use(
			http.delete('/api/members/:roomId/exit', () => {
				return HttpResponse.json(
					{
						message: 'Not Found',
					},
					{ status: 404, statusText: 'Not Found', }
				);
			})
		);

		component.createComponent();

		const button = findAgree();

		fireEvent.click(button);

		await waitFor(() => {
			expect(testScope.scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(
				testScope.scope.getState(notificationsModel.$items)
			).toContainEqual(
				expect.objectContaining({
					message: 'actions.exit_room.notifications.error',
					color: 'error',
				})
			);
			expect(testScope.scope.getState(roomsModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: roomId,
				})
			);
		});
	});

	test('should just close popup on reject button click', async () => {
		component.createComponent();

		const button = findDisagree();

		fireEvent.click(button);

		await waitFor(() => {
			expect(testScope.scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(testScope.scope.getState(routes.rooms.base.$isOpened)).toBeFalsy();
		});
	});
});
