import { useUnit } from 'effector-react';
import * as React from 'react';

import {
	ApproveInvitationButton,
	RejectInvitationButton
} from '@/features/invitation';

import { TemplateInvitationCard } from '@/entities/invitations';
import { UserAvatar } from '@/entities/users';

import { Room, User } from '@/shared/api';
import { sessionModel } from '@/shared/models';
import { CommonProps } from '@/shared/types';



export interface InvitationCardProps extends CommonProps {
	readonly id: number;
	readonly inviter: User;
	readonly room: Room;
}

export const InvitationCard: React.FC<InvitationCardProps> = (props) => {
	const { id, inviter, room, className, } = props;

	const user = useUnit(sessionModel.$user);

	if (!user) {
		return null;
	}

	const inviterAvatar = (
		<UserAvatar
			email={inviter.email}
			photo={inviter.photo}
			username={inviter.username}
		/>
	);

	const userAvatar = (
		<UserAvatar
			email={user.email}
			photo={user.photo}
			username={user.username}
		/>
	);

	const actions = (
		<>
			<RejectInvitationButton id={id} />
			<ApproveInvitationButton id={id} />
		</>
	);

	return (
		<TemplateInvitationCard
			className={className}
			inviterName={inviter.username}
			roomName={room.name}
			username={user.username}
			slots={{
				inviterAvatar,
				userAvatar,
				actions,
			}}
		/>
	);
};
