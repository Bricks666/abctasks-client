import { beforeEach, describe, expect, test } from 'vitest';

import { popupsMap } from '@/shared/configs';
import { popupsModel } from '@/shared/models';

import { RemoveRoomMenuItem } from './menu-item';

import {
	RenderResult,
	Scope,
	act,
	createMenuProvider,
	fork,
	render
} from '~/test-utils';

describe('features/rooms/remove-room/remove-item', () => {
	const roomId = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<RemoveRoomMenuItem roomId={roomId} />, {
			scope,
			wrapper: createMenuProvider(),
		});
	};
	const findMenuitem = () =>
		wrapper.getByRole('menuitem', { name: 'actions.remove_room.name', });

	beforeEach(async () => {
		scope = fork();

		await act(async () => createComponent());
	});

	test('should render menu item with text and icon', () => {
		expect(findMenuitem()).toMatchSnapshot();
	});

	test('should open popup on click', async () => {
		const menuitem = findMenuitem();

		await wrapper.user.click(menuitem);

		expect(scope.getState(popupsModel.$popups)).toContain(popupsMap.removeRoom);
	});
});
