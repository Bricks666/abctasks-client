import { beforeEach, describe, expect, test } from 'vitest';

import { SkeletonTaskForm } from './skeleton';

import { RenderResult, act, render } from '~/test-utils';

describe('features/tags/form/skeleton', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<SkeletonTaskForm />);
	};
	const findSkeletonRoot = (): HTMLElement =>
		wrapper.container.querySelector('div')!;

	beforeEach(async () => {
		await act(async () => createComponent());
	});

	test('should render skeleton fields and skeleton button', () => {
		expect(findSkeletonRoot()).toMatchSnapshot();
	});
});
