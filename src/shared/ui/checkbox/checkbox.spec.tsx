import { beforeEach, describe, expect, test, vi } from 'vitest';

import { Checkbox } from './checkbox';

import { RenderResult, render } from '~/test-utils';

describe('shared/ui/checkbox/checkbox', () => {
	let wrapper: RenderResult;
	const label = 'label';
	const onChange = vi.fn();

	const createComponent = () => {
		wrapper = render(
			<Checkbox name='name' onChange={onChange} value={false} label={label} />
		);
	};

	const findRoot = () => wrapper.container.querySelector('label')!;
	const findCheckbox = () => wrapper.getByRole('checkbox', { name: label, });

	beforeEach(() => {
		createComponent();
	});

	test('should render checkbox', () => {
		expect(findCheckbox()).toBeInTheDocument();
		expect(findRoot()).toMatchSnapshot();
	});

	test('should pass onChange with tracking checked value', async () => {
		const checkbox = findCheckbox();

		await wrapper.user.click(checkbox);

		expect(onChange).toHaveBeenCalledWith(true);
	});
});
