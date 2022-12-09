import { AccessOptions } from '@/packages';

export type GetRoomsRequest = Required<AccessOptions>;

export interface GetRoomRequest extends AccessOptions {
	readonly id: number;
}

export interface CreateRoomRequest extends Required<AccessOptions> {
	readonly name: string;
	readonly description: string;
}
export interface UpdateRoomRequest
	extends Omit<Partial<CreateRoomRequest>, 'accessToken'>,
		Required<AccessOptions> {
	readonly id: number;
}

export interface RemoveRoomRequest extends Required<AccessOptions> {
	readonly id: number;
}
