import { useMemo } from 'react';

import { RoomId, roomModel } from '../models';

export interface UseRoomParams {
	readonly roomId: RoomId;
}

export const useRoom = (params: UseRoomParams) => {
	const { roomId, } = params;

	return useMemo(() => roomModel.create({ roomId, }), [roomId]);
};
