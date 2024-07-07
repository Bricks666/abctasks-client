import { render, RenderResult } from '@testing-library/react';
import { RouterProvider } from 'atomic-router-react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react';
import { beforeEach, describe, expect, test } from 'vitest';

import { popupsMap, router } from '@/shared/configs';
import { popupsModel } from '@/shared/models';
import { Menu } from '@/shared/ui';

import { RemoveRoomMenuItem } from './menu-item';

import { user } from '~/tests';

describe('features/rooms/remove-room/remove-item', () => {
	const roomId = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<Menu open anchorEl={document.body}>
						<RemoveRoomMenuItem roomId={roomId} />
					</Menu>
				</RouterProvider>
			</Provider>
		);
	};
	const findMenuitem = () =>
		wrapper.getByRole('menuitem', { name: 'actions.remove_room.name', });

	beforeEach(() => {
		scope = fork();
	});

	test('should render menu item with text and icon', () => {
		createComponent();

		expect(findMenuitem()).toMatchSnapshot();
	});

	test('should open popup on click', async () => {
		createComponent();

		const menuitem = findMenuitem();

		await user.click(menuitem);

		expect(scope.getState(popupsModel.$popups)).toContain(popupsMap.removeRoom);
	});
});
