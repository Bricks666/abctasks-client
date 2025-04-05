import { describe, expect, test } from 'vitest';

import { RenderResult, defaultUser, render } from '~/test-utils';

import { Slots } from '@/shared/types';

import { TemplateUserListItem } from './ui';

describe('src/entities/users/ui/template-user-list-item/ui', () => {
	let wrapper: RenderResult;

	const createComponent = (slots?: Slots<'actions' | 'extra'>) => {
		wrapper = render(
			<TemplateUserListItem
				email={defaultUser.email}
				username={defaultUser.username}
				photo={defaultUser.photo}
				slots={slots}
			/>
		);
	};

	const findListItem = () => wrapper.getByRole('listitem');

	test('should render list item for user', () => {
		createComponent();

		expect(findListItem()).toMatchSnapshot();
	});

	test('should render actions into right slot', () => {
		createComponent({ actions: <div>actions</div>, });

		expect(findListItem()).toMatchSnapshot('with actions slot');
	});

	test('should render extra into right slot', () => {
		createComponent({ extra: <div>extra</div>, });

		expect(findListItem()).toMatchSnapshot('with extra slot');
	});
});
