import { fireEvent, waitFor } from '@testing-library/react';
import { allSettled } from 'effector';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, test } from 'vitest';

import { tasksInRoomModel } from '@/entities/tasks';

import { router, routes } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';

import { ConfirmRemoveTask } from './confirm';
import { openConfirm, popupControls } from './model';

import {
	createRootProvider,
	server,
	useCreateComponent,
	useTestRouter,
	useTestScope
} from '~/tests';

describe('features/tags/remove/confirm', () => {
	const roomId = 123;
	const taskId = 1;

	const { Provider: ScopeProvider, getScope, } = useTestScope();
	const { Provider: RouterProvider, } = useTestRouter({ getScope, router, });
	const RootProvider = createRootProvider(ScopeProvider, RouterProvider);
	const { getWrapper, create, } = useCreateComponent({
		Component: ConfirmRemoveTask,
		defaultProps: {
			isOpen: true,
		},
		options: {
			wrapper: RootProvider,
		},
	});

	const findConfirm = () =>
		getWrapper().getByRole('dialog', { name: 'actions.remove_task.title', });
	const findApprove = () =>
		getWrapper().getByRole('button', {
			name: 'actions.remove_task.actions.agree',
		});
	const findDisapprove = () =>
		getWrapper().getByRole('button', {
			name: 'actions.remove_task.actions.disagree',
		});

	beforeEach(async () => {
		await allSettled(routes.room.tasks.open, {
			scope: getScope(),
			params: { id: roomId, },
		});
		await allSettled(openConfirm, { scope: getScope(), params: taskId, });
		await allSettled(tasksInRoomModel.query.start, {
			scope: getScope(),
			params: { roomId, },
		});
	});

	test('should render confirm popup with text to remove task', async () => {
		create();

		expect(findConfirm()).toMatchSnapshot();
	});

	test('should remove task on approve button click', async () => {
		create();
		const button = findApprove();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.remove_task.notifications.success',
					color: 'success',
				})
			);
			expect(
				getScope().getState(tasksInRoomModel.query.$data)
			).not.toContainEqual(
				expect.objectContaining({
					id: taskId,
				})
			);
			expect(getScope().getState(popupControls.$isOpen)).toBeFalsy();
		});
	});

	test('should create notificaiton on error', async () => {
		server.use(
			http.delete('/api/tasks/:roomId/:taskId/remove', () => {
				return HttpResponse.json(
					{
						message: 'Not Found',
					},
					{
						status: 404,
						statusText: 'Not Found',
					}
				);
			})
		);

		create();
		const button = findApprove();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.remove_task.notifications.error',
					color: 'error',
				})
			);
			expect(getScope().getState(tasksInRoomModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: taskId,
				})
			);
			expect(getScope().getState(popupControls.$isOpen)).toBeFalsy();
		});
	});

	test('should just close confirm on close button click', async () => {
		create();
		const button = findDisapprove();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(tasksInRoomModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: taskId,
				})
			);
			expect(getScope().getState(popupControls.$isOpen)).toBeFalsy();
		});
	});
});
