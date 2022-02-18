import { DateType, HEX } from "@/interfaces/common";

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
export interface TaskWithGroup extends Omit<TaskStructure, "groupId"> {
	readonly group: TaskGroup;
}

export interface GroupedByStatusTasksStore {
	readonly ready: TaskWithGroup[];
	readonly inProgress: TaskWithGroup[];
	readonly needReview: TaskWithGroup[];
	readonly done: TaskWithGroup[];
}
export interface TaskGroup {
	readonly id: number;
	readonly name: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}

export interface TaskGroupsMap {
	[id: number]: TaskGroup;
}

export interface TaskProgressStructure {
	readonly groupId: number;
	readonly completedCount: number;
	readonly totalCount: number;
}

export interface TaskProgressWithGroup
	extends Omit<TaskProgressStructure, "groupId">,
		TaskGroup {}

export type StatusNamesStore = {
	readonly [key in keyof GroupedByStatusTasksStore]: TaskStatus;
};
