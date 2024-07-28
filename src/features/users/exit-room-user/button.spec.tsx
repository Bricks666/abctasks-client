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

	const testScope = useTestScope();
	const testRouter = useTestRouter();
	const RootProvider = createRootProvider(
		testScope.Provider,
		testRouter.Provider
	);
	const component = useCreateComponent({
		Component: ExitRoomUserButton,
		defaultProps: {
			roomId,
		},
		options: {
			wrapper: RootProvider,
		},
	});
	const findButton = () =>
		component.wrapper.getByRole('button', { name: 'actions.exit_room.name', });

	test('should render button', () => {
		component.createComponent();

		expect(findButton()).toMatchSnapshot();
	});

	test('should open confirm popup on button click', async () => {
		component.createComponent();

		const button = findButton();

		fireEvent.click(button);

		await waitFor(() => {
			expect(testScope.scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(testScope.scope.getState(router.$query)).toStrictEqual({});
		});
	});
});
