import { describe, test, expect } from 'vitest';

import { RenderResult, render } from '~/test-utils';

import { InvitationCardSkeleton } from './invitation-card-skeleton';

describe('entities/invitations/ui/invitation-card-skeleton/invitation-card-skeleton.tsx', () => {
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<InvitationCardSkeleton />);
	};

	const findCard = () => wrapper.container.querySelector('div')!;

	test('should render correctly', () => {
		createComponent();

		expect(findCard()).toMatchSnapshot();
	});
});
