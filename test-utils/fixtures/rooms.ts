import { RoomDto } from '@/shared/api';

import { generateId } from './generate-id';
import { defaultUser } from './users';

export const rooms: RoomDto[] = [
	{
		id: 1,
		ownerId: defaultUser.id,
		name: 'name',
		description: 'description',
		canChange: true,
	},
	{
		id: 2,
		ownerId: defaultUser.id,
		name: 'name-2',
		description: 'description-2',
		canChange: true,
	}
];

export const defaultRoom = rooms[0];

export const createRoom = (room?: Partial<RoomDto>): RoomDto => {
	return {
		...defaultRoom,
		id: generateId(),
		...room,
	};
};
