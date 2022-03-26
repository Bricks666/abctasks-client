import { getActivitiesApi, subscribeNewActivitiesApi } from "@/api";
import { forward, guard, sample } from "effector";
import {
	$Activities,
	$ActivitySubscribe,
	addActivity,
	loadActivities,
	loadActivitiesFx,
	setUnsubscribe,
	subscribeNewActivity,
	subscribeNewActivityFx,
	unsubscribeNewActivity,
} from ".";
import { mayStartFxHandler } from "../handlers";
import { toValidActivity } from "./utils";

loadActivitiesFx.use(getActivitiesApi);
subscribeNewActivityFx.use(async (roomId) => {
	const close = await subscribeNewActivitiesApi({
		onNewActivity: addActivity,
		onError: () => subscribeNewActivity(roomId),
		roomId,
	});

	setUnsubscribe(close);
});

guard({
	clock: loadActivities,
	filter: mayStartFxHandler(loadActivitiesFx.pending),
	target: loadActivitiesFx,
});

sample({
	clock: loadActivitiesFx.doneData,
	fn: ({ activities }) => activities.map(toValidActivity),
	target: $Activities,
});

guard({
	clock: subscribeNewActivity,
	filter: mayStartFxHandler(subscribeNewActivityFx.pending),
	target: subscribeNewActivityFx,
});
forward({
	from: setUnsubscribe,
	to: $ActivitySubscribe,
});

sample({
	source: $Activities,
	clock: addActivity,
	fn: (state, activity) => [toValidActivity(activity), ...state],
	target: $Activities,
});

sample({
	source: $ActivitySubscribe,
	clock: unsubscribeNewActivity,
	fn: (close) => {
		close && close();
		return false as const;
	},
	target: $ActivitySubscribe,
});

$ActivitySubscribe.watch((close) => console.debug(close));
