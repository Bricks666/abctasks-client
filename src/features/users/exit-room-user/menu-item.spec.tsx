import { fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { ExitRoomUserMenuItem } from './menu-item';
import { popupControls } from './model';

import {
	createMenuProvider,
	createRootProvider,
	useCreateComponent,
	useTestRouter,
	useTestScope
} from '~/tests';


describe('features/users/exit-room-user/menu-item', () => {
	const roomId = 123;

	const testScope = useTestScope();
	const testRouter = useTestRouter();
	const MenuProvider = createMenuProvider({
		open: true,
	});
	const RootProvider = createRootProvider(
		testScope.Provider,
		testRouter.Provider,
		MenuProvider
	);
	const component = useCreateComponent({
		Component: ExitRoomUserMenuItem,
		defaultProps: {
			roomId,
		},
		options: {
			wrapper: RootProvider,
		},
	});
	const findMenuItem = () =>
		component.wrapper.getByRole('menuitem', { name: 'actions.exit_room.name', });

	test('should render button', () => {
		component.createComponent();

		expect(findMenuItem()).toMatchSnapshot();
	});

	test('should open confirm popup on button click', async () => {
		component.createComponent();

		const button = findMenuItem();

		fireEvent.click(button);

		await waitFor(() => {
			expect(testScope.scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(testScope.scope.getState(router.$query)).toStrictEqual({});
		});
	});
});
