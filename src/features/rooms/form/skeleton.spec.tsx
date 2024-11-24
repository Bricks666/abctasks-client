import { render, RenderResult } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { SkeletonRoomForm } from './skeleton';

describe('features/rooms/form/skeleton', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<SkeletonRoomForm />);
	};
	const findRoot = () => wrapper.container.querySelector('div');

	test('should render element with 3 field holders', () => {
		createComponent();

		expect(findRoot()).toMatchSnapshot();
	});
});
