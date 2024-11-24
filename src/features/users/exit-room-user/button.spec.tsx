import { beforeEach, describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { ExitRoomUserButton } from './button';
import { popupControls } from './model';

import {
	RenderResult,
	Scope,
	act,
	fork,
	render,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/users/exit-room-user/button', () => {
	const roomId = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<ExitRoomUserButton roomId={roomId} />, { scope, router, });
	};
	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.exit_room.name', });

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ scope, router, });
		await act(async () => createComponent());
	});

	test('should render button', () => {
		expect(findButton()).toMatchSnapshot();
	});

	test('should open confirm popup on button click', async () => {
		const button = findButton();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(router.$query)).toStrictEqual({});
		});
	});
});
