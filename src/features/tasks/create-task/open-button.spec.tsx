import { fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { getParams, popupsMap, router } from '@/shared/configs';

import { popupControls } from './model';
import { OpenCreateTaskButton } from './open-button';

import {
	createRootProvider,
	useCreateComponent,
	useTestRouter,
	useTestScope
} from '~/tests';

describe('features/tasks/create-task/open-button', () => {
	const columnStatus = 'done' as const;

	const { Provider: ScopeProvider, getScope, } = useTestScope();
	const { Provider: RouterProvider, } = useTestRouter({ getScope, router, });
	const RootProvider = createRootProvider(ScopeProvider, RouterProvider);
	const { getWrapper, create, } = useCreateComponent({
		Component: OpenCreateTaskButton,
		defaultProps: {
			columnStatus,
		},
		options: {
			wrapper: RootProvider,
		},
	});
	const findButton = () =>
		getWrapper().getByRole('button', {
			name: 'actions.create_task.actions.open',
		});

	test('should render button', () => {
		create();

		expect(findButton()).toMatchSnapshot();
	});

	test('should open create form popup on button click', async () => {
		create();

		const button = findButton();

		fireEvent.click(button);

		await waitFor(() => {
			expect(getScope().getState(popupControls.$isOpen)).toBeTruthy();
			expect(getScope().getState(router.$query)).toStrictEqual({
				[getParams.popup]: popupsMap.createTask,
				[getParams.taskStatus]: columnStatus,
			});
		});
	});
});
