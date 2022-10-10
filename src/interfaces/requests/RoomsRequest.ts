import { ID } from '../common';

export interface CreateRoomRequest {
	readonly roomName: string;
	readonly roomDescription: string;
}
export interface EditRoomRequest extends CreateRoomRequest {
	readonly roomId: ID;
}

export type CreateEditRoomRequest = CreateRoomRequest & EditRoomRequest;
