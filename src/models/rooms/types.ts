import { Record, Number, String, Static } from 'runtypes';

export interface Room {
	readonly id: number;
	readonly name: string;
	readonly description: string;
}

export const roomResponse = Record({
	roomId: Number,
	roomName: String,
	roomDescription: String,
}).asReadonly();

export interface RoomResponse extends Static<typeof roomResponse> {}

export interface DeleteRoomResponse {
	readonly roomId: number;
}

export interface CreateRoomRequest {
	readonly roomName: string;
	readonly roomDescription: string;
}
export interface UpdateRoomRequest extends CreateRoomRequest {
	readonly roomId: number;
}

export type CreateUpdateRoomRequest = CreateRoomRequest & UpdateRoomRequest;
