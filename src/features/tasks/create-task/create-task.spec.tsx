import { beforeEach, describe, expect, test } from 'vitest';

import { tagsModel } from '@/entities/tags';
import { tasksInRoomModel } from '@/entities/tasks';

import { router } from '@/shared/configs';
import { deviceInfoModel, notificationsModel } from '@/shared/models';

import { CreateTask } from './create-task';
import { openPopup, popupControls } from './model';

import {
	RenderResult,
	Scope,
	act,
	allSettled,
	defaultRoom,
	fireEvent,
	fork,
	handlers,
	render,
	screen,
	server,
	useTestRouter,
	waitFor
} from '~/test-utils';

const taskTitle = 'some title';
describe('features/tasks/create/create-task', () => {
	const { id: roomId, } = defaultRoom;
	const columnStatus = 'done' as const;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<CreateTask isOpen />, { scope, router, });
	};
	const findPopup = () =>
		wrapper.getByRole('dialog', { name: 'actions.create_task.title', });
	const findTitleField = () =>
		wrapper.getByRole('textbox', {
			name: 'actions.task_form.fields.title',
		});
	const findTagsSelect = () =>
		wrapper.getByRole('combobox', {
			name: 'actions.task_form.fields.tags',
		});
	const findSubmit = () =>
		wrapper.getByRole('button', { name: 'actions.create', });

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

		await allSettled(openPopup, { scope, params: columnStatus, });

		await act(async () => createComponent());
	});

	test('should render form in popup', async () => {
		expect(findPopup()).toMatchSnapshot('large screen');
	});

	test('should render form in fullscreen popup for small screens', async () => {
		await act(() =>
			allSettled(deviceInfoModel.$device, {
				scope,
				params: 'mobile',
			})
		);

		expect(findPopup()).toMatchSnapshot('small screen');
	});

	test('should create task on submit', async () => {
		const titleField = findTitleField();
		fireEvent.input(titleField, { target: { value: taskTitle, }, });
		const tagsSelect = findTagsSelect();
		fireEvent.click(tagsSelect);
		fireEvent.input(tagsSelect, { target: { value: 'A tag', }, });
		fireEvent.click(screen.getByRole('option'));

		const button = findSubmit();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.create_task.notifications.success',
					color: 'success',
				})
			);
			expect(scope.getState(tasksInRoomModel.query.$data)).toContainEqual(
				expect.objectContaining({
					roomId,
					title: taskTitle,
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
		server.use(handlers.tasks.error.create);

		const titleField = findTitleField();
		fireEvent.input(titleField, { target: { value: 'some name', }, });
		fireEvent.input(titleField, { target: { value: taskTitle, }, });
		const tagsSelect = findTagsSelect();
		fireEvent.click(tagsSelect);
		fireEvent.input(tagsSelect, { target: { value: 'A tag', }, });
		fireEvent.click(screen.getByRole('option'));

		const button = findSubmit();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.create_task.notifications.error',
					color: 'error',
				})
			);
			expect(scope.getState(tasksInRoomModel.query.$data)).not.toContainEqual(
				expect.objectContaining({
					title: taskTitle,
				})
			);
		});
	});
});
