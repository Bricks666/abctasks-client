export type Activities =
	| "uploaded"
	| "left a comment"
	| "add task"
	| "change task status";

export interface ActivityStructure {
	id: number;
	whoDone: string;
	activity: Activities;
	documentCount?: number;
	taskName?: string;
}
