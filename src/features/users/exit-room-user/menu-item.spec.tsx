import { beforeEach, describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { ExitRoomUserMenuItem } from './menu-item';
import { popupControls } from './model';

import {
	RenderResult,
	Scope,
	act,
	createMenuProvider,
	fork,
	render,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/users/exit-room-user/menu-item.tsx', () => {
	const roomId = 123;
	let scope: Scope;
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<ExitRoomUserMenuItem roomId={roomId} />, {
			scope,
			router,
			wrapper: createMenuProvider(),
		});
	};
	const findMenuItem = () =>
		wrapper.getByRole('menuitem', { name: 'actions.exit_room.name', });

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ scope, router, });
		await act(async () => createComponent());
	});

	test('should render button', () => {
		expect(findMenuItem()).toMatchSnapshot();
	});

	test('should open confirm popup on button click', async () => {
		const button = findMenuItem();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(router.$query)).toStrictEqual({});
		});
	});
});
