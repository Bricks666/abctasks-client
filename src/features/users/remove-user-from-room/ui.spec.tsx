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

	const { Provider: ScopeProvider, getScope, } = useTestScope();
	const { Provider: RouterProvider, } = useTestRouter({ getScope, router, });
	const RootProvider = createRootProvider(ScopeProvider, RouterProvider);
	const { getWrapper, create, } = useCreateComponent({
		Component: RemoveUserFromRoom,
		defaultProps: {
			userId,
		},
		options: {
			wrapper: RootProvider,
		},
	});

	const findButton = () =>
		getWrapper().getByRole('button', {
			name: 'actions.remove_user.actions.open',
		});

	beforeEach(async () => {});

	test('should render button with icon', () => {
		create();

		expect(findButton()).toMatchSnapshot();
	});

	test('should open popup on button click', async () => {
		create();

		const button = findButton();

		fireEvent.click(button);

		expect(getScope().getState(popupControls.$isOpen)).toBeTruthy();
		expect(getScope().getState(router.$query)).toStrictEqual({});
	});
});
