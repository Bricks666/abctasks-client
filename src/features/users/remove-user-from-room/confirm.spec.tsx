import { fireEvent, waitFor } from '@testing-library/react';
import { allSettled } from 'effector';
import { HttpResponse, http } from 'msw';
import { beforeEach, describe, expect, test } from 'vitest';

import { usersInRoomModel } from '@/entities/users';

import { routes, router } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';

import { ConfirmRemoveUser } from './confirm';
import { openConfirm, popupControls } from './model';

import {
	createRootProvider,
	server,
	useCreateComponent,
	useTestRouter,
	useTestScope
} from '~/tests';

describe('features/users/remove-user-from-room/confirm', () => {
	const userId = 1;
	const { Provider: ScopeProvider, getScope, } = useTestScope();
	const { Provider: RouterProvider, } = useTestRouter({ getScope, router, });
	const RootProvider = createRootProvider(ScopeProvider, RouterProvider);
	const { getWrapper, create, } = useCreateComponent({
		Component: ConfirmRemoveUser,
		defaultProps: {
			isOpen: true,
		},
		options: {
			wrapper: RootProvider,
		},
	});

	const findPopup = () =>
		getWrapper().getByRole('dialog', {
			name: 'actions.remove_user.title',
		});
	const findAgree = () =>
		getWrapper().getByRole('button', {
			name: 'actions.remove_user.actions.agree',
		});
	const findDisagree = () =>
		getWrapper().getByRole('button', {
			name: 'actions.remove_user.actions.disagree',
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
			params: userId,
		});

		await allSettled(usersInRoomModel.query.start, {
			scope: getScope(),
			params: {
				roomId: 1,
			},
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
					message: 'actions.remove_user.notifications.success',
					color: 'success',
				})
			);
			expect(
				getScope().getState(usersInRoomModel.query.$data)
			).not.toContainEqual(
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

		create();

		const button = findAgree();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(popupControls.$isOpen)).toBeTruthy();
			expect(getScope().getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.remove_user.notifications.error',
					color: 'error',
				})
			);
			expect(getScope().getState(usersInRoomModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: userId,
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
		});
	});
});
