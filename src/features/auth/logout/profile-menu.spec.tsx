/* eslint-disable import/no-extraneous-dependencies */
import {
	MockInstance,
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	test,
	vi
} from 'vitest';

import { sessionModel } from '@/shared/models';

import { ProfileMenu, ProfileMenuProps } from './profile-menu';

import {
	HttpResponse,
	RenderResult,
	Scope,
	act,
	allSettled,
	fireEvent,
	fork,
	http,
	render,
	server,
	waitFor
} from '~/test-utils';

describe('features/auth/logout/profile-menu', () => {
	let scope: Scope;
	let wrapper: RenderResult;

	const createComponent = (props: ProfileMenuProps = {}) => {
		wrapper = render(<ProfileMenu {...props} />, { scope, });
	};

	const loginUser = async () => {
		return allSettled(sessionModel.query.start, { scope, });
	};

	const findButton = () =>
		wrapper.getByRole('button', { name: 'profile_menu.title', });
	const findMenu = () => wrapper.getByRole('menu');
	const findSettingsButton = () =>
		wrapper.getByRole('menuitem', { name: 'profile_menu.items.settings', });
	const findLogoutButton = () =>
		wrapper.getByRole('menuitem', { name: 'profile_menu.items.logout', });

	beforeEach(async () => {
		scope = fork();

		await act(async () => createComponent());
	});

	test('should render nothing if user is not logged in', () => {
		expect(document.body).toMatchSnapshot('anonymous-user');
	});

	test('should render button when menu is closed', async () => {
		await act(() => loginUser());

		expect(document.body).toMatchSnapshot('closed');
	});

	test('should render button when menu is not opened', async () => {
		await act(() => loginUser());

		const button = findButton();

		fireEvent.click(button);

		expect(document.body).toMatchSnapshot('opened');
	});

	describe('content', () => {
		let logSpy: MockInstance;

		beforeAll(() => {
			logSpy = vi.spyOn(console, 'log');
		});

		beforeEach(async () => {
			await act(() => loginUser());

			const button = findButton();

			fireEvent.click(button);
		});

		afterAll(() => {
			logSpy.mockRestore();
		});

		test('should be logout after click on logout button', async () => {
			const logoutButton = findLogoutButton();

			server.use(
				http.get('/api/auth', () => {
					return HttpResponse.json({});
				})
			);

			fireEvent.click(logoutButton);

			await waitFor(() => {
				expect(findMenu).toThrow();
			});

			await waitFor(() => {
				expect(scope.getState(sessionModel.$user)).toBeNull();
			});
		});

		test('should do nothing on setting button click', () => {
			const settingsButton = findSettingsButton();

			fireEvent.click(settingsButton);

			expect(console.log).toHaveBeenCalled();
		});
	});
});
