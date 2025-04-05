import { describe, expect, test } from 'vitest';

import { RenderResult, render } from '~/test-utils';

import { TagListItemSkeleton } from './tag-list-item-skeleton';

describe('entities/tags/ui/tag-list-item-skeleton/tag-list-item-skeleton.tsx', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<TagListItemSkeleton />, {
			wrapper: ({ children, }) => <ul>{children}</ul>,
		});
	};

	const findListItem = () => wrapper.getByRole('listitem');

	test('should render without slot', () => {
		createComponent();

		expect(findListItem()).toMatchSnapshot('without slot');
	});
});
