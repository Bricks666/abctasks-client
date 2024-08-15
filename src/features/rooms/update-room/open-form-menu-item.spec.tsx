import { beforeEach, describe, expect, test } from 'vitest';

import { popupsMap, router } from '@/shared/configs';
import { popupsModel } from '@/shared/models';

import { OpenUpdateRoomFormMenuItem } from './open-form-menu-item';

import {
	RenderResult,
	Scope,
	act,
	createMenuProvider,
	fork,
	render,
	useTestRouter
} from '~/test-utils';

describe('features/rooms/update-room/open-form-menu-item', () => {
	const roomId = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<OpenUpdateRoomFormMenuItem roomId={roomId} />, {
			scope,
			router,
			wrapper: createMenuProvider(),
		});
	};
	const findMenuitem = () =>
		wrapper.getByRole('menuitem', { name: 'actions.update_room.name', });

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ scope, router, });
		await act(async () => createComponent());
	});

	test('should render menu item with icon', () => {
		expect(findMenuitem()).toMatchSnapshot();
	});

	test('should open update room popup', async () => {
		const button = findMenuitem();

		await wrapper.user.click(button);

		expect(scope.getState(popupsModel.$popups)).toContain(popupsMap.updateRoom);
	});
});
