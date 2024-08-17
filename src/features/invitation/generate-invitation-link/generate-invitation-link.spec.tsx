import { beforeEach, describe, expect, test } from 'vitest';

import { notificationsModel } from '@/shared/models';

import { GenerateInvitationLink } from './generate-invitation-link';

import {
	RenderResult,
	Scope,
	act,
	createInvitationLink,
	defaultRoom,
	fork,
	render,
	waitFor
} from '~/test-utils';

describe('features/invitation/generate-invitation-link/generate-invitation-link', () => {
	const { id: roomId, } = defaultRoom;
	const link = createInvitationLink(roomId);
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<GenerateInvitationLink roomId={roomId} />, { scope, });
	};
	const findForm = () =>
		wrapper.getByRole('form', { name: 'actions.generate_link.title', });
	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.generate_link.actions.copy', });
	const findField = () =>
		wrapper.getByRole('textbox', {
			name: 'actions.generate_link.fields.link',
		});

	beforeEach(async () => {
		scope = fork();

		await act(async () => createComponent());
	});

	test('should render form, input with link and button to copy', async () => {
		const field = findField();

		await waitFor(() => {
			expect(field).toHaveValue(link);
		});

		expect(findForm()).toMatchSnapshot();
	});

	test('should copy url into clipboard on click', async () => {
		const field = findField();

		await waitFor(() => {
			expect(field).toHaveValue(link);
		});

		const button = findButton();
		await wrapper.user.click(button);

		await waitFor(async () => {
			const value = await window.navigator.clipboard.readText();
			expect(value).toBe(link);
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					color: 'info',
					message: 'actions.generate_link.notifications.success',
				})
			);
		});
	});

	test('should be able to select link in input and copy via keyboard', async () => {
		const field = findField();

		await waitFor(() => {
			expect(field).toHaveValue(link);
		});

		await wrapper.user.pointer([
			{
				target: field,
				offset: 0,
				keys: '[MouseLeft>]',
			},
			{
				offset: link.length,
			}
		]);
		await wrapper.user.copy();

		await waitFor(async () => {
			const value = await window.navigator.clipboard.readText();
			expect(value).toBe(link);
		});
	});
});
