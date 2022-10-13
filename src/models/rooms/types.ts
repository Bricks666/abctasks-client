import { Record, Number, String, Static } from 'runtypes';

export const room = Record({
	id: Number,
	name: String,
	description: String,
}).asReadonly();

export interface Room extends Static<typeof room> {}

export interface RemoveRoomResponse {
	readonly roomId: number;
}

export interface CreateRoomRequest {
	readonly name: string;
	readonly description: string;
}
export interface UpdateRoomRequest extends Partial<CreateRoomRequest> {
	readonly id: number;
}
