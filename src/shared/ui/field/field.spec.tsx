import { beforeEach, describe, expect, test, vi } from 'vitest';

import { Field } from './field';

import { RenderResult, render } from '~/test-utils';

describe('shared/ui/field/field', () => {
	const label = 'label';
	const onChange = vi.fn();
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<Field label={label} value='2134' onChange={onChange} />);
	};

	const findRoot = () => wrapper.container.children[0]!;
	const findInput = () => wrapper.getByRole('textbox', { name: label, });

	beforeEach(() => {
		createComponent();
	});

	test('should render field', () => {
		expect(findRoot()).toMatchSnapshot('simple');
	});

	test('should render with error styles if isValid=false', () => {
		wrapper.rerender(
			<Field value='2134' onChange={onChange} isValid={false} />
		);

		expect(findRoot()).toMatchSnapshot('error');
	});

	test('should handle changes', async () => {
		const input = findInput();

		await wrapper.user.click(input);
		await wrapper.user.keyboard('a');

		expect(onChange).toHaveBeenCalledWith('2134a');
	});
});
