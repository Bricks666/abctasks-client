import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { allSettled } from 'effector';
import { beforeEach, describe, expect, test } from 'vitest';

import { tagsModel } from '@/entities/tags';
import { usersInRoomModel } from '@/entities/users';

import { router } from '@/shared/configs';
import { deviceInfoModel } from '@/shared/models';

import { form } from './model';
import { TasksFilters } from './tasks-filters';

import {
	createDateTimeProvider,
	createRootProvider,
	useCreateComponent,
	useTestRouter,
	useTestScope,
	user
} from '~/tests';


describe('features/tasks/tasks-filters/tasks-filters', () => {
	const roomId = 123;
	const { Provider: ScopeProvider, getScope, } = useTestScope();
	const { Provider: RouterProvider, } = useTestRouter({ getScope, router, });
	const DateTimeProvider = createDateTimeProvider();
	const RootProvider = createRootProvider(
		ScopeProvider,
		RouterProvider,
		DateTimeProvider
	);
	const { getWrapper, create, } = useCreateComponent({
		Component: TasksFilters,
		options: {
			wrapper: RootProvider,
		},
	});

	const findOpenButton = () =>
		getWrapper().getByRole('button', {
			name: 'actions.tasks_filters.title',
		});
	const findForm = () =>
		getWrapper().getByRole('form', { name: 'actions.tasks_filters.title', });
	const findSubmitButton = () =>
		getWrapper().getByRole('button', {
			name: 'actions.tasks_filters.actions.submit',
		});
	const findResetButton = () =>
		getWrapper().getByRole('button', {
			name: 'actions.tasks_filters.actions.reset',
		});
	const findAuthorsField = () =>
		getWrapper().getByRole('combobox', {
			name: 'actions.tasks_filters.fields.authors',
		});
	const findTagsFild = () =>
		getWrapper().getByRole('combobox', {
			name: 'actions.tasks_filters.fields.tags',
		});

	const openForm = () => {
		const button = findOpenButton();

		fireEvent.click(button);
	};

	beforeEach(async () => {
		await allSettled(usersInRoomModel.query.start, {
			scope: getScope(),
			params: { roomId, },
		});
		await allSettled(tagsModel.query.start, {
			scope: getScope(),
			params: { roomId, },
		});
	});

	test('should render buttons to open filters form', async () => {
		create();

		expect(document.body).toMatchSnapshot('closed filters');
	});

	test('should render form in popover for screen with width > 720', async () => {
		create();

		openForm();

		expect(document.body).toMatchSnapshot('filters in popover');
	});

	test('should render form in popup for screen with width <= 720', async () => {
		create();

		await allSettled(deviceInfoModel.$device, {
			scope: getScope(),
			params: 'mobile',
		});
		openForm();

		expect(document.body).toMatchSnapshot('filters in popup');
	});

	test('should submit form and close form on submit button click', async () => {
		expect.assertions(2);

		create();
		openForm();
		const authorsField = findAuthorsField();
		const tagsField = findTagsFild();

		await act(async () => {
			await user.click(authorsField);
			await user.keyboard('username');
			await waitFor(async () => {
				await user.click(screen.getByRole('option'));
			});

			await user.click(tagsField);
			await user.keyboard('A tag');
			await waitFor(async () => {
				await user.click(screen.getByRole('option'));
			});
		});

		await user.click(findSubmitButton());

		expect(findForm).toThrow();
		expect(getScope().getState(form.$values)).toStrictEqual(
			expect.objectContaining({
				authorIds: [1],
				tagIds: [1],
			})
		);
	});

	test('should reset form and close form on reset button click', async () => {
		expect.assertions(4);

		create();
		openForm();
		const authorsField = findAuthorsField();
		const tagsField = findTagsFild();

		await act(async () => {
			await user.click(authorsField);
			await user.keyboard('username');
			await waitFor(async () => {
				await user.click(screen.getByRole('option'));
			});

			await user.click(tagsField);
			await user.keyboard('A tag');
			await waitFor(async () => {
				await user.click(screen.getByRole('option'));
			});
		});

		await user.click(findSubmitButton());

		openForm();
		await user.click(findResetButton());

		expect(findForm).toThrow();
		await waitFor(() => {
			openForm();
			expect(authorsField).toHaveValue('');
			expect(tagsField).toHaveValue('');
		});
		expect(getScope().getState(form.$values)).toStrictEqual(
			expect.objectContaining({
				tagIds: [],
				authorIds: [],
			})
		);
	});
});
