import { ID } from "../common";

export interface RoomResponse {
	readonly roomId: ID;
	readonly ownerId: ID;
	readonly roomName: string;
}

export interface RoomsResponse {
	readonly rooms: RoomResponse[];
}
