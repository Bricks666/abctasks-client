import { Record, Number, String, Static } from 'runtypes';
import { AccessOptions } from '@/shared/lib';
import { hex, InRoomParams } from '@/shared/types';

export const group = Record({
	id: Number,
	roomId: Number,
	name: String,
	mainColor: hex,
	secondColor: hex,
});

export interface Group extends Static<typeof group> {}

export interface GetGroupParams extends InRoomParams {
	readonly id: number;
}

export interface CreateGroupParams
	extends Required<AccessOptions>,
		Omit<Group, 'id'> {}

export interface UpdateGroupParams
	extends Partial<Omit<CreateGroupParams, 'roomId' | 'accessToken'>>,
		Required<AccessOptions> {
	readonly id: number;
	readonly roomId: number;
}

export interface RemoveGroupParams extends Required<AccessOptions> {
	readonly id: number;
	readonly roomId: number;
}
