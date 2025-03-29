import { describe, test, expect } from 'vitest';

import { RenderResult, defaultInvitation, render } from '~/test-utils';

import { DeepPartial } from '@/shared/types';

import {
	InvitationListItemTemplate,
	InvitationListItemTemplateProps
} from './invitation-list-item-template';


describe('entities/invitations/ui/invitation-list-item-template/invitation-list-item-template.tsx', () => {
	let wrapper: RenderResult;

	const defaultProps: InvitationListItemTemplateProps = {
		inviterName: defaultInvitation.inviter.username,
		username: defaultInvitation.user!.username,
		slots: {
			userAvatar: <div>User avatar</div>,
		},
	};

	const createComponent = (
		props: DeepPartial<InvitationListItemTemplateProps> = {}
	) => {
		wrapper = render(
			<InvitationListItemTemplate
				{...defaultProps}
				{...props}
				slots={{ ...defaultProps.slots, ...props.slots, }}
			/>
		);
	};

	const findCard = () => wrapper.container.querySelector('div')!;

	test('should render correctly', () => {
		createComponent();

		expect(findCard()).toMatchSnapshot('default');
	});

	test('should render actions if they are provided', () => {
		createComponent({
			slots: {
				actions: (
					<div>
						<button type='button'>Accept</button>
						<button type='button'>Decline</button>
					</div>
				),
			},
		});

		expect(findCard()).toMatchSnapshot('with actions');
	});
});
