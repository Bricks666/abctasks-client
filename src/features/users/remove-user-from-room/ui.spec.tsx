import { fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { popupControls } from './model';
import { RemoveUserFromRoom } from './ui';

import {
	createRootProvider,
	useCreateComponent,
	useTestRouter,
	useTestScope
} from '~/tests';

describe('features/users/remove-user-from-room/ui', () => {
	const userId = 123;

	const testScope = useTestScope();
	const testRouter = useTestRouter();
	const RootProvider = createRootProvider(
		testScope.Provider,
		testRouter.Provider
	);
	const component = useCreateComponent({
		Component: RemoveUserFromRoom,
		defaultProps: {
			userId,
		},
		options: {
			wrapper: RootProvider,
		},
	});

	const findButton = () =>
		component.wrapper.getByRole('button', {
			name: 'actions.remove_user.actions.open',
		});

	beforeEach(async () => {
		await testRouter.initRouter(testScope.scope);
	});

	test('should render button with icon', () => {
		component.createComponent();

		expect(findButton()).toMatchSnapshot();
	});

	test('should open popup on button click', async () => {
		component.createComponent();

		const button = findButton();

		fireEvent.click(button);

		expect(testScope.scope.getState(popupControls.$isOpen)).toBeTruthy();
		expect(testScope.scope.getState(router.$query)).toStrictEqual({});
	});
});
