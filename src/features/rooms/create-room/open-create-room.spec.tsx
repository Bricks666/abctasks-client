import { beforeEach, describe, expect, test } from 'vitest';

import { POPUPS_NAMES, router } from '@/shared/configs';
import { popupsModel } from '@/shared/models';

import { OpenCreateRoom } from './open-create-room';

import {
	RenderResult,
	Scope,
	act,
	fork,
	render,
	useTestRouter
} from '~/test-utils';

describe('features/rooms/create-room/open-create-room', () => {
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<OpenCreateRoom />, { scope, router, });
	};
	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.create_room.actions.open', });

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ scope, router, });
		await act(async () => createComponent());
	});

	test('should render button with icon', () => {
		expect(findButton()).toMatchSnapshot();
	});

	test('should open create room popup', async () => {
		const button = findButton();

		await wrapper.user.click(button);

		expect(scope.getState(popupsModel.$popups)).toContain(
			POPUPS_NAMES.createRoom
		);
	});
});
