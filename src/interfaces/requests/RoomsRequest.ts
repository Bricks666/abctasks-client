import { ID } from "../common";

export interface AddRoomRequest {
	readonly roomName: string;
}
export interface EditRoomRequest extends AddRoomRequest {
	readonly roomId: ID;
}
