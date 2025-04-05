import { List } from '@mui/material';
import { describe, expect, test } from 'vitest';

import { RenderResult, activities, render } from '~/test-utils';

import { ActivityListItem } from './activity-list-item';


describe('entities/activities/ui/activity-list-item/activity-list-item', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(
			<ActivityListItem
				className='classname'
				action={activities[0].action}
				activist={activities[0].activist}
				createdAt={activities[0].createdAt}
				sphere={activities[0].sphere}
			/>,
			{
				wrapper: List,
			}
		);
	};

	const findItem = () => wrapper.getByRole('listitem');

	test('should render activity list item', () => {
		createComponent();

		expect(findItem()).toMatchSnapshot();
	});
});
