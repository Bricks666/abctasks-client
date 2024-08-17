import { beforeEach, describe, expect, test } from 'vitest';

import { notificationsModel } from '@/shared/models';

import { ApproveInvitationButton } from './ui';

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

describe('features/invitation/approve-invitation/ui', () => {
	const id = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	beforeEach(async () => {
		scope = fork();

		await act(async () => createComponent());
	});

	const createComponent = () => {
		wrapper = render(<ApproveInvitationButton id={id} />, { scope, });
	};
	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.approve.actions.button', });

	test('should render button with right text', () => {
		expect(findButton()).toMatchSnapshot();
	});

	test('should approve invitation on click', async () => {
		const button = findButton();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.approve.notifications.success',
					color: 'success',
				})
			);
		});
	});

	test('should create notification on failed query', async () => {
		server.use(handlers.invitations.error.approve);

		const button = findButton();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					message: 'actions.approve.notifications.error',
					color: 'error',
				})
			);
		});
	});
});
