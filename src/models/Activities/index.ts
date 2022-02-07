import { createEffect, createEvent, createStore } from "effector-logger";

export type Activities =
	| "uploaded"
	| "left a comment"
	| "add task"
	| "change task status";

export interface ActivityStructure {
	readonly id: number;
	readonly whoDone: string;
	readonly activity: Activities;
	readonly documentCount?: number;
	readonly taskName?: string;
}

export const $Activities = createStore<ActivityStructure[]>([], {
	name: "activities",
});

export const addActivity = createEvent<ActivityStructure>("addActivity");

export const loadActivitiesFx = createEffect<void, ActivityStructure[]>(
	"loadActivities"
);
