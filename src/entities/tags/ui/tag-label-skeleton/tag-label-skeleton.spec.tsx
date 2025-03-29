import { describe, expect, test } from 'vitest';

import { RenderResult, render } from '~/test-utils';

import { TagLabelSkeleton } from './tag-label-skeleton';

describe('entities/tags/ui/tag-label-skeleton/tag-label-skeleton.tsx', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<TagLabelSkeleton />);
	};

	const findSkeleton = () => wrapper.container.querySelector('span')!;

	test('should render correctly', () => {
		createComponent();

		expect(findSkeleton()).toMatchSnapshot();
	});
});
