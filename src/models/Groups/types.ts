import { HEX, ID } from '@/interfaces/common';

export interface TaskGroup {
	readonly id: ID;
	readonly roomId: ID;
	readonly name: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}

export interface TaskGroupsMap {
	[id: ID]: TaskGroup;
}
