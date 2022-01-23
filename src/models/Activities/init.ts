import { $Activities, addActivity, loadActivitiesFx } from ".";

$Activities
	.on(loadActivitiesFx.doneData, (_, activities) => activities)
	.on(addActivity, (state, activity) => [...state, activity]);
