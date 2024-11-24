import { beforeEach, describe, expect, test } from 'vitest';

import { tagsModel } from '@/entities/tags';

import { router } from '@/shared/configs';
import { deviceInfoModel, notificationsModel } from '@/shared/models';

import { CreateTag } from './form';
import { popupControls } from './model';

import {
	act,
	allSettled,
	fireEvent,
	fork,
	render,
	RenderResult,
	Scope,
	useTestRouter,
	waitFor,
	server,
	handlers,
	defaultRoom
} from '~/test-utils';

describe('features/tags/create/form', () => {
	const { id: roomId, } = defaultRoom;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<CreateTag isOpen />, { scope, router, });
	};

	const findPopup = () =>
		wrapper.getByRole('dialog', { name: 'actions.create_tag.title', });
	const findNameField = () =>
		wrapper.getByRole('textbox', { name: 'actions.tag_form.fields.name', });
	const findSubmit = () =>
		wrapper.getByRole('button', { name: 'actions.create', });

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ scope, router, });

		await allSettled(deviceInfoModel.$device, {
			scope,
			params: 'desktop-small',
		});
		await allSettled(popupControls.open, { scope, });
		await allSettled(tagsModel.query.start, { scope, params: { roomId, }, });
		await act(async () => createComponent());
	});

	test('should render form in popup', async () => {
		expect(findPopup()).toMatchSnapshot('large screen');
	});

	test('should render form in fullscreen popup for small screens', async () => {
		await act(() =>
			allSettled(deviceInfoModel.$device, {
				scope,
				params: 'mobile',
			})
		);

		expect(findPopup()).toMatchSnapshot('small screen');
	});

	test('should create tag on submit', async () => {
		const nameField = findNameField();

		fireEvent.input(nameField, { target: { value: 'some name', }, });

		const button = findSubmit();

		await wrapper.user.click(button);

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
		server.use(handlers.tags.error.create);

		const nameField = findNameField();

		await wrapper.user.click(nameField);
		await wrapper.user.keyboard('some name');

		const button = findSubmit();

		await wrapper.user.click(button);

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
