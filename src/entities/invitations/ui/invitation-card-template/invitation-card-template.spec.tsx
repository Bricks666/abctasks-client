import { describe, test, expect } from 'vitest';

import { RenderResult, defaultInvitation, render } from '~/test-utils';

import { DeepPartial } from '@/shared/types';

import {
	InvitationCardTemplate,
	InvitationCardTemplateProps
} from './invitation-card-template';


describe('entities/invitations/ui/invitation-card-template/invitation-card-template.tsx', () => {
	let wrapper: RenderResult;

	const defaultProps: InvitationCardTemplateProps = {
		inviterName: defaultInvitation.inviter.username,
		roomName: defaultInvitation.room.description,
		username: defaultInvitation.user!.username,
		slots: {
			inviterAvatar: <div>Inviter avatar</div>,
			userAvatar: <div>User avatar</div>,
		},
	};

	const createComponent = (
		props: DeepPartial<InvitationCardTemplateProps> = {}
	) => {
		wrapper = render(
			<InvitationCardTemplate
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
