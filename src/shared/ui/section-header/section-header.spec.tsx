import { describe, expect, test } from 'vitest';

import { render, RenderResult } from '~/test-utils';

import { SectionHeader, SectionHeaderProps } from './section-header';

describe('shared/ui/section-header/section-header', () => {
	let wrapper: RenderResult;

	const defaultProps: SectionHeaderProps = {
		title: 'title',
		className: 'classname',
	};

	const createComponent = (props: SectionHeaderProps = defaultProps) => {
		wrapper = render(<SectionHeader {...props} />);
	};
	const findHeader = () => wrapper.container.querySelector('header')!;

	test('should render header with title', () => {
		createComponent();

		expect(findHeader()).toMatchSnapshot('simple variant');
	});

	test('should render header with title and actions', () => {
		createComponent({ ...defaultProps, slots: { actions: <div />, }, });

		expect(findHeader()).toMatchSnapshot('with actions');
	});
});
