import { beforeEach, describe, expect, test } from 'vitest';

import { roomsModel } from '@/entities/rooms';

import { router } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';

import { ConfirmRemoveRoom } from './confirm';
import { openConfirm, popupControls } from './model';

import {
	HttpResponse,
	RenderResult,
	Scope,
	act,
	allSettled,
	fork,
	http,
	render,
	server,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/rooms/remove-room/confirm', () => {
	const roomId = 1;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<ConfirmRemoveRoom isOpen />, { scope, router, });
	};
	const findPopup = () =>
		wrapper.getByRole('dialog', { name: 'actions.remove_room.title', });
	const findAgreeButton = () =>
		wrapper.getByRole('button', { name: 'actions.remove_room.actions.agree', });
	const findDisagreeButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.remove_room.actions.disagree',
		});

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ scope, router, });
		await allSettled(openConfirm, { scope, params: roomId, });
		await allSettled(roomsModel.query.start, { scope, });
		await act(async () => createComponent());
	});

	test('should render dialog with title, text and 2 buttons', () => {
		expect(findPopup()).toMatchSnapshot();
	});

	test('should remove room on confirmation', async () => {
		const button = findAgreeButton();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(scope.getState(roomsModel.query.$data)).not.toContainEqual(
				expect.objectContaining({
					id: roomId,
				})
			);
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					color: 'success',
					message: 'actions.remove_room.notifications.success',
				})
			);
		});
	});

	test('should close dialog on error and create notification', async () => {
		server.use(
			http.delete('/api/rooms/:id/remove', () => {
				return HttpResponse.json(
					{ message: 'Forbidden', },
					{ status: 403, statusText: 'Forbidden', }
				);
			})
		);

		const button = findAgreeButton();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(scope.getState(roomsModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: roomId,
				})
			);
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					color: 'error',
					message: 'actions.remove_room.notifications.error',
				})
			);
		});
	});

	test('should just close dialog on reject button click', async () => {
		const button = findDisagreeButton();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(scope.getState(roomsModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: roomId,
				})
			);
			expect(scope.getState(notificationsModel.$items)).not.toContainEqual(
				expect.objectContaining({
					color: 'error',
					message: 'actions.remove_room.notifications.error',
				})
			);
			expect(scope.getState(notificationsModel.$items)).not.toContainEqual(
				expect.objectContaining({
					color: 'success',
					message: 'actions.remove_room.notifications.success',
				})
			);
		});
	});
});
