import { beforeEach, describe, expect, test } from 'vitest';

import { notificationsModel } from '@/shared/models';

import { RejectInvitationButton } from './ui';

import {
	RenderResult,
	Scope,
	act,
	fireEvent,
	fork,
	handlers,
	render,
	server,
	waitFor
} from '~/test-utils';

describe('features/invitation/reject-invitation/ui', () => {
	const id = 123;
	let scope: Scope;
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<RejectInvitationButton id={id} />, { scope, });
	};

	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.reject.actions.button', });

	beforeEach(async () => {
		scope = fork();

		await act(async () => createComponent());
	});

	test('should render button to reject', () => {
		expect(findButton()).toMatchSnapshot();
	});

	test('should reject invitation on click', async () => {
		const button = findButton();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					color: 'success',
					message: 'actions.reject.notifications.success',
				})
			);
		});
	});

	test('should create notification on failed query', async () => {
		server.use(handlers.invitations.error.reject);

		const button = findButton();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					color: 'error',
					message: 'actions.reject.notifications.error',
				})
			);
		});
	});
});
