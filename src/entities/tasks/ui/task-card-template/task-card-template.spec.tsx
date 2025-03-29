import { describe, expect, test } from 'vitest';

import { RenderResult, defaultTask, render } from '~/test-utils';

import { TaskCardTemplate, TaskCardTemplateProps } from './task-card-template';

describe('TaskCardTemplate', () => {
	let wrapper: RenderResult;

	const defaultProps: TaskCardTemplateProps = {
		createdAt: defaultTask.createdAt,
		description: defaultTask.description,
		title: defaultTask.title,
		slots: {
			tags: <div>Tags</div>,
			userAvatar: <div>User Avatar</div>,
		},
	};

	const createComponent = (props: Partial<TaskCardTemplateProps> = {}) => {
		wrapper = render(<TaskCardTemplate {...defaultProps} {...props} />);
	};

	const findCard = () =>
		wrapper.getByRole('article', { name: defaultTask.title, });

	test('should render correctly', () => {
		createComponent();

		expect(findCard()).toMatchSnapshot();
	});

	test('should render actions if they are passed', () => {
		createComponent({
			slots: {
				actions: <div>Actions</div>,
			},
		});

		expect(findCard()).toMatchSnapshot('with actions');
	});
});
