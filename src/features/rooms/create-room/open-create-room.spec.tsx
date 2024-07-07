import { render, RenderResult } from '@testing-library/react';
import { RouterProvider } from 'atomic-router-react';
import { allSettled, fork, Scope } from 'effector';
import { Provider } from 'effector-react';
import { createMemoryHistory } from 'history';
import { beforeEach, describe, expect, test } from 'vitest';

import { popupsMap, router } from '@/shared/configs';
import { popupsModel } from '@/shared/models';

import { OpenCreateRoom } from './open-create-room';

import { user } from '~/tests';


describe('features/rooms/create-room/open-create-room', () => {
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<OpenCreateRoom />
				</RouterProvider>
			</Provider>
		);
	};
	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.create_room.actions.open', });

	beforeEach(async () => {
		scope = fork();

		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory(),
		});
	});

	test('should render button with icon', () => {
		createComponent();

		expect(findButton()).toMatchSnapshot();
	});

	test('should open create room popup', async () => {
		createComponent();

		const button = findButton();

		await user.click(button);

		expect(scope.getState(popupsModel.$popups)).toContain(popupsMap.createRoom);
	});
});
