import { describe, expect, test } from 'vitest';

import {
	RenderResult,
	act,
	handlers,
	render,
	server,
	waitFor
} from '~/test-utils';

import { LogoutButton } from './logout-button';

describe('features/auth/logout/ui/logout-button/logout-button.tsx', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<LogoutButton className='classname' />);
	};

	const findLogoutButton = () =>
		wrapper.getByRole('button', { name: 'profile_menu.items.logout', });

	test('should render logout button', async () => {
		await act(async () => createComponent());

		expect(findLogoutButton()).toMatchSnapshot('button');
	});

	test('should be logout after click on logout button', async () => {
		await act(async () => createComponent());

		server.use(handlers.auth.error.auth);

		await wrapper.user.click(findLogoutButton());

		await waitFor(() => {
			// Check if the session were ended
		});
	});
});
