import { logoutFx } from "./../User/index";
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
} from ".";
import { mayStartFxHandler } from "../handlers";
import { toValidActivity } from "./utils";

loadActivitiesFx.use(getActivitiesApi);
subscribeNewActivityFx.use(async () => {
	const close = await subscribeNewActivitiesApi(
		addActivity,
		async ({ reconnect }) => {
			const close = await reconnect();
			setUnsubscribe(close);
		}
	);
	setUnsubscribe(close);
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
	from: setUnsubscribe,
	to: $ActivitySubscribe,
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

sample({
	source: $ActivitySubscribe,
	clock: logoutFx.done,
	fn: (close) => {
		close && close();
		return null;
	},
	target: $ActivitySubscribe,
});
