import { fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { ExitRoomUserButton } from './button';
import { popupControls } from './model';

import {
	createRootProvider,
	useCreateComponent,
	useTestRouter,
	useTestScope
} from '~/tests';

describe('features/users/exit-room-user/button', () => {
	const roomId = 123;

	const { Provider: ScopeProvider, getScope, } = useTestScope();
	const { Provider: RouterProvider, } = useTestRouter({ getScope, router, });
	const RootProvider = createRootProvider(ScopeProvider, RouterProvider);
	const { getWrapper, create, } = useCreateComponent({
		Component: ExitRoomUserButton,
		defaultProps: {
			roomId,
		},
		options: {
			wrapper: RootProvider,
		},
	});
	const findButton = () =>
		getWrapper().getByRole('button', { name: 'actions.exit_room.name', });

	test('should render button', () => {
		create();

		expect(findButton()).toMatchSnapshot();
	});

	test('should open confirm popup on button click', async () => {
		create();

		const button = findButton();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(popupControls.$isOpen)).toBeTruthy();
			expect(getScope().getState(router.$query)).toStrictEqual({});
		});
	});
});
