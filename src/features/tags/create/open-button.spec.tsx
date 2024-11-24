import { beforeEach, describe, expect, test } from 'vitest';

import { getParams, popupsMap, router } from '@/shared/configs';

import { popupControls } from './model';
import { OpenCreateTagButton } from './open-button';

import {
	RenderResult,
	Scope,
	act,
	fork,
	render,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/tags/create/open-button', () => {
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<OpenCreateTagButton />, { scope, router, });
	};

	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.create_tag.actions.open', });

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ router, scope, });

		await act(async () => createComponent());
	});

	test('should render button with icon and title', async () => {
		expect(findButton).toMatchSnapshot();
	});

	test('should open popup on click', async () => {
		const button = findButton();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(router.$query)).toStrictEqual(
				expect.objectContaining({
					[getParams.popup]: popupsMap.createTag,
				})
			);
		});
	});
});
