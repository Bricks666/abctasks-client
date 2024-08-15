import { beforeEach, describe, expect, test } from 'vitest';

import { tagModel, tagsModel } from '@/entities/tags';

import { getParams, popupsMap, router } from '@/shared/configs';
import { deviceInfoModel, notificationsModel } from '@/shared/models';

import { openPopup, popupControls } from './model';
import { UpdateTag } from './ui';

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

describe('features/tags/update/ui', () => {
	const tagId = 1;
	const roomId = 1;

	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<UpdateTag isOpen />, { scope, router, });
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

		await useTestRouter({
			scope,
			router,
			options: { initialEntries: [`/room/${roomId}/tags`], },
		});

		await allSettled(deviceInfoModel.$device, {
			scope,
			params: 'desktop-small',
		});
		await allSettled(openPopup, { scope, params: tagId, });
		await allSettled(tagsModel.query.start, { scope, params: { roomId, }, });

		await act(async () => createComponent());
	});

	test('should render form in popup with predefined data', () => {
		expect(findForm()).toBeInTheDocument();
		expect(findPopup()).toMatchSnapshot('large screen');
	});

	test('should render fullscreen popup for small screen', async () => {
		await act(() =>
			allSettled(deviceInfoModel.$device, { scope, params: 'mobile', })
		);

		expect(findForm()).toBeInTheDocument();
		expect(findPopup()).toMatchSnapshot('small screen');
	});

	test('should render skeleton while data is loading', async () => {
		await act(() =>
			allSettled(tagModel.query.start, {
				scope,
				params: {
					id: 5,
					roomId,
				},
			})
		);

		expect(findForm).toThrow();
		expect(findPopup()).toMatchSnapshot('loading');
	});

	test('should update tag on submit', async () => {
		await waitFor(() => {
			expect(findForm()).toBeInTheDocument();
		});

		const nameField = findNameField();

		await wrapper.user.click(nameField);
		await wrapper.user.keyboard('another name');

		const button = findSubmit();

		await wrapper.user.click(button);

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

		await waitFor(() => {
			expect(findForm()).toBeInTheDocument();
		});

		const button = findSubmit();

		await wrapper.user.click(button);

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
		await waitFor(() => {
			expect(findForm()).toBeInTheDocument();
		});

		const button = findClose();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeFalsy();
		});
	});
});
