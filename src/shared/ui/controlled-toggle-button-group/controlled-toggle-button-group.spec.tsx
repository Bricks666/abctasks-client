import { ToggleButton } from '@mui/material';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ControlledToggleButtonGroup } from './controlled-toggle-button-group';

import { RenderResult, render } from '~/test-utils';


describe('shared/ui/controlled-toggle-button-group/controlled-toggle-button-group', () => {
	let wrapper: RenderResult;
	const value = 'A';
	const onChange = vi.fn();
	const label = 'label';

	const createComponent = () => {
		wrapper = render(
			<ControlledToggleButtonGroup
				value={value}
				onChange={onChange}
				label={label}>
				<ToggleButton value='A'>A</ToggleButton>
				<ToggleButton value='B'>B</ToggleButton>
			</ControlledToggleButtonGroup>
		);
	};

	const findRoot = () => wrapper.container.querySelector('div')!;
	const findButton = (name: string) => wrapper.getByRole('button', { name, });

	beforeEach(() => {
		createComponent();
	});

	test('should render button group with label', () => {
		expect(findRoot()).toMatchSnapshot('simple');
	});

	test('should render with error styles if error=true', () => {
		wrapper.rerender(
			<ControlledToggleButtonGroup
				value={value}
				onChange={onChange}
				label={label}
				error>
				<ToggleButton value='A'>A</ToggleButton>
				<ToggleButton value='B'>B</ToggleButton>
			</ControlledToggleButtonGroup>
		);

		expect(findRoot()).toMatchSnapshot('error');
	});

	test('should render helper text if it passed', () => {
		wrapper.rerender(
			<ControlledToggleButtonGroup
				value={value}
				onChange={onChange}
				label={label}
				helperText='helper text'>
				<ToggleButton value='A'>A</ToggleButton>
				<ToggleButton value='B'>B</ToggleButton>
			</ControlledToggleButtonGroup>
		);

		expect(findRoot()).toMatchSnapshot('helper-text');
	});

	test('should change value on button click', async () => {
		const button = findButton('B');

		await wrapper.user.click(button);

		expect(onChange).toHaveBeenCalledWith('AB');
	});
});
