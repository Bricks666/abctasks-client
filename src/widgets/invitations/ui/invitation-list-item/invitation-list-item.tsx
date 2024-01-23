import { useUnit } from 'effector-react';
import * as React from 'react';

import { RemoveInvitation } from '@/features/invitation';

import {
	TemplateInvitationListItem,
	TemplateInvitationListItemProps
} from '@/entities/invitations';
import { roomModel } from '@/entities/rooms';
import { UserAvatar } from '@/entities/users';

import { CommonProps } from '@/shared/types';

export interface InvitationListItemProps
	extends CommonProps,
		Omit<TemplateInvitationListItemProps, 'slots' | 'id'> {
	readonly id: number;
	readonly roomId: number;
	readonly email: string;
	readonly photo: string | null;
}

export const InvitationListItem: React.FC<InvitationListItemProps> = (
	props
) => {
	const { id, roomId, username, email, photo, ...rest } = props;
	const canChange = useUnit(roomModel.$canChange);

	const actions = canChange ? (
		<RemoveInvitation id={id} roomId={roomId} />
	) : null;

	const userAvatar = (
		<UserAvatar username={username} email={email} photo={photo} />
	);

	return (
		<TemplateInvitationListItem
			{...rest}
			username={username}
			slots={{
				userAvatar,
				actions,
			}}
		/>
	);
};
