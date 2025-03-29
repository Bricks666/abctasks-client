import { describe, expect, test } from 'vitest';

import { RenderResult, defaultTag, render } from '~/test-utils';

import { TagLabel } from './tag-label';

describe('entities/tags/ui/tag-label/tag-label.tsx', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(
			<TagLabel
				mainColor={defaultTag.mainColor}
				secondColor={defaultTag.secondColor}
				name={defaultTag.name}
			/>
		);
	};

	const findLabel = () => wrapper.getByText(defaultTag.name);

	test('renders correctly', () => {
		createComponent();

		expect(findLabel()).toMatchSnapshot();
	});
});
