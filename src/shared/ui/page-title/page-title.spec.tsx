import { describe, expect, test } from 'vitest';

import { PageTitle, PageTitleProps } from './page-title';

import { render, RenderResult } from '~/test-utils';

describe('shared/ui/page-title/page-title', () => {
	let wrapper: RenderResult;

	const defaultProps: PageTitleProps = {
		title: 'title',
		className: 'classname',
	};

	const createComponent = (props: PageTitleProps = defaultProps) => {
		wrapper = render(<PageTitle {...props} />);
	};
	const findRoot = (): HTMLElement => wrapper.container.children[0]!;

	test('should render title', () => {
		createComponent();

		expect(findRoot()).toMatchSnapshot('simple variant');
	});

	test('should render title with extra', () => {
		createComponent({ ...defaultProps, extra: <div />, });

		expect(findRoot()).toMatchSnapshot('with extras');
	});
});
