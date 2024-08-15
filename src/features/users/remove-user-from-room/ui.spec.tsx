import { beforeEach, describe, expect, test } from 'vitest';


import { router } from '@/shared/configs';

import { popupControls } from './model';
import { RemoveUserFromRoom } from './ui';

import {
	RenderResult,
	Scope,
	act,
	fork,
	render,
	useTestRouter
} from '~/test-utils';

describe('features/users/remove-user-from-room/ui', () => {
	let scope: Scope;
	let wrapper: RenderResult;
	const userId = 123;

	const createComponent = () => {
		wrapper = render(<RemoveUserFromRoom userId={userId} />, {
			scope,
			router,
		});
	};

	const findButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.remove_user.actions.open',
		});

	beforeEach(async () => {
		scope = fork();
		await useTestRouter({ scope, router, });

		await act(() => createComponent());
	});

	test('should render button with icon', () => {
		expect(findButton()).toMatchSnapshot();
	});

	test('should open popup on button click', async () => {
		const button = findButton();

		await wrapper.user.click(button);

		expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
		expect(scope.getState(router.$query)).toStrictEqual({});
	});
});
