import { fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { RemoveTaskMenuItem } from './menu-item';
import { popupControls } from './model';

import {
	createMenuProvider,
	createRootProvider,
	useCreateComponent,
	useTestRouter,
	useTestScope
} from '~/tests';

describe('features/tasks/remove-task/menu-item', () => {
	const taskId = 1;

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
	const { getWrapper, create, } = useCreateComponent({
		Component: RemoveTaskMenuItem,
		defaultProps: {
			taskId,
		},
		options: {
			wrapper: RootProvider,
		},
	});
	const findMenuItem = () =>
		getWrapper().getByRole('menuitem', {
			name: 'actions.remove_task.name',
		});

	test('should render menuitem', () => {
		create();

		expect(findMenuItem()).toMatchSnapshot();
	});

	test('should open confirmation popup on menuitem click', async () => {
		create();

		const button = findMenuItem();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(popupControls.$isOpen)).toBeTruthy();
			expect(getScope().getState(router.$query)).toStrictEqual({});
		});
	});
});
