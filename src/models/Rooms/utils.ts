import { RoomResponse } from "@/interfaces/response";
import { Room } from "./types";

export const toValidRoom = (room: RoomResponse): Room => {
	return {
		id: room.roomId,
		name: room.roomName,
		ownerId: room.ownerId,
	};
};
