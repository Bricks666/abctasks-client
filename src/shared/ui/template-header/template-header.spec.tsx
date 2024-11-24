import { describe, expect, test } from 'vitest';

import { TemplateHeader, TemplateHeaderProps } from './template-header';

import { render, RenderResult } from '~/test-utils';

describe('shared/ui/template-header/template-header', () => {
	let wrapper: RenderResult;

	const defaultProps: TemplateHeaderProps = {
		className: 'classname',
	};

	const createComponent = (props: TemplateHeaderProps = defaultProps) => {
		wrapper = render(<TemplateHeader {...props} />);
	};
	const findHeader = () => wrapper.getByRole('banner');

	test('should render header without slots', () => {
		createComponent();

		expect(findHeader()).toMatchSnapshot('empty variant');
	});

	test('should render header with left slot', () => {
		createComponent({ ...defaultProps, slots: { left: <div />, }, });

		expect(findHeader()).toMatchSnapshot('left slot');
	});

	test('should render header with right slot', () => {
		createComponent({ ...defaultProps, slots: { right: <div />, }, });

		expect(findHeader()).toMatchSnapshot('right slot');
	});

	test('should render header with center slot', () => {
		createComponent({ ...defaultProps, slots: { center: <div />, }, });

		expect(findHeader()).toMatchSnapshot('center slot');
	});

	test('should render header with left and right slots', () => {
		createComponent({
			...defaultProps,
			slots: { left: <div />, right: <div />, },
		});

		expect(findHeader()).toMatchSnapshot('left and right slots');
	});

	test('should render header with right and center slots', () => {
		createComponent({
			...defaultProps,
			slots: { center: <div />, right: <div />, },
		});

		expect(findHeader()).toMatchSnapshot('right and center slots');
	});

	test('should render header with left and center slots', () => {
		createComponent({
			...defaultProps,
			slots: { left: <div />, center: <div />, },
		});

		expect(findHeader()).toMatchSnapshot('left and center slots');
	});

	test('should render header with right, center and left slots', () => {
		createComponent({
			...defaultProps,
			slots: { left: <div />, right: <div />, center: <div />, },
		});

		expect(findHeader()).toMatchSnapshot('right, center and left slots');
	});
});
