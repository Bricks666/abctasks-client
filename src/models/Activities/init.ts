import { getActivitiesApi, subscribeNewActivitiesApi } from "@/api";
import { forward, guard, sample } from "effector";
import {
	$Activities,
	addActivity,
	loadActivities,
	loadActivitiesFx,
	subscribeNewActivity,
	subscribeNewActivityFx,
} from ".";
import { mayStartFxHandler } from "../handlers";
import { toValidActivity } from "./utils";

loadActivitiesFx.use(getActivitiesApi);
subscribeNewActivityFx.use(async () => {
	subscribeNewActivitiesApi(addActivity, ({ reconnect }) => {
		/* TODO:  Сделать работу с возвращаемой функцией, чтобы отключаться при выходе из аккаунта */
		reconnect();
	});
});

guard({
	clock: loadActivities,
	filter: sample({
		source: loadActivitiesFx.pending,
		fn: mayStartFxHandler,
	}),
	target: loadActivitiesFx,
});

sample({
	clock: loadActivitiesFx.doneData,
	fn: ({ activities }) => activities.map(toValidActivity),
	target: $Activities,
});

guard({
	clock: subscribeNewActivity,
	filter: sample({
		source: subscribeNewActivityFx.pending,
		fn: mayStartFxHandler,
	}),
	target: subscribeNewActivityFx,
});

forward({
	from: loadActivitiesFx,
	to: subscribeNewActivity,
});

sample({
	source: $Activities,
	clock: addActivity,
	fn: (state, activity) => [toValidActivity(activity), ...state],
	target: $Activities,
});
