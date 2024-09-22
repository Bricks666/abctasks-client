import { describe, expect, test } from 'vitest';

import { Form, FormProps } from './form';

import { render, RenderResult } from '~/test-utils';

describe('shared/ui/form/form', () => {
	let wrapper: RenderResult;

	const defaultProps: FormProps = {
		children: <div />,
		'aria-label': 'label',
	};

	const createComponent = (props: FormProps = defaultProps) => {
		wrapper = render(<Form {...props} />);
	};
	const findForm = () =>
		wrapper.getByRole('form', { name: defaultProps['aria-label'], });

	test('should render styled form', () => {
		createComponent();

		expect(findForm()).toMatchSnapshot();
	});
});
