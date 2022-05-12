import { SubscribeNewActivitiesApiParams } from "@/api/activities";
import { ID, WithCloseRef } from "@/interfaces/common";
import { ActivitiesResponse, ActivityResponse } from "@/interfaces/response";
import { createDomain } from "effector-logger";
import { ActivityStructure } from "./types";

export const ActivitiesDomain = createDomain("ActivitiesDomain");

export const $Activities = ActivitiesDomain.store<ActivityStructure[]>([], {
	name: "ActivitiesStore",
});

export const loadActivitiesFx = ActivitiesDomain.effect<ID, ActivitiesResponse>(
	"loadActivitiesFx"
);
export const subscribeNewActivityFx = ActivitiesDomain.effect<
	SubscribeNewActivitiesApiParams & WithCloseRef,
	void
>("subscribeNewActivityFx");

export const loadActivities = ActivitiesDomain.event<ID>("loadActivitiesEvent");
export const subscribeNewActivity = ActivitiesDomain.event<
	{ roomId: ID } & WithCloseRef
>("subscribeNewActivityEvent");
export const addActivity =
	ActivitiesDomain.event<ActivityResponse>("addActivityEvent");
