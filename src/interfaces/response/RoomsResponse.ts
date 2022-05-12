import { ID } from "../common";

export interface ServerRoom {
	readonly roomId: ID;
	readonly roomName: string;
	readonly roomDescription: string;
	readonly taskCount: number;
	readonly doneTaskCount: number;
	readonly activitiesCount: number;
	readonly usersCount: number;
}

export interface RoomsResponse {
	readonly rooms: ServerRoom[];
}
export interface RoomResponse {
	readonly room: ServerRoom;
}
export interface DeleteRoomResponse {
	readonly roomId: ID;
}
