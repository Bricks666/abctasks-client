import { describe, expect, test } from 'vitest';

import { RenderResult, render } from '~/test-utils';

import { TaskStatusSelect, TaskStatusSelectProps } from './task-status-select';

describe('TaskStatusSelect', () => {
	let wrapper: RenderResult;

	const createComponent = (props: TaskStatusSelectProps = {}) => {
		wrapper = render(<TaskStatusSelect {...props} />);
	};

	const findRoot = () => wrapper.container.querySelector('div')!;

	test('should render correctly', () => {
		createComponent();

		expect(findRoot()).toMatchSnapshot();
	});

	test.todo('should allow select one of statuses');

	test.todo('should allow render empty optino');
});
