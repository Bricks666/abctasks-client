import { InRoomParams } from '@/shared/types';

export interface AddUserRoomParams extends InRoomParams {
	readonly userId: number;
}

export interface InviteByHashParams extends InRoomParams {
	readonly token: string;
}

export interface RemoveUserParams extends InRoomParams {
	readonly userId: number;
}
