import { beforeEach, describe, expect, test } from 'vitest';

import { tagsModel } from '@/entities/tags';
import { taskModel, tasksInRoomModel } from '@/entities/tasks';

import { router } from '@/shared/configs';
import { deviceInfoModel, notificationsModel } from '@/shared/models';

import { openPopup, popupControls } from './model';
import { UpdateTask } from './update-task';

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

const taskTitle = 'some title';
describe('features/tasks/update/update-task', () => {
	const roomId = 1;
	const taskId = 1;
	let scope: Scope;
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<UpdateTask isOpen />, { scope, router, });
	};

	const findPopup = () =>
		wrapper.getByRole('dialog', { name: 'actions.update_task.title', });
	const findTitleField = () =>
		wrapper.getByRole('textbox', {
			name: 'actions.task_form.fields.title',
		});

	const findSubmit = () =>
		wrapper.getByRole('button', { name: 'actions.save', });

	beforeEach(async () => {
		scope = fork();
		await useTestRouter({
			scope,
			router,
			options: {
				initialEntries: [`/rooms/${roomId}/tasks`],
			},
		});
		await allSettled(deviceInfoModel.$device, {
			scope,
			params: 'desktop-small',
		});
		await allSettled(tagsModel.query.start, {
			scope,
			params: { roomId, },
		});
		await allSettled(tasksInRoomModel.query.start, {
			scope,
			params: { roomId, },
		});
		await allSettled(openPopup, { scope, params: taskId, });

		await act(async () => createComponent());
	});

	test('should render form in popup', async () => {
		await waitFor(() => {
			expect(findPopup()).toBeInTheDocument();
		});

		expect(findPopup()).toMatchSnapshot('large screen');
	});

	test('should render form in fullscreen popup for small screens', async () => {
		await act(() =>
			allSettled(deviceInfoModel.$device, {
				scope,
				params: 'mobile',
			})
		);

		await waitFor(() => {
			expect(findPopup()).toBeInTheDocument();
		});

		expect(findPopup()).toMatchSnapshot('small screen');
	});

	test('should render skeleton while task is loading', async () => {
		await act(() =>
			allSettled(taskModel.query.start, {
				scope,
				params: {
					roomId,
					id: 1234,
				},
			})
		);

		expect(findPopup()).toMatchSnapshot('loading');
	});

	test('should update task on submit', async () => {
		await waitFor(() => {
			expect(findPopup()).toBeInTheDocument();
		});

		const titleField = findTitleField();
		fireEvent.input(titleField, { target: { value: taskTitle, }, });

		const button = findSubmit();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.update_task.notifications.success',
					color: 'success',
				})
			);
			expect(scope.getState(tasksInRoomModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: taskId,
					title: taskTitle,
				})
			);
		});
	});

	test('should create error notification on error', async () => {
		server.use(
			http.put('/api/tasks/:roomId/:taskId/update', () => {
				return HttpResponse.json(
					{
						message: 'Server Error',
					},
					{
						status: 500,
						statusText: 'Internal Error',
					}
				);
			})
		);

		await waitFor(() => {
			expect(findPopup()).toBeInTheDocument();
		});

		const titleField = findTitleField();

		fireEvent.input(titleField, { target: { value: 'some name', }, });

		const button = findSubmit();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.update_task.notifications.error',
					color: 'error',
				})
			);
			expect(scope.getState(tasksInRoomModel.query.$data)).not.toContainEqual(
				expect.objectContaining({
					id: taskId,
					title: taskTitle,
				})
			);
		});
	});
});
