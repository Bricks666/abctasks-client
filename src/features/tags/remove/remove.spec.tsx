import {
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react';
import { RouterProvider } from 'atomic-router-react';
import { allSettled, fork, Scope } from 'effector';
import { Provider } from 'effector-react';
import { createMemoryHistory } from 'history';
import { beforeEach, describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { popupControls } from './model';
import { RemoveTag } from './remove';

describe('features/tags/remove/remove', () => {
	const tagId = 1;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<RemoveTag tagId={tagId} />
				</RouterProvider>
			</Provider>
		);
	};
	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.remove_tag.actions.open', });

	beforeEach(async () => {
		scope = fork();

		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory(),
		});
	});

	test('should render button with icon and title', async () => {
		createComponent();

		expect(findButton()).toMatchSnapshot();
	});

	test('should open confirm on click', async () => {
		createComponent();

		const button = findButton();

		fireEvent.click(button);

		await waitFor(() => {
			expect(scope.getState(router.$query)).toStrictEqual({});
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
		});
	});
});
