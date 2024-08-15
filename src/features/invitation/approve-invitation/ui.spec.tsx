import {
	RenderResult,
	fireEvent,
	render,
	waitFor
} from '@testing-library/react';
import { Scope, fork } from 'effector';
import { Provider } from 'effector-react';
import { HttpResponse, http } from 'msw';
import { beforeEach, describe, expect, test } from 'vitest';

import { notificationsModel } from '@/shared/models';

import { ApproveInvitationButton } from './ui';

import { server } from '~/test-utils';

describe('features/invitation/approve-invitation/ui', () => {
	const id = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	beforeEach(() => {
		scope = fork();
	});

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<ApproveInvitationButton id={id} />
			</Provider>
		);
	};
	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.approve.actions.button', });

	test('should render button with right text', () => {
		createComponent();

		expect(findButton()).toMatchSnapshot();
	});

	test('should approve invitation on click', async () => {
		createComponent();

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
		server.use(
			http.put('/api/invitations/invite/approve', () =>
				HttpResponse.json(
					{
						message: 'Not Found',
					},
					{ status: 404, statusText: 'Not Found', }
				)
			)
		);

		createComponent();

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
