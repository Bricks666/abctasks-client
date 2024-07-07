import { render, RenderResult } from '@testing-library/react';
import { RouterProvider } from 'atomic-router-react';
import { allSettled, fork, Scope } from 'effector';
import { Provider } from 'effector-react';
import { createMemoryHistory } from 'history';
import { beforeEach, describe, expect, test } from 'vitest';

import { popupsMap, router } from '@/shared/configs';
import { popupsModel } from '@/shared/models';
import { Menu } from '@/shared/ui';

import { OpenUpdateRoomFormMenuItem } from './open-form-menu-item';

import { user } from '~/tests';

describe('features/rooms/update-room/open-form-menu-item', () => {
	const roomId = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<Menu open anchorEl={document.body}>
						<OpenUpdateRoomFormMenuItem roomId={roomId} />
					</Menu>
				</RouterProvider>
			</Provider>
		);
	};
	const findMenuitem = () =>
		wrapper.getByRole('menuitem', { name: 'actions.update_room.name', });

	beforeEach(async () => {
		scope = fork();

		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory(),
		});
	});

	test('should render menu item with icon', () => {
		createComponent();

		expect(findMenuitem()).toMatchSnapshot();
	});

	test('should open update room popup', async () => {
		createComponent();

		const button = findMenuitem();

		await user.click(button);

		expect(scope.getState(popupsModel.$popups)).toContain(popupsMap.updateRoom);
	});
});
