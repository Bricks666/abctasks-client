import { DateType } from "@/interfaces/common";

export type TaskStatus = "Done" | "Ready" | "Review" | "In Progress";

export interface TaskAuthor {
	readonly name: string;
	readonly photo: string | null;
}

export interface TaskStructure {
	readonly id: number;
	readonly groupId: number;
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
