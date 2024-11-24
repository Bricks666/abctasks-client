import { describe, expect, test } from 'vitest';

import { Show, ShowProps } from './show';

import { render, RenderResult } from '~/test-utils';

describe('shared/ui/show/show', () => {
	let wrapper: RenderResult;

	const createComponent = (
		props: Omit<ShowProps, 'children'> = { show: true, }
	) => {
		wrapper = render(
			<Show {...props}>
				<div>Children</div>
			</Show>
		);
	};

	const findChild = (): HTMLElement => wrapper.container.children[0]!;

	test('should render children if show=true', () => {
		createComponent();

		expect(findChild()).toMatchSnapshot();
	});

	test('should render nothing if show=false', () => {
		createComponent({ show: false, });

		expect(findChild()).toMatchSnapshot();
	});
});
