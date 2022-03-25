import { ID } from "@/interfaces/common";

export type Activities = "Edited" | "Deleted" | "Created";
export type ActivitySphere = "Task" | "Group";

export interface ActivityStructure {
	readonly id: ID;
	readonly activist: string;
	readonly activity: Activities;
	readonly sphere: ActivitySphere;
	readonly date: string;
}
