import { RenderResult, render, waitFor } from '@testing-library/react';
import { Scope, fork } from 'effector';
import { Provider } from 'effector-react';
import { beforeEach, describe, expect, test } from 'vitest';

import { notificationsModel } from '@/shared/models';

import { GenerateInvitationLink } from './generate-invitation-link';

import { user } from '~/tests';

describe('features/invitation/generate-invitation-link/generate-invitation-link', () => {
	const roomId = 123;

	/**
	 * See value in mocked handlers
	 */
	const link = 'https://localhost:3000/invitation-link-to-room-123';
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<GenerateInvitationLink roomId={roomId} />
			</Provider>
		);
	};
	const findForm = () =>
		wrapper.getByRole('form', { name: 'actions.generate_link.title', });
	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.generate_link.actions.copy', });
	const findField = () =>
		wrapper.getByRole('textbox', {
			name: 'actions.generate_link.fields.link',
		});

	beforeEach(() => {
		scope = fork();
	});

	test('should render form, input with link and button to copy', async () => {
		createComponent();

		const field = findField();

		await waitFor(() => {
			expect(field).toHaveValue(link);
		});

		expect(findForm()).toMatchSnapshot();
	});

	test('should copy url into clipboard on click', async () => {
		createComponent();

		const field = findField();

		await waitFor(() => {
			expect(field).toHaveValue(link);
		});

		const button = findButton();
		await user.click(button);

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
		createComponent();

		const field = findField();

		await waitFor(() => {
			expect(field).toHaveValue(link);
		});

		await user.pointer([
			{
				target: field,
				offset: 0,
				keys: '[MouseLeft>]',
			},
			{
				offset: link.length,
			}
		]);
		await user.copy();

		await waitFor(async () => {
			const value = await window.navigator.clipboard.readText();
			expect(value).toBe(link);
		});
	});
});
