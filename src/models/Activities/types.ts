export type Activities = "Edited" | "Deleted" | "Created";
export type ActivitySphere = "Task" | "Group";

export interface ActivityStructure {
	readonly id: number;
	readonly activist: string;
	readonly activity: Activities;
	readonly sphere: ActivitySphere;
	readonly date: string;
}
