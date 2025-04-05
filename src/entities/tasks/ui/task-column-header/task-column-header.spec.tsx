import { describe, test, expect } from 'vitest';

import { defaultTask, render, type RenderResult } from '~/test-utils';

import { TaskColumnHeader, TaskColumnHeaderProps } from './task-column-header';

describe('TaskColumnHeader', () => {
	let wrapper: RenderResult;

	const defaultProps: TaskColumnHeaderProps = {
		status: defaultTask.status,
	};

	const createComponent = (props: Partial<TaskColumnHeaderProps> = {}) => {
		wrapper = render(<TaskColumnHeader {...defaultProps} {...props} />);
	};

	const findHeader = () => wrapper.getByRole('banner');

	test('should render column header', () => {
		createComponent();

		expect(findHeader()).toMatchSnapshot();
	});

	test('should render header with passed actions', () => {
		createComponent({
			slots: {
				actions: <div>Actions</div>,
			},
		});

		expect(findHeader()).toMatchSnapshot('with actions');
	});
});
