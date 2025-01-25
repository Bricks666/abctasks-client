import { beforeEach, describe, expect, test } from 'vitest';

import { SEARCH_PARAMS_NAMES, POPUPS_NAMES, router } from '@/shared/configs';

import { popupControls } from './model';
import { OpenCreateTaskButton } from './open-button';

import {
	RenderResult,
	Scope,
	act,
	fork,
	render,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/tasks/create-task/open-button', () => {
	const columnStatus = 'done' as const;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<OpenCreateTaskButton columnStatus={columnStatus} />, {
			scope,
			router,
		});
	};
	const findButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.create_task.actions.open',
		});

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ scope, router, });
		await act(async () => createComponent());
	});

	test('should render button', () => {
		expect(findButton()).toMatchSnapshot();
	});

	test('should open create form popup on button click', async () => {
		const button = findButton();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(router.$query)).toStrictEqual({
				[SEARCH_PARAMS_NAMES.popup]: POPUPS_NAMES.createTask,
				[SEARCH_PARAMS_NAMES.taskStatus]: columnStatus,
			});
		});
	});
});
