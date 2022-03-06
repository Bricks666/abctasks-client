import { ActivitiesResponse, ActivityResponse } from "@/interfaces/response";
import { createDomain } from "effector-logger";
import { ActivityStructure } from "./types";

export const ActivitiesDomain = createDomain("ActivitiesDomain");

export const $Activities = ActivitiesDomain.createStore<ActivityStructure[]>(
	[],
	{ name: "ActivitiesStore" }
);

export const loadActivitiesFx = ActivitiesDomain.createEffect<
	void,
	ActivitiesResponse
>("loadActivitiesFx");
export const subscribeNewActivityFx = ActivitiesDomain.createEffect<
	void,
	void
>("subscribeNewActivityFx");

export const loadActivities = ActivitiesDomain.createEvent<void>(
	"loadActivitiesEvent"
);
export const subscribeNewActivity = ActivitiesDomain.createEvent<void>(
	"subscribeNewActivityEvent"
);
export const addActivity =
	ActivitiesDomain.createEvent<ActivityResponse>("addActivityEvent");
