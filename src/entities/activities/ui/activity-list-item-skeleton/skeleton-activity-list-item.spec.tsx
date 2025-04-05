import { describe, expect, test } from 'vitest';

import { RenderResult, render } from '~/test-utils';

import { ActivityListItemSkeleton } from './activity-list-item-skeleton';


describe('entities/activities/ui/activity-list-item-skeleton/activity-list-item-skeleton.tsx', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<ActivityListItemSkeleton className='classname' />);
	};

	const findItem = () => wrapper.getByRole('listitem');

	test('should render skeleton of activity list item', () => {
		createComponent();

		expect(findItem()).toMatchSnapshot();
	});
});
