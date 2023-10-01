import { useUnit } from 'effector-react';
import * as React from 'react';

import { ExitRoomUserButton, RemoveUserFromRoom } from '@/features/users';

import { roomModel } from '@/entities/rooms';
import {
	TemplateUserListItem,
	TemplateUserListItemProps
} from '@/entities/users';

import { sessionModel } from '@/shared/models';
import { CommonProps } from '@/shared/types';

export interface UserInRoomListItemProps
	extends CommonProps,
		Omit<TemplateUserListItemProps, 'slots'> {
	readonly roomId: number;
}

export const UserInRoomListItem: React.FC<UserInRoomListItemProps> = (
	props
) => {
	const { id, roomId, ...rest } = props;

	const authUser = useUnit(sessionModel.$user);
	const room = useUnit(roomModel.query.$data);

	const isOwnerAuthorized = authUser?.id === room?.ownerId;
	const isOwner = id === room?.ownerId;

	const isAuthorized = authUser?.id === id;

	const exitButton = isAuthorized ? (
		<ExitRoomUserButton roomId={roomId} />
	) : null;

	const removeUserButton =
		isOwnerAuthorized && !isOwner ? (
			<RemoveUserFromRoom userId={id} roomId={roomId} />
		) : null;

	const actions = (
		<>
			{exitButton}
			{removeUserButton}
		</>
	);

	return <TemplateUserListItem id={id} {...rest} slots={{ actions, }} />;
};
