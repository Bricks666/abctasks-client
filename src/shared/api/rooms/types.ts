import { Record, Number, String, Static, Boolean } from 'runtypes';
import { AccessOptions } from '@/shared/lib';

export type GetRoomsParams = Required<AccessOptions>;

export const room = Record({
	id: Number,
	ownerId: Number,
	name: String,
	description: String,
	canChange: Boolean,
}).asReadonly();

export interface Room extends Static<typeof room> {}

export interface GetRoomParams extends AccessOptions, Pick<Room, 'id'> {}

export interface CreateRoomParams
	extends Required<AccessOptions>,
		Pick<Room, 'description' | 'name'> {}
export interface UpdateRoomParams
	extends Omit<Partial<CreateRoomParams>, 'accessToken'>,
		Required<AccessOptions> {
	readonly id: number;
}

export interface RemoveRoomParams extends Required<AccessOptions> {
	readonly id: number;
}

export interface AddUserRoomParams extends Required<AccessOptions> {
	readonly id: number;
	readonly userId: number;
}

export interface GetLinkHashParams extends Required<AccessOptions> {
	readonly id: number;
}

export interface AnswerInviteParams extends Required<AccessOptions> {
	readonly id: number;
}

export interface InviteByHashParams extends Required<AccessOptions> {
	readonly token: string;
	readonly id: number;
}

export interface ExitRoomParams extends Required<AccessOptions> {
	readonly id: number;
}

export interface RemoveUserParams extends Required<AccessOptions> {
	readonly id: number;
	readonly userId: number;
}
