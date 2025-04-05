import { describe, test, expect } from 'vitest';

import { RenderResult, render } from '~/test-utils';

import { InvitationListItemSkeleton } from './invitation-list-item-skeleton';

describe('entities/invitations/ui/invitation-list-item-skeleton/invitation-list-item-skeleton.tsx', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<InvitationListItemSkeleton />);
	};

	const findCard = () => wrapper.container.querySelector('div')!;

	test('should render correctly', () => {
		createComponent();

		expect(findCard()).toMatchSnapshot();
	});
});
