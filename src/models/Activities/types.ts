import { ID } from '@/types/common';

export enum Activities {
	EDIT,
	CREATE,
	DELETE,
}
export enum ActivitySphere {
	TASK,
	GROUP,
}

export interface ActivityStructure {
	readonly id: ID;
	readonly activist: string;
	readonly activity: Activities;
	readonly sphere: ActivitySphere;
	readonly date: string;
}
