import { beforeEach, describe, expect, test } from 'vitest';

import { getParams, popupsMap, router } from '@/shared/configs';

import { popupControls } from './model';
import { OpenUpdateTagButton } from './open-button';

import {
	RenderResult,
	Scope,
	act,
	fork,
	render,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('featuers/tags/update/open-button', () => {
	const tagId = 123;

	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<OpenUpdateTagButton tagId={tagId} />, { scope, router, });
	};

	const findButton = () =>
		wrapper.getByRole('button', { name: 'actions.update_tag.actions.open', });

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ router, scope, });

		await act(async () => createComponent());
	});

	test('should render button to open modal', () => {
		expect(findButton()).toMatchSnapshot();
	});

	test('should open modal on click', async () => {
		const button = findButton();

		await wrapper.user.click(button);

		await waitFor(() => {
			expect(scope.getState(popupControls.$isOpen)).toBeTruthy();
			expect(scope.getState(router.$query)).toStrictEqual({
				[getParams.popup]: popupsMap.updateTag,
				[getParams.tagId]: tagId.toString(),
			});
		});
	});
});
