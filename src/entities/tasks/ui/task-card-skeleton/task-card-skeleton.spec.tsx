import { describe, test, expect } from 'vitest';

import { render, type RenderResult } from '~/test-utils';

import { TaskCardSkeleton } from './task-card-skeleton';

describe('TaskCardSkeleton', () => {
	let wrapper: RenderResult;

	const createComponent = (contentLinesCount?: number) => {
		wrapper = render(
			<TaskCardSkeleton contentLinesCount={contentLinesCount} />
		);
	};

	const findCard = () => wrapper.container.querySelector('div')!;

	test('should render correctly', () => {
		createComponent();

		expect(findCard()).toMatchSnapshot();
	});

	test('should render passed number of lines', () => {
		createComponent(3);

		expect(findCard()).toMatchSnapshot('custom number of lines');
	});
});
