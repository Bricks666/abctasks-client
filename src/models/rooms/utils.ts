import { Room, RoomResponse } from './types';

export const converter = (room: RoomResponse): Room => {
	return {
		id: room.roomId,
		name: room.roomName,
		description: room.roomDescription,
	};
};
