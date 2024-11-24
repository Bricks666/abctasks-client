import { beforeEach, describe, expect, test } from 'vitest';

import { tagsModel } from '@/entities/tags';

import { router } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';

import { ConfirmRemoveTag } from './confirm';
import { openConfirm, popupControls } from './model';

import {
	RenderResult,
	Scope,
	act,
	allSettled,
	defaultRoom,
	defaultTag,
	fireEvent,
	fork,
	handlers,
	render,
	server,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/tags/remove/confirm', () => {
	const { id: roomId, } = defaultRoom;
	const { id: tagId, } = defaultTag;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<ConfirmRemoveTag isOpen />, { scope, router, });
	};
	const findConfirm = () =>
		wrapper.getByRole('dialog', { name: 'actions.remove_tag.title', });
	const findApprove = () =>
		wrapper.getByRole('button', { name: 'actions.remove_tag.actions.agree', });
	const findDisapprove = () =>
		wrapper.getByRole('button', {
			name: 'actions.remove_tag.actions.disagree',
		});

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({
			scope,
			router,
			options: {
				initialEntries: [`/rooms/${roomId}/tags`],
			},
		});

		await allSettled(openConfirm, { scope, params: tagId, });
		await allSettled(tagsModel.query.start, { scope, params: { roomId, }, });

		await act(async () => createComponent());
	});

	test('should render confirm popup with text to remove tag', async () => {
		expect(findConfirm()).toMatchSnapshot();
	});

	test('should remove tag on approve button click', async () => {
		const button = findApprove();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.remove_tag.notifications.success',
					color: 'success',
				})
			);
			expect(scope.getState(tagsModel.query.$data)).not.toContainEqual(
				expect.objectContaining({
					id: tagId,
				})
			);
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
		});
	});

	test('should create notificaiton on error', async () => {
		server.use(handlers.tags.error.remove);

		const button = findApprove();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.remove_tag.notifications.error',
					color: 'error',
				})
			);
			expect(scope.getState(tagsModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: tagId,
				})
			);
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
		});
	});

	test('should just close confirm on close button click', async () => {
		const button = findDisapprove();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(tagsModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: tagId,
				})
			);
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
		});
	});
});
