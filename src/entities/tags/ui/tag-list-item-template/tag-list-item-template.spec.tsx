import { describe, expect, test } from 'vitest';

import { RenderResult, render, defaultTag } from '~/test-utils';

import {
	TagListItemTemplate,
	TagListItemTemplateProps
} from './tag-list-item-template';

describe('entities/tags/ui/tag-list-item-template/tag-list-item-template.tsx', () => {
	let wrapper: RenderResult;

	const defaultProps: TagListItemTemplateProps = {
		mainColor: defaultTag.mainColor,
		name: defaultTag.name,
		secondColor: defaultTag.secondColor,
	};

	const createComponent = (props?: Partial<TagListItemTemplateProps>) => {
		wrapper = render(<TagListItemTemplate {...defaultProps} {...props} />, {
			wrapper: ({ children, }) => <ul>{children}</ul>,
		});
	};

	const findListItem = () => wrapper.getByRole('listitem');

	test('should render without slot', () => {
		createComponent();

		expect(findListItem()).toMatchSnapshot('without slot');
	});

	test('should render with slot', () => {
		createComponent({
			slots: { actions: <button type='button'>Test</button>, },
		});

		expect(findListItem()).toMatchSnapshot('with slot');
	});
});
