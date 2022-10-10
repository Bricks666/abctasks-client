import { ID } from '@/interfaces/common';

export interface Room {
	readonly id: ID;
	readonly name: string;
	readonly description: string;
	readonly taskCount: number;
	readonly doneTaskCount: number;
	readonly usersCount: number;
	readonly activitiesCount: number;
}
