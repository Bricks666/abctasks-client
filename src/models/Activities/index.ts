import { ID } from "@/interfaces/common";
import { ActivitiesResponse, ActivityResponse } from "@/interfaces/response";
import { CloseConnect } from "@/packages/eventSource";
import { createDomain } from "effector-logger";
import { ActivityStructure } from "./types";

export const ActivitiesDomain = createDomain("ActivitiesDomain");

export const $Activities = ActivitiesDomain.store<ActivityStructure[]>([], {
	name: "ActivitiesStore",
});
export const $ActivitySubscribe = ActivitiesDomain.store<false | CloseConnect>(
	false,
	{
		name: "ActivitySubscribe",
	}
);

export const loadActivitiesFx = ActivitiesDomain.effect<ID, ActivitiesResponse>(
	"loadActivitiesFx"
);
export const subscribeNewActivityFx = ActivitiesDomain.effect<ID, void>(
	"subscribeNewActivityFx"
);

export const loadActivities = ActivitiesDomain.event<ID>("loadActivitiesEvent");
export const subscribeNewActivity = ActivitiesDomain.event<ID>(
	"subscribeNewActivityEvent"
);
export const addActivity =
	ActivitiesDomain.event<ActivityResponse>("addActivityEvent");
export const setUnsubscribe =
	ActivitiesDomain.event<CloseConnect>("setUnsubscribe");
export const unsubscribeNewActivity = ActivitiesDomain.event(
	"unsubscribeNewActivityEvent"
);
