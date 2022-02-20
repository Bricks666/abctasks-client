export type Activities = "Editing" | "Deleting" | "Creating";

export interface ActivityStructure {
	readonly id: number;
	readonly activistId: number;
	readonly activity: Activities;
}
