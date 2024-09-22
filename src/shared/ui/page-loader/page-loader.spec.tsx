import { describe, expect, test } from 'vitest';

import { PageLoader, PageLoaderProps } from './page-loader';

import { render, RenderResult } from '~/test-utils';

describe('shared/ui/page-loader/page-loader', () => {
	let wrapper: RenderResult;

	const defaultProps: PageLoaderProps = {
		className: 'classname',
	};

	const createComponent = (props: PageLoaderProps = defaultProps) => {
		wrapper = render(<PageLoader {...props} />);
	};
	const findRoot = (): HTMLElement => wrapper.container.children[0]!;

	test('should render loading indicator in the center of the page', () => {
		createComponent();

		expect(findRoot()).toMatchSnapshot();
	});
});
