import { render, RenderResult } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { SkeletonTagForm } from './skeleton';

describe('features/tags/form/skeleton', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<SkeletonTagForm />);
	};
	const findSkeletonRoot = (): HTMLElement =>
		wrapper.container.querySelector('div')!;

	test('should render skeleton preview, skeleton fields and skeleton button', () => {
		createComponent();

		expect(findSkeletonRoot()).toMatchSnapshot();
	});
});
