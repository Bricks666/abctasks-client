import { RenderResult, render, screen, waitFor } from '@testing-library/react';
import { Scope, fork } from 'effector';
import { Provider } from 'effector-react';
import { beforeEach, describe, expect, test } from 'vitest';

import { invitationsModel } from '@/entities/invitations';

import { notificationsModel } from '@/shared/models';

import { InviteUserIntoRoom } from './invite-user-into-room';

import { user } from '~/tests';

describe('features/invitation/invite-user-into-room/invite-user-into-room', () => {
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<InviteUserIntoRoom />
			</Provider>
		);
	};
	const selectUser = async () => {
		const search = findUserSearch();
		await user.click(search);
		await user.keyboard('username');

		await waitFor(() => {
			expect(screen.getByRole('option')).toBeInTheDocument();
		});

		const option = screen.getByRole('option');

		await user.click(option);
	};
	const findForm = () =>
		wrapper.getByRole('form', { name: 'actions.invite_user.title', });
	const findUserSearch = () =>
		wrapper.getByRole('combobox', { name: 'actions.invite_user.fields.user', });
	const findInviteButton = () =>
		wrapper.getByRole('button', { name: 'actions.invite_user.actions.submit', });
	const findClearButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.invite_user.actions.remove-selection',
		});
	const findSelectedUser = () => wrapper.getByRole('listitem');

	beforeEach(() => {
		scope = fork();
	});

	test('should render form with user-selection and button', () => {
		createComponent();

		expect(findForm()).toMatchSnapshot('empty selection');
	});

	test('should render form with user and button to remove it', async () => {
		createComponent();

		await selectUser();

		expect(findForm()).toMatchSnapshot('selected user');
	});

	test('should select user to invite', async () => {
		createComponent();

		await selectUser();

		expect(findSelectedUser()).toBeInTheDocument();

		const button = findInviteButton();

		await user.click(button);

		await waitFor(() => {
			expect(scope.getState(notificationsModel.$items)).toContainEqual(
				expect.objectContaining({
					color: 'success',
					message: 'actions.invite_user.notifications.success',
				})
			);
			expect(scope.getState(invitationsModel.query.$data)).toContainEqual(
				expect.any(Object)
			);
		});
	});

	test('should clear selected user on close button click', async () => {
		createComponent();

		await selectUser();

		const selectedUser = findSelectedUser();

		const button = findClearButton();

		await user.click(button);

		await waitFor(() => {
			expect(selectedUser).not.toBeInTheDocument();
			expect(findUserSearch()).toBeInTheDocument();
			expect(findInviteButton()).toHaveAttribute('disabled', '');
		});
	});
});
