import { beforeEach, describe, expect, test } from 'vitest';

import { tasksInRoomModel } from '@/entities/tasks';

import { router } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';

import { ConfirmRemoveTask } from './confirm';
import { openConfirm, popupControls } from './model';

import {
	HttpResponse,
	RenderResult,
	Scope,
	act,
	allSettled,
	fireEvent,
	fork,
	http,
	render,
	server,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/tags/remove/confirm', () => {
	const roomId = 123;
	const taskId = 1;
	let scope: Scope;
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<ConfirmRemoveTask isOpen />, { scope, router, });
	};

	const findConfirm = () =>
		wrapper.getByRole('dialog', { name: 'actions.remove_task.title', });
	const findApprove = () =>
		wrapper.getByRole('button', {
			name: 'actions.remove_task.actions.agree',
		});
	const findDisapprove = () =>
		wrapper.getByRole('button', {
			name: 'actions.remove_task.actions.disagree',
		});

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({
			scope,
			router,
			options: {
				initialEntries: [`/rooms/${roomId}/tasks`],
			},
		});

		await allSettled(openConfirm, { scope, params: taskId, });
		await allSettled(tasksInRoomModel.query.start, {
			scope,
			params: { roomId, },
		});
		await act(async () => createComponent());
	});

	test('should render confirm popup with text to remove task', async () => {
		expect(findConfirm()).toMatchSnapshot();
	});

	test('should remove task on approve button click', async () => {
		const button = findApprove();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.remove_task.notifications.success',
					color: 'success',
				})
			);
			expect(scope.getState(tasksInRoomModel.query.$data)).not.toContainEqual(
				expect.objectContaining({
					id: taskId,
				})
			);
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
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

		const button = findApprove();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.remove_task.notifications.error',
					color: 'error',
				})
			);
			expect(scope.getState(tasksInRoomModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: taskId,
				})
			);
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
		});
	});

	test('should just close confirm on close button click', async () => {
		const button = findDisapprove();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(tasksInRoomModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: taskId,
				})
			);
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
		});
	});
});
