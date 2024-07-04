/* eslint-disable import/no-extraneous-dependencies */
import {
	RenderResult,
	act,
	fireEvent,
	render,
	waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Scope, allSettled, fork } from 'effector';
import { Provider } from 'effector-react';
import { HttpResponse, http } from 'msw';
import {
	Mock,
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

import { server } from '~/tests';

describe('features/auth/logout/profile-menu', () => {
	let scope: Scope;
	let wrapper: RenderResult;

	const createComponent = (props: ProfileMenuProps = {}) => {
		wrapper = render(
			<Provider value={scope}>
				<ProfileMenu {...props} />
			</Provider>
		);
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

	beforeEach(() => {
		scope = fork();
	});

	test('should render nothing if user is not logged in', () => {
		createComponent();

		expect(document.body).toMatchSnapshot('anonymous-user');
	});

	test('should render button when menu is closed', async () => {
		createComponent();

		await loginUser();

		expect(document.body).toMatchSnapshot('closed');
	});

	test('should render button when menu is not opened', async () => {
		createComponent();

		await loginUser();

		const button = findButton();

		fireEvent.click(button);

		expect(document.body).toMatchSnapshot('opened');
	});

	describe('content', () => {
		let logSpy: Mock;

		beforeAll(() => {
			logSpy = vi.spyOn(console, 'log');
		});

		beforeEach(async () => {
			createComponent();

			await loginUser();

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

			act(() => {
				fireEvent.click(logoutButton);
			});

			await waitFor(() => {
				expect(findMenu).toThrow();
			});

			await waitFor(() => {
				expect(scope.getState(sessionModel.$user)).toBeNull();
			});
		});

		test('should do nothing on setting button click', () => {
			const settingsButton = findSettingsButton();

			act(() => {
				fireEvent.click(settingsButton);
			});

			expect(console.log).toHaveBeenCalled();
		});
	});
});
