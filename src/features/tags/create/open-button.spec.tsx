import { render, RenderResult, waitFor } from '@testing-library/react';
import { RouterProvider } from 'atomic-router-react';
import { allSettled, fork, Scope } from 'effector';
import { Provider } from 'effector-react';
import { createMemoryHistory } from 'history';
import { beforeEach, describe, expect, test } from 'vitest';

import { getParams, popupsMap, router } from '@/shared/configs';

import { popupControls } from './model';
import { OpenCreateTagButton } from './open-button';

import { user } from '~/tests';


describe('features/tags/create/open-button', () => {
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<OpenCreateTagButton />
				</RouterProvider>
			</Provider>
		);
	};

	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.create_tag.actions.open', });

	beforeEach(async () => {
		scope = fork();
		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory(),
		});
	});

	test('should render button with icon and title', async () => {
		createComponent();

		expect(findButton).toMatchSnapshot();
	});

	test('should open popup on click', async () => {
		createComponent();

		const button = findButton();

		await user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(router.$query)).toStrictEqual(
				expect.objectContaining({
					[getParams.popup]: popupsMap.createTag,
				})
			);
		});
	});
});
