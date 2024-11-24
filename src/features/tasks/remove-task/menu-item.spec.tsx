import { beforeEach, describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { RemoveTaskMenuItem } from './menu-item';
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

describe('features/tasks/remove-task/menu-item', () => {
	let scope: Scope;
	let wrapper: RenderResult;
	const taskId = 1;

	const createComponent = () => {
		wrapper = render(<RemoveTaskMenuItem taskId={taskId} />, {
			scope,
			router,
			wrapper: createMenuProvider(),
		});
	};
	const findMenuItem = () =>
		wrapper.getByRole('menuitem', {
			name: 'actions.remove_task.name',
		});

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ scope, router, });
		await act(async () => createComponent());
	});

	test('should render menuitem', () => {
		expect(findMenuItem()).toMatchSnapshot();
	});

	test('should open confirmation popup on menuitem click', async () => {
		const button = findMenuItem();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(router.$query)).toStrictEqual({});
		});
	});
});
