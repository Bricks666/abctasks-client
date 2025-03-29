import { describe, expect, test } from 'vitest';

import { RenderResult, render } from '~/test-utils';

import { ActivityActionIcon } from './activity-action-icon';


describe('entities/activities/ui/activity-action-icon/activity-action-icon', () => {
	let wrapper: RenderResult;

	const createComponent = (action: string) => {
		wrapper = render(
			<ActivityActionIcon className='classname' action={action} />
		);
	};

	const getIcon = () => wrapper.container.querySelector('div')!;

	test.each(['create', 'remove', 'update'])(
		'should render icon for `%s` action',
		(action) => {
			createComponent(action);

			expect(getIcon()).toMatchSnapshot(action);
		}
	);
});
