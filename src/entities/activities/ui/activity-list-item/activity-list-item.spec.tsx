import { describe, expect, test } from 'vitest';

import { ActivityListItem } from './activity-list-item';

import { RenderResult, activities, render } from '~/test-utils';

describe('src/entities/activities/ui/activity-list-item/activity-list-item', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(
			<ActivityListItem className='classname' {...activities[0]} />
		);
	};

	const findItem = () => wrapper.getByRole('listitem');

	test('should render activity list item', () => {
		createComponent();

		expect(findItem()).toMatchSnapshot();
	});
});
