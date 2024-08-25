import { beforeEach, describe, expect, test } from 'vitest';

import { Center } from './center';
import styles from './center.module.css';

import { RenderResult, render } from '~/test-utils';

describe('shared/ui/center/center', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(
			<Center>
				<div>Container</div>
			</Center>
		);
	};

	const findContainer = () => wrapper.container.querySelector('div')!;

	beforeEach(() => {
		createComponent();
	});

	test('should render container', () => {
		expect(findContainer()).toMatchSnapshot();
	});

	test.each(['auto', 'container', 'page', 'content'] as const)(
		'should setup size for container',
		(height) => {
			wrapper.rerender(
				<Center height={height}>
					<div>Container</div>
				</Center>
			);

			expect(findContainer()).toHaveClass(styles[height]);
		}
	);
});
