import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
	RenderResult,
	act,
	fireEvent,
	render,
	screen,
	waitFor
} from '@testing-library/react';
import { Scope, allSettled, fork } from 'effector';
import { Provider } from 'effector-react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import { activityActionsModel } from '@/entities/activities';
import { usersInRoomModel } from '@/entities/users';

import { deviceInfoModel } from '@/shared/models';

import { ActivitiesFilters } from './filters';
import { form } from './model';

import { user } from '~/tests';



describe('features/activities/activities-filters/filters', () => {
	const roomId = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<ActivitiesFilters />
				</LocalizationProvider>
			</Provider>
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
	const prepareModels = () => {
		allSettled(deviceInfoModel.subscribeFx, { scope, });

		allSettled(usersInRoomModel.query.start, {
			scope,
			params: { roomId, },
		});
		allSettled(activityActionsModel.query.start, {
			scope,
		});
	};

	beforeEach(async () => {
		scope = fork();
		prepareModels();
	});

	afterEach(async () => {
		allSettled(deviceInfoModel.unsubscribeFx, { scope, });
	});

	test('should render buttons to open filters form', () => {
		createComponent();

		expect(document.body).toMatchSnapshot('closed filters');
	});

	test('should render form in popover for screen with width > 720', () => {
		createComponent();

		window.innerWidth = 700;
		window.dispatchEvent(new Event('resize'));

		openForm();

		expect(document.body).toMatchSnapshot('filters in popover');
	});

	test('should render form in popup for screen with width <= 720', () => {
		createComponent();

		window.innerWidth = 1080;
		window.dispatchEvent(new Event('resize'));
		openForm();

		expect(document.body).toMatchSnapshot('filters in popup');
	});

	test('should submit form and close form on submit button click', async () => {
		expect.assertions(2);

		createComponent();
		openForm();
		const userField = findUsersField();
		const actionField = findActionsField();

		await act(async () => {
			await user.click(userField);
			await user.keyboard('username');
			await waitFor(async () => {
				await user.click(screen.getByRole('option'));
			});

			await user.click(actionField);
			await user.keyboard('create');
			await waitFor(async () => {
				await user.click(screen.getByRole('option'));
			});
		});

		await user.click(findSubmitButton());

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

		createComponent();
		openForm();
		const userField = findUsersField();
		const actionField = findActionsField();

		await act(async () => {
			await user.click(userField);
			await user.keyboard('username');
			await waitFor(async () => {
				await user.click(screen.getByRole('option'));
			});

			await user.click(actionField);
			await user.keyboard('create');
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
