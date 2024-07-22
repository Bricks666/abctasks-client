import { render, RenderResult, waitFor } from '@testing-library/react';
import { RouterProvider } from 'atomic-router-react';
import { allSettled, fork, Scope } from 'effector';
import { Provider } from 'effector-react';
import { createMemoryHistory } from 'history';
import { beforeEach, describe, expect, test } from 'vitest';

import { getParams, popupsMap, router } from '@/shared/configs';

import { popupControls } from './model';
import { OpenUpdateTagButton } from './open-button';

import { user } from '~/tests';


describe('featuers/tags/update/open-button', () => {
	const tagId = 123;

	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<OpenUpdateTagButton tagId={tagId} />
				</RouterProvider>
			</Provider>
		);
	};

	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.update_tag.actions.open', });

	beforeEach(async () => {
		scope = fork();

		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory(),
		});
	});

	test('should render button to open modal', () => {
		createComponent();

		expect(findButton()).toMatchSnapshot();
	});

	test('should open modal on click', async () => {
		createComponent();

		const button = findButton();

		await user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(router.$query)).toStrictEqual({
				[getParams.popup]: popupsMap.updateTag,
				[getParams.tagId]: tagId.toString(),
			});
		});
	});
});
