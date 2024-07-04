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

import { RejectInvitationButton } from './ui';

import { server } from '~/tests';

describe('features/invitation/reject-invitation/ui', () => {
	const id = 123;
	let scope: Scope;
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RejectInvitationButton id={id} />
			</Provider>
		);
	};

	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.reject.actions.button', });

	beforeEach(() => {
		scope = fork();
	});

	test('should render button to reject', () => {
		createComponent();

		expect(findButton()).toMatchSnapshot();
	});

	test('should reject invitation on click', async () => {
		createComponent();

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
		server.use(
			http.put('/api/invitations/invite/reject', () => {
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
