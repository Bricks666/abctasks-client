import { DateType, ID } from '@/interfaces/common';

export enum TaskStatus {
	DONE,
	IN_PROGRESS,
	REVIEW,
	READY,
}

export interface TaskAuthor {
	readonly name: string;
	readonly photo: string | null;
}

export interface TaskStructure {
	readonly id: ID;
	readonly groupId: ID;
	readonly roomId: ID;
	readonly status: TaskStatus;
	readonly content: string;
	readonly commentCount: number;
	readonly addedDate: DateType;
	readonly author: TaskAuthor;
}

export interface GroupedByStatusTasksStore {
	readonly ready: TaskStructure[];
	readonly inProgress: TaskStructure[];
	readonly needReview: TaskStructure[];
	readonly done: TaskStructure[];
}

export type StatusNamesStore = {
	readonly [key in keyof GroupedByStatusTasksStore]: TaskStatus;
};
