import {
	combine,
	createEffect,
	createEvent,
	createStore,
} from "effector-logger";

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

interface ActivitiesStore {
	activities: ActivityStructure[];
	isLoading: boolean;
}

export const $Activities = createStore<ActivityStructure[]>([], {
	name: "activities",
});

export const addActivity = createEvent<ActivityStructure>("addActivity");

export const loadActivitiesFx = createEffect<void, ActivityStructure[]>(
	"loadActivities"
);

export const $ActivitiesStore = combine<ActivitiesStore>({
	activities: $Activities,
	isLoading: loadActivitiesFx.pending,
});
