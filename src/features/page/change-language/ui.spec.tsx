import { RenderResult, render, screen, waitFor } from '@testing-library/react';
import { Scope, fork } from 'effector';
import { Provider } from 'effector-react';
import { beforeEach, describe, expect, test } from 'vitest';

import { i18nModel } from '@/shared/models';

import { ChangeLanguage } from './ui';

import { user } from '~/tests';

describe('features/page/change-language/ui', () => {
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<ChangeLanguage />
			</Provider>
		);
	};
	const findSelect = () =>
		wrapper.getByRole('combobox', { name: 'languages.label', });

	beforeEach(() => {
		scope = fork();
	});

	test('should render select to choose language', () => {
		createComponent();

		expect(findSelect()).toMatchSnapshot();
	});

	test('should change language on click on an option', async () => {
		createComponent();

		const select = findSelect();

		await user.click(select);
		await user.click(screen.getByRole('option', { name: 'languages.en', }));

		await waitFor(() => {
			expect(scope.getState(i18nModel.$language)).toBe('en');
		});
	});
});
