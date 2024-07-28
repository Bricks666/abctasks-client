import { fireEvent, waitFor } from '@testing-library/react';
import { allSettled } from 'effector';
import { HttpResponse, http } from 'msw';
import { beforeEach, describe, expect, test } from 'vitest';

import { roomsModel } from '@/entities/rooms';
import { usersInRoomModel } from '@/entities/users';

import { router, routes } from '@/shared/configs';
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
	const { Provider: ScopeProvider, getScope, } = useTestScope();
	const { Provider: RouterProvider, } = useTestRouter({ getScope, router, });
	const RootProvider = createRootProvider(ScopeProvider, RouterProvider);
	const { create, getWrapper, } = useCreateComponent({
		Component: ConfirmUserExit,
		defaultProps: {
			isOpen: true,
		},
		options: {
			wrapper: RootProvider,
		},
	});

	const findPopup = () =>
		getWrapper().getByRole('dialog', {
			name: 'actions.exit_room.title',
		});
	const findAgree = () =>
		getWrapper().getByRole('button', {
			name: 'actions.exit_room.actions.agree',
		});
	const findDisagree = () =>
		getWrapper().getByRole('button', {
			name: 'actions.exit_room.actions.disagree',
		});

	beforeEach(async () => {
		await allSettled(routes.room.users.open, {
			scope: getScope(),
			params: {
				id: 1,
			},
		});
		await allSettled(openConfirm, {
			scope: getScope(),
			params: roomId,
		});

		await allSettled(roomsModel.query.start, {
			scope: getScope(),
		});
	});

	test('should render popup with text and 2 buttons', () => {
		create();

		expect(findPopup()).toMatchSnapshot();
	});

	test('should remove user from room on approve button click', async () => {
		create();

		const button = findAgree();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(popupControls.$isOpen)).toBeFalsy();
			expect(getScope().getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.exit_room.notifications.success',
					color: 'success',
				})
			);
			expect(
				getScope().getState(usersInRoomModel.query.$data)
			).not.toContainEqual(
				expect.objectContaining({
					id: roomId,
				})
			);
			expect(getScope().getState(routes.rooms.base.$isOpened)).toBeTruthy();
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

		create();

		const button = findAgree();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(popupControls.$isOpen)).toBeTruthy();
			expect(getScope().getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.exit_room.notifications.error',
					color: 'error',
				})
			);
			expect(getScope().getState(roomsModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: roomId,
				})
			);
		});
	});

	test('should just close popup on reject button click', async () => {
		create();

		const button = findDisagree();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(popupControls.$isOpen)).toBeFalsy();
			expect(getScope().getState(routes.rooms.base.$isOpened)).toBeFalsy();
		});
	});
});
