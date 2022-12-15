import { Record, Number, String, Static } from 'runtypes';
import { AccessOptions } from '@/shared/packages';
import { hex } from '@/shared/types';

export const group = Record({
	id: Number,
	roomId: Number,
	name: String,
	mainColor: hex,
	secondColor: hex,
});

export interface Group extends Static<typeof group> {}

export interface CreateGroupRequest
	extends Required<AccessOptions>,
		Omit<Group, 'id'> {}

export interface UpdateGroupRequest
	extends Partial<Omit<CreateGroupRequest, 'roomId' | 'accessToken'>>,
		Required<AccessOptions> {
	readonly id: number;
	readonly roomId: number;
}

export interface RemoveGroupRequest extends Required<AccessOptions> {
	readonly id: number;
	readonly roomId: number;
}
