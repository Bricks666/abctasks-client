import { render, RenderResult } from '@testing-library/react';
import { RouterProvider } from 'atomic-router-react';
import { allSettled, fork, Scope } from 'effector';
import { Provider } from 'effector-react';
import { createMemoryHistory } from 'history';
import { beforeEach, describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { OpenRoom } from './open-room';

import { user } from '~/tests';

describe('features/rooms/open-room/open-room', () => {
	const id = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<OpenRoom id={id} />
				</RouterProvider>
			</Provider>
		);
	};
	const findLink = () => wrapper.getByRole('link', { name: 'actions.open', });

	beforeEach(async () => {
		scope = fork();

		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory(),
		});
	});

	test('should render link with button styles', () => {
		createComponent();

		expect(findLink()).toMatchSnapshot();
	});

	test('should navigate to room page', async () => {
		createComponent();

		const link = findLink();

		await user.click(link);

		expect(scope.getState(router.$path)).toBe(`/rooms/${id}/tasks`);
	});
});
