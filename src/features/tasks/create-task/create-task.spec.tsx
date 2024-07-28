import { fireEvent, screen, waitFor } from '@testing-library/react';
import { allSettled } from 'effector';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, test } from 'vitest';

import { tagsModel } from '@/entities/tags';
import { tasksInRoomModel } from '@/entities/tasks';

import { router, routes } from '@/shared/configs';
import { deviceInfoModel, notificationsModel } from '@/shared/models';

import { CreateTask } from './create-task';
import { openPopup, popupControls } from './model';

import {
	createRootProvider,
	server,
	useCreateComponent,
	useTestRouter,
	useTestScope
} from '~/tests';

describe('features/tasks/create/create-task', () => {
	const roomId = 1;
	const columnStatus = 'done' as const;
	const { Provider: ScopeProvider, getScope, } = useTestScope();
	const { Provider: RouterProvider, } = useTestRouter({ getScope, router, });
	const RootProvider = createRootProvider(ScopeProvider, RouterProvider);
	const { getWrapper, create, } = useCreateComponent({
		Component: CreateTask,
		defaultProps: {
			isOpen: true,
		},
		options: {
			wrapper: RootProvider,
		},
	});

	const findPopup = () =>
		getWrapper().getByRole('dialog', { name: 'actions.create_task.title', });
	const findTitleField = () =>
		getWrapper().getByRole('textbox', {
			name: 'actions.task_form.fields.title',
		});
	const findTagsSelect = () =>
		getWrapper().getByRole('combobox', {
			name: 'actions.task_form.fields.tags',
		});
	const findSubmit = () =>
		getWrapper().getByRole('button', { name: 'actions.create', });

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

		await allSettled(openPopup, { scope: getScope(), params: columnStatus, });
		await allSettled(routes.room.tasks.open, {
			scope: getScope(),
			params: { id: roomId, },
		});
	});

	test('should render form in popup', async () => {
		create();

		expect(findPopup()).toMatchSnapshot('large screen');
	});

	test('should render form in fullscreen popup for small screens', async () => {
		await allSettled(deviceInfoModel.$device, {
			scope: getScope(),
			params: 'mobile',
		});

		create();

		expect(findPopup()).toMatchSnapshot('small screen');
	});

	test('should create task on submit', async () => {
		create();

		const titleField = findTitleField();
		fireEvent.input(titleField, { target: { value: 'some title', }, });
		const tagsSelect = findTagsSelect();
		fireEvent.click(tagsSelect);
		fireEvent.input(tagsSelect, { target: { value: 'A tag', }, });
		fireEvent.click(screen.getByRole('option'));

		const button = findSubmit();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(popupControls.$isOpen)).toBeFalsy();
			expect(getScope().getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.create_task.notifications.success',
					color: 'success',
				})
			);
			expect(getScope().getState(tasksInRoomModel.query.$data)).toContainEqual(
				expect.objectContaining({
					roomId,
					title: 'some title',
					description: '',
					status: columnStatus,
					tags: expect.arrayContaining([
						expect.objectContaining({
							name: 'A tag',
						})
					]),
				})
			);
		});
	});

	test('should create error notification on error', async () => {
		server.use(
			http.post('/api/tasks/:roomId/create', () => {
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

		const titleField = findTitleField();

		fireEvent.input(titleField, { target: { value: 'some name', }, });

		const button = findSubmit();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(popupControls.$isOpen)).toBeTruthy();
			expect(getScope().getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.create_task.notifications.error',
					color: 'error',
				})
			);
			expect(
				getScope().getState(tasksInRoomModel.query.$data)
			).not.toContainEqual(expect.objectContaining({}));
		});
	});
});
