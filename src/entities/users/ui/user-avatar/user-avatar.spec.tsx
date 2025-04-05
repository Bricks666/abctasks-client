import { describe, expect, test } from 'vitest';

import { UserAvatar } from './user-avatar';

import { RenderResult, render, users } from '~/test-utils';

describe('src/entities/users/ui/user-avatar/user-avatar', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<UserAvatar {...users[2]} />);
	};

	const findAvatar = () => wrapper.container.querySelector('div')!;

	test('should render user avatar with passed photo', () => {
		createComponent();

		expect(findAvatar()).toMatchSnapshot();
	});
});
