import { render, RenderResult, waitFor } from '@testing-library/react';
import { RouterProvider } from 'atomic-router-react';
import { allSettled, fork, Scope } from 'effector';
import { Provider } from 'effector-react';
import { createMemoryHistory } from 'history';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, test } from 'vitest';

import { tagModel, tagsModel } from '@/entities/tags';

import { getParams, popupsMap, router, routes } from '@/shared/configs';
import { deviceInfoModel, notificationsModel } from '@/shared/models';

import { openPopup, popupControls } from './model';
import { UpdateTag } from './ui';

import { server, user } from '~/tests';

describe('features/tags/update/ui', () => {
	const tagId = 1;
	const roomId = 1;

	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<UpdateTag isOpen />
				</RouterProvider>
			</Provider>
		);
	};
	const findPopup = () =>
		wrapper.getByRole('dialog', { name: 'actions.update_tag.title', });
	const findForm = () =>
		wrapper.getByRole('form', { name: 'actions.update_tag.title', });
	const findNameField = () =>
		wrapper.getByRole('textbox', { name: 'actions.tag_form.fields.name', });
	const findSubmit = () =>
		wrapper.getByRole('button', { name: 'actions.save', });
	const findClose = () =>
		wrapper.getByRole('button', { name: 'actions.close', });

	beforeEach(async () => {
		scope = fork();

		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory(),
		});
		await allSettled(routes.room.tags.open, {
			scope,
			params: { id: roomId, },
		});
		await allSettled(deviceInfoModel.$device, {
			scope,
			params: 'desktop-small',
		});
		await allSettled(openPopup, { scope, params: tagId, });
		await allSettled(tagsModel.query.start, { scope, params: { roomId, }, });
	});

	test('should render form in popup with predefined data', () => {
		createComponent();

		expect(findForm()).toBeInTheDocument();
		expect(findPopup()).toMatchSnapshot('large screen');
	});

	test('should render fullscreen popup for small screen', async () => {
		await allSettled(deviceInfoModel.$device, { scope, params: 'mobile', });
		createComponent();

		expect(findForm()).toBeInTheDocument();
		expect(findPopup()).toMatchSnapshot('small screen');
	});

	test('should render skeleton while data is loading', async () => {
		await allSettled(tagModel.query.start, {
			scope,
			params: {
				id: 5,
				roomId,
			},
		});
		createComponent();

		expect(findForm).toThrow();
		expect(findPopup()).toMatchSnapshot('loading');
	});

	test('should update tag on submit', async () => {
		createComponent();

		await waitFor(() => {
			expect(findForm()).toBeInTheDocument();
		});

		const nameField = findNameField();

		await user.click(nameField);
		await user.keyboard('another name');

		const button = findSubmit();

		await user.click(button);

		await waitFor(() => {
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.update_tag.notifications.success',
					color: 'success',
				})
			);
			expect(scope.getState(tagsModel.query.$data)).toContainEqual({
				id: tagId,
				roomId,
				name: 'A taganother name',
				mainColor: '#123321',
				secondColor: '#564701',
			});
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(scope.getState(router.$query)).not.toContainEqual(
				expect.objectContaining({
					[getParams.tagId]: tagId,
					[getParams.popup]: popupsMap.updateTag,
				})
			);
		});
	});

	test('should create notification on error', async () => {
		server.use(
			http.put('/api/tags/:roomId/:id/update', () => {
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

		await waitFor(() => {
			expect(findForm()).toBeInTheDocument();
		});

		const button = findSubmit();

		await user.click(button);

		await waitFor(() => {
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.update_tag.notifications.error',
					color: 'error',
				})
			);
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
		});
	});

	test('should just close popup on close button click', async () => {
		createComponent();

		await waitFor(() => {
			expect(findForm()).toBeInTheDocument();
		});

		const button = findClose();

		await user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
		});
	});
});
