import { beforeEach, describe, expect, test } from 'vitest';

import { tagsModel } from '@/entities/tags';
import { usersInRoomModel } from '@/entities/users';

import { router } from '@/shared/configs';
import { deviceInfoModel } from '@/shared/models';

import { form } from './model';
import { TasksFilters } from './tasks-filters';

import {
	RenderResult,
	Scope,
	act,
	allSettled,
	fireEvent,
	fork,
	render,
	screen,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/tasks/tasks-filters/tasks-filters', () => {
	let scope: Scope;
	let wrapper: RenderResult;
	const roomId = 123;

	const createComponent = () => {
		wrapper = render(<TasksFilters />, { scope, router, });
	};
	const findOpenButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.tasks_filters.title',
		});
	const findForm = () =>
		wrapper.getByRole('form', { name: 'actions.tasks_filters.title', });
	const findSubmitButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.tasks_filters.actions.submit',
		});
	const findResetButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.tasks_filters.actions.reset',
		});
	const findAuthorsField = () =>
		wrapper.getByRole('combobox', {
			name: 'actions.tasks_filters.fields.authors',
		});
	const findTagsFild = () =>
		wrapper.getByRole('combobox', {
			name: 'actions.tasks_filters.fields.tags',
		});

	const openForm = () => {
		const button = findOpenButton();

		fireEvent.click(button);
	};

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ scope, router, });
		await allSettled(usersInRoomModel.query.start, {
			scope,
			params: { roomId, },
		});
		await allSettled(tagsModel.query.start, {
			scope,
			params: { roomId, },
		});
		await act(async () => createComponent());
	});

	test('should render buttons to open filters form', async () => {
		expect(document.body).toMatchSnapshot('closed filters');
	});

	test('should render form in popover for screen with width > 720', async () => {
		openForm();

		expect(document.body).toMatchSnapshot('filters in popover');
	});

	test('should render form in popup for screen with width <= 720', async () => {
		await act(() =>
			allSettled(deviceInfoModel.$device, {
				scope,
				params: 'mobile',
			})
		);
		openForm();

		expect(document.body).toMatchSnapshot('filters in popup');
	});

	test('should submit form and close form on submit button click', async () => {
		expect.assertions(2);

		openForm();
		const authorsField = findAuthorsField();
		const tagsField = findTagsFild();

		await wrapper.user.click(authorsField);
		await wrapper.user.keyboard('username');
		await waitFor(async () => {
			await wrapper.user.click(screen.getByRole('option'));
		});

		await wrapper.user.click(tagsField);
		await wrapper.user.keyboard('A tag');
		await waitFor(async () => {
			await wrapper.user.click(screen.getByRole('option'));
		});

		await wrapper.user.click(findSubmitButton());

		expect(findForm).toThrow();
		expect(scope.getState(form.$values)).toStrictEqual(
			expect.objectContaining({
				authorIds: [1],
				tagIds: [1],
			})
		);
	});

	test('should reset form and close form on reset button click', async () => {
		expect.assertions(4);

		openForm();
		const authorsField = findAuthorsField();
		const tagsField = findTagsFild();

		await wrapper.user.click(authorsField);
		await wrapper.user.keyboard('username');
		await waitFor(async () => {
			await wrapper.user.click(screen.getByRole('option'));
		});

		await wrapper.user.click(tagsField);
		await wrapper.user.keyboard('A tag');
		await waitFor(async () => {
			await wrapper.user.click(screen.getByRole('option'));
		});

		await wrapper.user.click(findSubmitButton());

		openForm();
		await wrapper.user.click(findResetButton());

		expect(findForm).toThrow();
		await waitFor(() => {
			openForm();
			expect(authorsField).toHaveValue('');
			expect(tagsField).toHaveValue('');
		});
		expect(scope.getState(form.$values)).toStrictEqual(
			expect.objectContaining({
				tagIds: [],
				authorIds: [],
			})
		);
	});
});
