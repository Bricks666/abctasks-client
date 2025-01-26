import { beforeEach, describe, expect, test, vi } from 'vitest';

import {
	RenderResult,
	TestCtx,
	act,
	createTestCtx,
	fireEvent,
	render,
	screen,
	waitFor
} from '~/test-utils';

import { deviceInfoModel } from '@/shared/models';

import { ActivitiesFilters } from './filters';


describe('features/activities/activities-filters/ui/filters.tsx', () => {
	const roomId = 123;
	const onFiltersChanged = vi.fn();
	let ctx: TestCtx;
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(
			<ActivitiesFilters
				className='classname'
				roomId={roomId}
				onFiltersChanged={onFiltersChanged}
			/>,
			{ ctx, }
		);
	};
	const findOpenButton = () =>
		wrapper.getByRole('button', { name: 'actions.filter_activities.title', });
	const findForm = () =>
		wrapper.getByRole('form', { name: 'actions.filter_activities.title', });
	const findSubmitButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.filter_activities.actions.submit',
		});
	const findResetButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.filter_activities.actions.reset',
		});
	const findUsersField = () =>
		wrapper.getByRole('combobox', {
			name: 'actions.filter_activities.fields.users',
		});
	const findActionsField = () =>
		wrapper.getByRole('combobox', {
			name: 'actions.filter_activities.fields.action',
		});

	const openForm = () => {
		const button = findOpenButton();

		fireEvent.click(button);
	};

	beforeEach(() => {
		ctx = createTestCtx();
	});

	test('should render buttons to open filters form', async () => {
		await act(async () => createComponent());

		expect(document.body).toMatchSnapshot('closed filters');
	});

	test('should render form in popover for lerge screen', async () => {
		await act(async () => createComponent());

		openForm();

		expect(document.body).toMatchSnapshot('filters in popover');
	});

	test('should render form in popup for screen small screen', async () => {
		ctx.mock(deviceInfoModel.deviceAtom, 'tablet-vertical');
		ctx.mock(deviceInfoModel.isTabletVerticalAtom, true);

		await act(async () => createComponent());

		openForm();

		expect(document.body).toMatchSnapshot('filters in popup');
	});

	test('should submit form and close form on submit button click', async () => {
		await act(async () => createComponent());

		expect.assertions(2);

		openForm();
		const userField = findUsersField();
		const actionField = findActionsField();

		await act(async () => {
			await wrapper.user.click(userField);
			await wrapper.user.keyboard('username');
			await waitFor(async () => {
				await wrapper.user.click(screen.getByRole('option'));
			});

			await wrapper.user.click(actionField);
			await wrapper.user.keyboard('create');
			await waitFor(async () => {
				await wrapper.user.click(screen.getByRole('option'));
			});
		});

		await wrapper.user.click(findSubmitButton());

		expect(findForm).toThrow();
		expect(onFiltersChanged).toHaveBeenCalledWith(
			expect.objectContaining({
				actionIds: [1],
				activistIds: [1],
			})
		);
	});

	test('should reset form and close form on reset button click', async () => {
		await act(async () => createComponent());

		expect.assertions(4);

		openForm();
		const userField = findUsersField();
		const actionField = findActionsField();

		await act(async () => {
			await wrapper.user.click(userField);
			await wrapper.user.keyboard('username');
			await waitFor(async () => {
				await wrapper.user.click(screen.getByRole('option'));
			});

			await wrapper.user.click(actionField);
			await wrapper.user.keyboard('create');
			await waitFor(async () => {
				await wrapper.user.click(screen.getByRole('option'));
			});
		});

		await wrapper.user.click(findSubmitButton());

		openForm();
		await wrapper.user.click(findResetButton());

		expect(findForm).toThrow();
		await waitFor(() => {
			openForm();
			expect(userField).toHaveValue('');
			expect(actionField).toHaveValue('');
		});
		expect(onFiltersChanged).toHaveBeenCalledWith(
			expect.objectContaining({
				actionIds: [],
				activistIds: [],
			})
		);
	});

	test.todo('should sync fitlers with href');
});
