import { beforeEach, describe, expect, test } from 'vitest';

import { i18nModel } from '@/shared/models';

import { ChangeLanguage } from './ui';

import {
	RenderResult,
	Scope,
	act,
	fork,
	render,
	screen,
	waitFor
} from '~/test-utils';

describe('features/page/change-language/ui', () => {
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<ChangeLanguage />, { scope, });
	};
	const findSelect = () =>
		wrapper.getByRole('combobox', { name: 'languages.label', });

	beforeEach(async () => {
		scope = fork();

		await act(async () => createComponent());
	});

	test('should render select to choose language', () => {
		expect(findSelect()).toMatchSnapshot();
	});

	test('should change language on click on an option', async () => {
		const select = findSelect();

		await wrapper.user.click(select);
		await wrapper.user.click(
			screen.getByRole('option', { name: 'languages.en', })
		);

		await waitFor(() => {
			expect(scope.getState(i18nModel.$language)).toBe('en');
		});
	});
});
