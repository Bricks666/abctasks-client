import { fireEvent, waitFor } from '@testing-library/react';
import { allSettled } from 'effector';
import { HttpResponse, http } from 'msw';
import { beforeEach, describe, expect, test } from 'vitest';

import { usersInRoomModel } from '@/entities/users';

import { routes } from '@/shared/configs';
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
	const testScope = useTestScope();
	const testRouter = useTestRouter();
	const RootProvider = createRootProvider(
		testScope.Provider,
		testRouter.Provider
	);
	const component = useCreateComponent({
		Component: ConfirmRemoveUser,
		defaultProps: {
			isOpen: true,
		},
		options: {
			wrapper: RootProvider,
		},
	});

	const findPopup = () =>
		component.wrapper.getByRole('dialog', {
			name: 'actions.remove_user.title',
		});
	const findAgree = () =>
		component.wrapper.getByRole('button', {
			name: 'actions.remove_user.actions.agree',
		});
	const findDisagree = () =>
		component.wrapper.getByRole('button', {
			name: 'actions.remove_user.actions.disagree',
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
			params: userId,
		});

		await allSettled(usersInRoomModel.query.start, {
			scope: testScope.scope,
			params: {
				roomId: 1,
			},
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
					message: 'actions.remove_user.notifications.success',
					color: 'success',
				})
			);
			expect(
				testScope.scope.getState(usersInRoomModel.query.$data)
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

		component.createComponent();

		const button = findAgree();

		fireEvent.click(button);

		await waitFor(() => {
			expect(testScope.scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(
				testScope.scope.getState(notificationsModel.$items)
			).toContainEqual(
				expect.objectContaining({
					message: 'actions.remove_user.notifications.error',
					color: 'error',
				})
			);
			expect(
				testScope.scope.getState(usersInRoomModel.query.$data)
			).toContainEqual(
				expect.objectContaining({
					id: userId,
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
		});
	});
});
