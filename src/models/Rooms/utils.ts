import { ServerRoom } from "@/interfaces/response";
import { Room } from "./types";

export const toValidRoom = (room: ServerRoom): Room => {
	return {
		id: room.roomId,
		name: room.roomName,
		activitiesCount: room.activitiesCount,
		description: room.roomDescription,
		doneTaskCount: room.doneTaskCount,
		taskCount: room.taskCount,
		usersCount: room.usersCount,
	};
};
