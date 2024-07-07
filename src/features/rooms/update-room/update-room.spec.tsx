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

import { openPopup, popupControls } from './model';
import { UpdateRoom } from './update-room';

import { server, user } from '~/tests';

describe('features/rooms/update-room/update-room', () => {
	const id = 1;
	let wrapper: RenderResult;
	let scope: Scope;

	const description = 'some description';
	const name = 'some name';

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<UpdateRoom isOpen />
				</RouterProvider>
			</Provider>
		);
	};
	const setDeviceSize = async (device: Devices) => {
		await allSettled(deviceInfoModel.$device, { scope, params: device, });
	};
	const findPopup = () =>
		wrapper.getByRole('dialog', { name: 'actions.update_room.title', });
	const findSubmit = () =>
		wrapper.getByRole('button', { name: 'actions.save', });
	const findNameField = () =>
		wrapper.getByRole('textbox', { name: 'actions.room_form.fields.name', });
	const findDescriptionField = () =>
		wrapper.getByRole('textbox', {
			name: 'actions.room_form.fields.description',
		});

	beforeEach(async () => {
		scope = fork({});

		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory({
				initialEntries: ['/rooms'],
			}),
		});
		await allSettled(openPopup, { scope, params: id, });
		allSettled(roomsModel.query.start, { scope, });
	});

	test('should render popup with room form and button inside it for large screen', async () => {
		setDeviceSize('desktop-small');

		createComponent();

		await waitFor(() => {
			expect(findPopup()).toBeInTheDocument();
		});

		expect(findPopup()).toMatchSnapshot('large screen');
	});

	test('should render popup with room form and button in popup footer for small screen', async () => {
		setDeviceSize('tablet-vertical');

		createComponent();

		await waitFor(() => {
			expect(findPopup()).toBeInTheDocument();
		});

		expect(findPopup()).toMatchSnapshot('small screen');
	});

	test('should update room on form submit', async () => {
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
					message: 'actions.update_room.notifications.success',
				})
			);
			expect(scope.getState(roomsModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id,
					name,
					description,
				})
			);
		});
	});

	test('should create notification on error', async () => {
		server.use(
			http.put('/api/rooms/:id/update', () => {
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
					message: 'actions.update_room.notifications.error',
				})
			);
			expect(scope.getState(roomsModel.query.$data)).not.toContainEqual(
				expect.objectContaining({
					id,
					name,
					description,
				})
			);
		});
	});

	test('should reset form on popup close', async () => {
		createComponent();

		const nameField = findNameField();
		const descriptionField = findDescriptionField();

		await user.click(nameField);
		await user.keyboard(name);

		await user.click(descriptionField);
		await user.keyboard(description);

		allSettled(popupControls.close, { scope, });

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(nameField).toHaveValue('');
			expect(descriptionField).toHaveValue('');
		});
	});
});
