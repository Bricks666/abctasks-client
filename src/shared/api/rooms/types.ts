import { Record, Number, String, Static } from 'runtypes';
import { AccessOptions } from '@/shared/lib';

export type GetRoomsRequest = Required<AccessOptions>;

export const room = Record({
	id: Number,
	name: String,
	description: String,
}).asReadonly();

export interface Room extends Static<typeof room> {}

export interface GetRoomRequest extends AccessOptions, Pick<Room, 'id'> {}

export interface CreateRoomRequest
	extends Required<AccessOptions>,
		Pick<Room, 'description' | 'name'> {}
export interface UpdateRoomRequest
	extends Omit<Partial<CreateRoomRequest>, 'accessToken'>,
		Required<AccessOptions> {
	readonly id: number;
}

export interface RemoveRoomRequest extends Required<AccessOptions> {
	readonly id: number;
}
