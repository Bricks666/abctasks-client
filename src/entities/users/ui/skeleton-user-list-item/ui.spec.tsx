import { describe, expect, test } from 'vitest';

import { SkeletonUserListItem } from './ui';

import { RenderResult, render } from '~/test-utils';

describe('src/entities/users/ui/skeleton-user-list-item/ui', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<SkeletonUserListItem />);
	};

	const findListItem = () => wrapper.getByRole('listitem');

	test('should render skeleton list item', () => {
		createComponent();

		expect(findListItem()).toMatchSnapshot();
	});
});
