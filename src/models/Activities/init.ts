import { guard, sample } from 'effector';
import { getActivitiesApi, subscribeNewActivitiesApi } from '@/api';
import {
	$Activities,
	addActivity,
	loadActivities,
	loadActivitiesFx,
	subscribeNewActivity,
	subscribeNewActivityFx,
} from '.';
import { mayStartFxHandler } from '../handlers';
import { toValidActivity } from './utils';

loadActivitiesFx.use(getActivitiesApi);
subscribeNewActivityFx.use(async ({ closeRef, ...config }) => {
	closeRef.current = await subscribeNewActivitiesApi(config);
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

sample({
	clock: subscribeNewActivity,
	filter: mayStartFxHandler(subscribeNewActivityFx.pending),
	fn: (data) => ({
		onNewActivity: addActivity,
		onError: () => subscribeNewActivity(data),
		...data,
	}),
	target: subscribeNewActivityFx,
});

sample({
	source: $Activities,
	clock: addActivity,
	fn: (state, activity) => [toValidActivity(activity), ...state],
	target: $Activities,
});
