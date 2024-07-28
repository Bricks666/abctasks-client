import { fireEvent, waitFor } from '@testing-library/react';
import { allSettled } from 'effector';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, test } from 'vitest';

import { tagsModel } from '@/entities/tags';
import { taskModel, tasksInRoomModel } from '@/entities/tasks';

import { router, routes } from '@/shared/configs';
import { deviceInfoModel, notificationsModel } from '@/shared/models';

import { openPopup, popupControls } from './model';
import { UpdateTask } from './update-task';

import {
	createRootProvider,
	server,
	useCreateComponent,
	useTestRouter,
	useTestScope
} from '~/tests';

const taskTitle = 'some title';
describe('features/tasks/update/update-task', () => {
	const roomId = 1;
	const taskId = 1;
	const { Provider: ScopeProvider, getScope, } = useTestScope();
	const { Provider: RouterProvider, } = useTestRouter({ getScope, router, });
	const RootProvider = createRootProvider(ScopeProvider, RouterProvider);
	const { getWrapper, create, } = useCreateComponent({
		Component: UpdateTask,
		defaultProps: {
			isOpen: true,
		},
		options: {
			wrapper: RootProvider,
		},
	});

	const findPopup = () =>
		getWrapper().getByRole('dialog', { name: 'actions.update_task.title', });
	const findTitleField = () =>
		getWrapper().getByRole('textbox', {
			name: 'actions.task_form.fields.title',
		});

	const findSubmit = () =>
		getWrapper().getByRole('button', { name: 'actions.save', });

	beforeEach(async () => {
		await allSettled(deviceInfoModel.$device, {
			scope: getScope(),
			params: 'desktop-small',
		});

		await allSettled(tagsModel.query.start, {
			scope: getScope(),
			params: { roomId, },
		});
		await allSettled(tasksInRoomModel.query.start, {
			scope: getScope(),
			params: { roomId, },
		});

		await allSettled(routes.room.tasks.open, {
			scope: getScope(),
			params: { id: roomId, },
		});
		await allSettled(openPopup, { scope: getScope(), params: taskId, });
	});

	test('should render form in popup', async () => {
		create();

		await waitFor(() => {
			expect(findPopup()).toBeInTheDocument();
		});

		expect(findPopup()).toMatchSnapshot('large screen');
	});

	test('should render form in fullscreen popup for small screens', async () => {
		await allSettled(deviceInfoModel.$device, {
			scope: getScope(),
			params: 'mobile',
		});

		create();

		await waitFor(() => {
			expect(findPopup()).toBeInTheDocument();
		});

		expect(findPopup()).toMatchSnapshot('small screen');
	});

	test('should render skeleton while task is loading', async () => {
		create();

		await allSettled(taskModel.query.start, {
			scope: getScope(),
			params: {
				roomId,
				id: 1234,
			},
		});

		expect(findPopup()).toMatchSnapshot('loading');
	});

	test('should update task on submit', async () => {
		create();

		await waitFor(() => {
			expect(findPopup()).toBeInTheDocument();
		});

		const titleField = findTitleField();
		fireEvent.input(titleField, { target: { value: taskTitle, }, });

		const button = findSubmit();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(popupControls.$isOpen)).toBeFalsy();
			expect(getScope().getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.update_task.notifications.success',
					color: 'success',
				})
			);
			expect(getScope().getState(tasksInRoomModel.query.$data)).toContainEqual(
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

		create();

		await waitFor(() => {
			expect(findPopup()).toBeInTheDocument();
		});

		const titleField = findTitleField();

		fireEvent.input(titleField, { target: { value: 'some name', }, });

		const button = findSubmit();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(popupControls.$isOpen)).toBeTruthy();
			expect(getScope().getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.update_task.notifications.error',
					color: 'error',
				})
			);
			expect(
				getScope().getState(tasksInRoomModel.query.$data)
			).not.toContainEqual(
				expect.objectContaining({
					id: taskId,
					title: taskTitle,
				})
			);
		});
	});
});
