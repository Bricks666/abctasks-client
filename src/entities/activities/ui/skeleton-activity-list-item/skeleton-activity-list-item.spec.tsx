import { describe, expect, test } from 'vitest';

import { SkeletonActivityListItem } from './skeleton-activity-list-item';

import { RenderResult, render } from '~/test-utils';

describe('src/entities/activities/ui/skeleton-activity-list-item/skeleton-activity-list-item', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<SkeletonActivityListItem className='classname' />);
	};

	const findItem = () => wrapper.getByRole('listitem');

	test('should render skeleton of activity list item', () => {
		createComponent();

		expect(findItem()).toMatchSnapshot();
	});
});
