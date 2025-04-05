import { beforeEach, describe, expect, test, vi } from 'vitest';

import {
	type RenderResult,
	type TestCtx,
	act,
	createTestCtx,
	defaultRoom,
	render,
	screen,
	waitFor
} from '~/test-utils';

import { RoomScopeProvider } from '@/entities/rooms';

import { deviceInfoModel } from '@/shared/models';

import { TasksFilters } from './filters';

describe('features/tasks/tasks-filters/ui/filters/filters.tsx', () => {
	let wrapper: RenderResult;
	let ctx: TestCtx;
	const onFiltersChanged = vi.fn();
	const roomId = defaultRoom.id;

	const createComponent = () => {
		wrapper = render(
			<RoomScopeProvider roomId={roomId}>
				<TasksFilters onFiltersChanged={onFiltersChanged} />
			</RoomScopeProvider>,
			{ ctx, }
		);
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

	const openForm = async () => {
		const button = findOpenButton();

		await wrapper.user.click(button);
	};

	beforeEach(() => {
		ctx = createTestCtx();
	});

	test('should render buttons to open filters form', async () => {
		await act(async () => createComponent());

		expect(document.body).toMatchSnapshot('closed filters');
	});

	test('should render form in popover for screen with width > 720', async () => {
		await act(async () => createComponent());

		await openForm();

		expect(document.body).toMatchSnapshot('filters in popover');
	});

	test('should render form in popup for screen with width <= 720', async () => {
		ctx.mock(deviceInfoModel.deviceAtom, 'tablet-vertical');
		ctx.mock(deviceInfoModel.isTabletVerticalAtom, true);

		await act(async () => createComponent());

		await openForm();

		expect(document.body).toMatchSnapshot('filters in popup');
	});

	test('should submit form and close form on submit button click', async () => {
		await act(async () => createComponent());

		await openForm();
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
		expect(onFiltersChanged).toHaveBeenCalledOnce();
		expect(onFiltersChanged).toHaveBeenCalledWith(
			expect.objectContaining({
				authorIds: [1],
				tagIds: [1],
			})
		);
	});

	test('should reset form and close form on reset button click', async () => {
		await act(async () => createComponent());

		await openForm();
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

		await openForm();
		await wrapper.user.click(findResetButton());

		expect(findForm).toThrow();
		await waitFor(async () => {
			await openForm();
			expect(authorsField).toHaveValue('');
			expect(tagsField).toHaveValue('');
		});
		expect(onFiltersChanged).toHaveBeenCalledTimes(2);
		expect(onFiltersChanged).toHaveBeenCalledWith(
			expect.objectContaining({
				tagIds: [],
				authorIds: [],
			})
		);
	});
});
