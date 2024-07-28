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

	const { Provider: ScopeProvider, getScope, } = useTestScope();
	const { Provider: RouterProvider, } = useTestRouter({ getScope, router, });
	const MenuProvider = createMenuProvider({
		open: true,
	});
	const RootProvider = createRootProvider(
		ScopeProvider,
		RouterProvider,
		MenuProvider
	);
	const { create, getWrapper, } = useCreateComponent({
		Component: ExitRoomUserMenuItem,
		defaultProps: {
			roomId,
		},
		options: {
			wrapper: RootProvider,
		},
	});
	const findMenuItem = () =>
		getWrapper().getByRole('menuitem', { name: 'actions.exit_room.name', });

	test('should render button', () => {
		create();

		expect(findMenuItem()).toMatchSnapshot();
	});

	test('should open confirm popup on button click', async () => {
		create();

		const button = findMenuItem();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(popupControls.$isOpen)).toBeTruthy();
			expect(getScope().getState(router.$query)).toStrictEqual({});
		});
	});
});
