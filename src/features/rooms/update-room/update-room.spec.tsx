import { beforeEach, describe, expect, test } from 'vitest';

import { roomsModel } from '@/entities/rooms';

import { router } from '@/shared/configs';
import { Devices, deviceInfoModel, notificationsModel } from '@/shared/models';

import { openPopup, popupControls } from './model';
import { UpdateRoom } from './update-room';

import {
	RenderResult,
	Scope,
	act,
	allSettled,
	defaultRoom,
	fork,
	handlers,
	render,
	server,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/rooms/update-room/update-room', () => {
	const { id, } = defaultRoom;
	let wrapper: RenderResult;
	let scope: Scope;

	const description = 'some description';
	const name = 'some name';

	const createComponent = () => {
		wrapper = render(<UpdateRoom isOpen />, { scope, router, });
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
		scope = fork();

		await useTestRouter({
			scope,
			router,
			options: { initialEntries: ['/rooms'], },
		});

		await allSettled(openPopup, { scope, params: id, });
		await allSettled(roomsModel.query.start, { scope, });

		await act(async () => createComponent());
	});

	test('should render popup with room form and button inside it for large screen', async () => {
		await act(() => setDeviceSize('desktop-small'));

		await waitFor(() => {
			expect(findPopup()).toBeInTheDocument();
		});

		expect(findPopup()).toMatchSnapshot('large screen');
	});

	test('should render popup with room form and button in popup footer for small screen', async () => {
		await act(() => setDeviceSize('tablet-vertical'));

		await waitFor(() => {
			expect(findPopup()).toBeInTheDocument();
		});

		expect(findPopup()).toMatchSnapshot('small screen');
	});

	test('should update room on form submit', async () => {
		const nameField = findNameField();
		const descriptionField = findDescriptionField();

		await wrapper.user.click(nameField);
		await wrapper.user.keyboard(`{Backspace>${defaultRoom.name.length}}`);
		await wrapper.user.keyboard(name);

		await wrapper.user.click(descriptionField);
		await wrapper.user.keyboard(
			`{Backspace>${defaultRoom.description.length}}`
		);
		await wrapper.user.keyboard(description);

		const button = findSubmit();

		await wrapper.user.click(button);

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
		server.use(handlers.rooms.error.update);

		const nameField = findNameField();
		const descriptionField = findDescriptionField();

		await wrapper.user.click(nameField);
		await wrapper.user.keyboard(`{Backspace>${defaultRoom.name.length}}`);
		await wrapper.user.keyboard(name);

		await wrapper.user.click(descriptionField);
		await wrapper.user.keyboard(
			`{Backspace>${defaultRoom.description.length}}`
		);
		await wrapper.user.keyboard(description);

		const button = findSubmit();

		await wrapper.user.click(button);

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
		const nameField = findNameField();
		const descriptionField = findDescriptionField();

		await wrapper.user.click(nameField);
		await wrapper.user.keyboard(name);

		await wrapper.user.click(descriptionField);
		await wrapper.user.keyboard(description);

		await act(() => allSettled(popupControls.close, { scope, }));

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(nameField).toHaveValue('');
			expect(descriptionField).toHaveValue('');
		});
	});
});
