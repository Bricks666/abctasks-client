import { beforeEach, describe, expect, test } from 'vitest';

import { Devices, colorSchemeModel, deviceInfoModel } from '@/shared/models';

import { AdaptiveColorSchemeToggler } from './adaptive-color-scheme-toggler';

import {
	RenderResult,
	Scope,
	act,
	allSettled,
	fork,
	render,
	waitFor
} from '~/test-utils';

describe('features/page/color-scheme-toggler/adaptive-color-scheme', () => {
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<AdaptiveColorSchemeToggler />, { scope, });
	};

	const setDeviceSize = async (device: Devices) => {
		await allSettled(deviceInfoModel.$device, { scope, params: device, });
	};

	beforeEach(async () => {
		scope = fork();

		await act(async () => createComponent());
	});
	describe('large screen', () => {
		const findGroup = () =>
			wrapper.getByRole('group', { name: 'color_schemes.label', });
		const findButton = (scheme: string) =>
			wrapper.getByRole('button', { name: `color_schemes.schemes.${scheme}`, });

		beforeEach(async () => {
			await act(() => setDeviceSize('desktop-small'));
		});

		test('should render button group with 3 buttons', () => {
			expect(findGroup()).toMatchSnapshot('desktop scheme toggler');
		});

		test.each([
			{ chosen: 'dark', saved: 'dark', },
			{ chosen: 'system', saved: 'light', },
			{ chosen: 'light', saved: 'light', }
		])(
			'should change color scheme to $saved on $chosen button click',
			async ({ chosen, saved, }) => {
				const button = findButton(chosen);

				await wrapper.user.click(button);

				expect(scope.getState(colorSchemeModel.$scheme)).toBe(chosen);
				expect(scope.getState(colorSchemeModel.$biScheme)).toBe(saved);

				await waitFor(() => {
					expect(button).toHaveAttribute('aria-pressed', 'true');
				});
			}
		);
	});

	describe('small screen', () => {
		const findButton = () =>
			wrapper.getByRole('button', { name: 'color_schemes.activated', });

		const findMenu = () => wrapper.getByRole('menu');
		const findMenuitem = (scheme: string) =>
			wrapper.getByRole('menuitem', {
				name: `color_schemes.schemes.${scheme}`,
			});

		beforeEach(async () => {
			await act(() => setDeviceSize('mobile'));
		});

		test('should render button with icon of selected scheme when menu closed', () => {
			expect(document.body).toMatchSnapshot('mobile scheme toggler. closed');
		});

		test('should render menu with items on button click', async () => {
			const button = findButton();

			await wrapper.user.click(button);

			await waitFor(() => {
				expect(findMenu()).toBeInTheDocument();
			});

			expect(document.body).toMatchSnapshot('mobile scheme toggler. opened');
		});

		test.each([
			{ chosen: 'dark', saved: 'dark', },
			{ chosen: 'system', saved: 'light', },
			{ chosen: 'light', saved: 'light', }
		])(
			'should change color scheme to $saved on select $chosen option',
			async ({ chosen, saved, }) => {
				const button = findButton();

				await wrapper.user.click(button);

				const menuitem = findMenuitem(chosen);

				await wrapper.user.click(menuitem);

				expect(scope.getState(colorSchemeModel.$scheme)).toBe(chosen);
				expect(scope.getState(colorSchemeModel.$biScheme)).toBe(saved);
			}
		);
	});
});
