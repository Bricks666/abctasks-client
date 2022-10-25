import { Record, Number, String, Static } from 'runtypes';
import { hex } from '@/types';

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
