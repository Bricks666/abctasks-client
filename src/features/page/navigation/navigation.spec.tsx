import { beforeEach, describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { Navigation } from './navigation';

import {
	RenderResult,
	Scope,
	act,
	fork,
	render,
	useTestRouter
} from '~/test-utils';

describe('features/page/navigation/navigation', () => {
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<Navigation />, { scope, router, });
	};

	const findNavigation = () => wrapper.getByRole('navigation');
	const findRoomsLink = () =>
		wrapper.getByRole('link', { name: 'navigation.items.rooms', });

	beforeEach(async () => {
		scope = fork();
		await useTestRouter({ scope, router, });

		await act(async () => createComponent());
	});

	test('should render navigation with links', () => {
		expect(findNavigation()).toMatchSnapshot();
	});

	describe('links', () => {
		test('rooms page link', async () => {
			const link = findRoomsLink();

			await wrapper.user.click(link);

			expect(scope.getState(router.$path)).toBe('/rooms');
		});
	});
});
