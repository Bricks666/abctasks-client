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

import { router } from '@/shared/configs';
import { deviceInfoModel, notificationsModel } from '@/shared/models';

import { CreateTag } from './form';
import { popupControls } from './model';



import { server, user } from '~/tests';


describe('features/tags/create/form', () => {
	const roomId = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<CreateTag isOpen />
				</RouterProvider>
			</Provider>
		);
	};

	const findPopup = () =>
		wrapper.getByRole('dialog', { name: 'actions.create_tag.title', });
	const findNameField = () =>
		wrapper.getByRole('textbox', { name: 'actions.tag_form.fields.name', });
	const findSubmit = () =>
		wrapper.getByRole('button', { name: 'actions.create', });

	beforeEach(async () => {
		scope = fork();

		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory(),
		});
		await allSettled(deviceInfoModel.$device, {
			scope,
			params: 'desktop-small',
		});
		await allSettled(popupControls.open, { scope, });
		await allSettled(tagsModel.query.start, { scope, params: { roomId, }, });
	});

	test('should render form in popup', async () => {
		createComponent();

		expect(findPopup()).toMatchSnapshot('large screen');
	});

	test('should render form in fullscreen popup for small screens', async () => {
		await allSettled(deviceInfoModel.$device, {
			scope,
			params: 'mobile',
		});

		createComponent();

		expect(findPopup()).toMatchSnapshot('small screen');
	});

	test('should create tag on submit', async () => {
		createComponent();

		const nameField = findNameField();

		fireEvent.input(nameField, { target: { value: 'some name', }, });

		const button = findSubmit();

		await user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.create_tag.notifications.success',
					color: 'success',
				})
			);
			expect(scope.getState(tagsModel.query.$data)).toContainEqual(
				expect.objectContaining({
					name: 'some name',
					mainColor: '#ffffff',
					secondColor: '#000000',
				})
			);
		});

		expect(findPopup()).toMatchSnapshot('small screen');
	});

	test('should create error notification on error', async () => {
		server.use(
			http.post('/api/tags/:roomId/create', () => {
				return HttpResponse.json(
					{
						message: 'Server Error',
					},
					{
						status: 500,
						statusText: 'Internal Error',
					}
				);
			})
		);

		createComponent();

		const nameField = findNameField();

		await user.click(nameField);
		await user.keyboard('some name');

		const button = findSubmit();

		await user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.create_tag.notifications.error',
					color: 'error',
				})
			);
			expect(scope.getState(tagsModel.query.$data)).not.toContainEqual(
				expect.objectContaining({
					name: 'some name',
					mainColor: '#ffffff',
					secondColor: '#000000',
				})
			);
		});
	});
});
