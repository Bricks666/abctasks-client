/* eslint-disable eqeqeq */
import { useRooms } from '@/hooks';
import { ID } from '@/interfaces/common';

export const useRoom = (roomId: ID | undefined) => {
	const { rooms } = useRooms();

	return rooms.find((room) => room.id == roomId);
};
