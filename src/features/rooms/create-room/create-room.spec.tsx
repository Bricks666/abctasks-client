import { render, RenderResult, waitFor } from '@testing-library/react';
import { RouterProvider } from 'atomic-router-react';
import { allSettled, fork, Scope } from 'effector';
import { Provider } from 'effector-react';
import { createMemoryHistory } from 'history';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, test } from 'vitest';

import { roomsModel } from '@/entities/rooms';

import { router } from '@/shared/configs';
import { Devices, deviceInfoModel, notificationsModel } from '@/shared/models';

import { CreateRoom } from './create-room';
import { popupControls } from './model';

import { server, user } from '~/tests';

describe('features/rooms/create-room/create-room', () => {
	let wrapper: RenderResult;
	let scope: Scope;

	const description = 'some description';
	const name = 'some name';

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<CreateRoom isOpen />
				</RouterProvider>
			</Provider>
		);
	};
	const setDeviceSize = async (device: Devices) => {
		await allSettled(deviceInfoModel.$device, { scope, params: device, });
	};
	const findPopup = () =>
		wrapper.getByRole('dialog', { name: 'actions.create_room.title', });
	const findSubmit = () =>
		wrapper.getByRole('button', { name: 'actions.create', });
	const findNameField = () =>
		wrapper.getByRole('textbox', { name: 'actions.room_form.fields.name', });
	const findDescriptionField = () =>
		wrapper.getByRole('textbox', {
			name: 'actions.room_form.fields.description',
		});

	beforeEach(async () => {
		scope = fork({
			values: [[roomsModel.query.$data, []]],
		});

		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory({
				initialEntries: ['/rooms'],
			}),
		});

		await allSettled(popupControls.open, { scope, });
	});

	test('should render popup with room form and button inside it for large screen', async () => {
		await setDeviceSize('desktop-small');

		createComponent();

		expect(findPopup()).toMatchSnapshot('large screen');
	});

	test('should render popup with room form and button in popup footer for small screen', async () => {
		await setDeviceSize('tablet-vertical');

		createComponent();

		expect(findPopup()).toMatchSnapshot('small screen');
	});

	test('should create room on form submit', async () => {
		createComponent();

		const nameField = findNameField();
		const descriptionField = findDescriptionField();

		await user.click(nameField);
		await user.keyboard(name);

		await user.click(descriptionField);
		await user.keyboard(description);

		const button = findSubmit();

		await user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(nameField).toHaveValue('');
			expect(descriptionField).toHaveValue('');
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					color: 'success',
					message: 'actions.create_room.notifications.success',
				})
			);
			expect(scope.getState(roomsModel.query.$data)).toContainEqual(
				expect.objectContaining({
					name,
					description,
				})
			);
		});
	});

	test('should create notification on error', async () => {
		server.use(
			http.post('/api/rooms/create', () => {
				return HttpResponse.json(
					{ message: 'Internal Error', },
					{ status: 500, statusText: 'Internal Error', }
				);
			})
		);

		createComponent();

		const nameField = findNameField();
		const descriptionField = findDescriptionField();

		await user.click(nameField);
		await user.keyboard(name);

		await user.click(descriptionField);
		await user.keyboard(description);

		const button = findSubmit();

		await user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(nameField).toHaveValue(name);
			expect(descriptionField).toHaveValue(description);
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					color: 'error',
					message: 'actions.create_room.notifications.error',
				})
			);
			expect(scope.getState(roomsModel.query.$data)).not.toContainEqual(
				expect.objectContaining({
					name,
					description,
				})
			);
		});
	});
});
