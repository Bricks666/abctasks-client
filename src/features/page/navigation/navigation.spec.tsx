import { RenderResult, render } from '@testing-library/react';
import { RouterProvider } from 'atomic-router-react';
import { Scope, allSettled, fork } from 'effector';
import { Provider } from 'effector-react';
import { createMemoryHistory } from 'history';
import { beforeEach, describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { Navigation } from './navigation';

import { user } from '~/tests';

describe('features/page/navigation/navigation', () => {
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<Navigation />
				</RouterProvider>
			</Provider>
		);
	};

	const findNavigation = () => wrapper.getByRole('navigation');
	const findRoomsLink = () =>
		wrapper.getByRole('link', { name: 'navigation.items.rooms', });

	beforeEach(async () => {
		scope = fork();
		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory(),
		});
	});

	test('should render navigation with links', () => {
		createComponent();

		expect(findNavigation()).toMatchSnapshot();
	});

	describe('links', () => {
		test('rooms page link', async () => {
			createComponent();

			const link = findRoomsLink();

			await user.click(link);

			expect(scope.getState(router.$path)).toBe('/rooms');
		});
	});
});
