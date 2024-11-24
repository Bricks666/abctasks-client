import { beforeEach, describe, expect, test } from 'vitest';

import { usersInRoomModel } from '@/entities/users';

import { deviceInfoModel } from '@/shared/models';

import { ActivitiesFilters } from './filters';
import { form } from './model';

import {
	RenderResult,
	Scope,
	act,
	allSettled,
	fireEvent,
	fork,
	render,
	screen,
	waitFor
} from '~/test-utils';

describe('features/activities/activities-filters/filters', () => {
	const roomId = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<ActivitiesFilters />, { scope, });
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

	beforeEach(async () => {
		scope = fork();
		await allSettled(deviceInfoModel.$device, {
			scope,
			params: 'desktop-large',
		});
		await allSettled(usersInRoomModel.query.start, {
			scope,
			params: { roomId, },
		});
		await act(async () => createComponent());
	});

	test('should render buttons to open filters form', () => {
		expect(document.body).toMatchSnapshot('closed filters');
	});

	test('should render form in popover for lerge screen', () => {
		openForm();

		expect(document.body).toMatchSnapshot('filters in popover');
	});

	test('should render form in popup for screen small screen', async () => {
		await act(() =>
			allSettled(deviceInfoModel.$device, { scope, params: 'tablet-vertical', })
		);
		openForm();

		expect(document.body).toMatchSnapshot('filters in popup');
	});

	test('should submit form and close form on submit button click', async () => {
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
		expect(scope.getState(form.$values)).toStrictEqual(
			expect.objectContaining({
				actionIds: [1],
				activistIds: [1],
			})
		);
	});

	test('should reset form and close form on reset button click', async () => {
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
		expect(scope.getState(form.$values)).toStrictEqual(
			expect.objectContaining({
				actionIds: [],
				activistIds: [],
			})
		);
	});
});
