import {
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react';
import { RouterProvider } from 'atomic-router-react';
import { allSettled, fork, Scope } from 'effector';
import { Provider } from 'effector-react';
import { createMemoryHistory } from 'history';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, test } from 'vitest';

import { tagsModel } from '@/entities/tags';

import { router, routes } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';

import { ConfirmRemoveTag } from './confirm';
import { openConfirm, popupControls } from './model';

import { server } from '~/test-utils';

describe('features/tags/remove/confirm', () => {
	const roomId = 123;
	const tagId = 1;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<ConfirmRemoveTag isOpen />
				</RouterProvider>
			</Provider>
		);
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

		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory(),
		});
		await allSettled(routes.room.tags.open, { scope, params: { id: roomId, }, });
		await allSettled(openConfirm, { scope, params: tagId, });
		await allSettled(tagsModel.query.start, { scope, params: { roomId, }, });
	});

	test('should render confirm popup with text to remove tag', async () => {
		createComponent();

		expect(findConfirm()).toMatchSnapshot();
	});

	test('should remove tag on approve button click', async () => {
		createComponent();
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
					id: 1,
				})
			);
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
		});
	});

	test('should create notificaiton on error', async () => {
		server.use(
			http.delete('/api/tags/:roomId/:id/remove', () => {
				return HttpResponse.json(
					{
						message: 'Not Found',
					},
					{
						status: 404,
						statusText: 'Not Found',
					}
				);
			})
		);

		createComponent();
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
					id: 1,
				})
			);
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
		});
	});

	test('should just close confirm on close button click', async () => {
		createComponent();
		const button = findDisapprove();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(tagsModel.query.$data)).toContainEqual(
				expect.objectContaining({
					id: 1,
				})
			);
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
		});
	});
});
