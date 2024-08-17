import { Invitation } from '@/shared/api';

import { defaultRoom } from './rooms';
import { defaultUser, users } from './users';

export const invitations: Invitation[] = [
	{
		id: 1,
		room: defaultRoom,
		user: users[1],
		inviter: defaultUser,
		status: 'sended',
	},
	{
		id: 2,
		room: defaultRoom,
		user: users[2],
		inviter: defaultUser,
		status: 'approved',
	}
];

export const defaultInvitation = invitations[0];

export const createInvitationLink = (roomId: number): string => {
	return `${window.location.origin}/invitation-link-to-room-${roomId}`;
};
