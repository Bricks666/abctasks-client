import { DateType } from "../common";

export type TaskStatus = "Done" | "Ready" | "Review" | "Progress";

export interface TaskStructure {
	id: number;
	group: string;
	status: TaskStatus;
	content: string;
	commentCount: number;
	addedDate: DateType;
}
