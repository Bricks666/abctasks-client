import { describe, expect, test } from 'vitest';

import { PasswordField } from './password-field';

import { render, RenderResult } from '~/test-utils';

describe('shared/ui/password-field/password-field', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<PasswordField />);
	};
	const findRoot = (): HTMLElement => wrapper.container.children[0]!;
	const findField = () => wrapper.container.querySelector('input')!;
	const findButton = () => wrapper.getByRole('button');
	const findVisibilityIcon = () => wrapper.getByTestId('VisibilityIcon');
	const findVisibilityOffIcon = () => wrapper.getByTestId('VisibilityOffIcon');

	test('should render password field with button', () => {
		createComponent();

		expect(findRoot()).toMatchSnapshot();
	});

	test('should toggle type of field on button click', async () => {
		createComponent();

		await wrapper.user.click(findButton());

		expect(findField()).toHaveAttribute('type', 'text');
		expect(findVisibilityIcon).toThrow();
		expect(findVisibilityOffIcon()).toBeInTheDocument();

		await wrapper.user.click(findButton());

		expect(findField()).toHaveAttribute('type', 'password');
		expect(findVisibilityIcon()).toBeInTheDocument();
		expect(findVisibilityOffIcon).toThrow();
	});
});
