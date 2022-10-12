import { Record, Number, String, Static } from 'runtypes';
import { hex, HEX } from '@/types/common';

export const group = Record({
	id: Number,
	roomId: Number,
	name: String,
	mainColor: hex,
	secondColor: hex,
});

export interface Group extends Static<typeof group> {}

export interface GroupsMap {
	[id: number]: Group;
}

export interface CreateGroupRequest {
	readonly roomId: number;
	readonly name: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}

export interface UpdateGroupRequest
	extends Partial<Omit<CreateGroupRequest, 'roomId'>> {
	readonly id: number;
	readonly roomId: number;
}

export interface RemoveGroupRequest {
	readonly id: number;
	readonly roomId: number;
}
