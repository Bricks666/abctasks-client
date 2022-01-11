import { createEvent, createStore } from "effector";
import { ActivityStructure } from "../interfaces/structures";

interface ActivitiesStore {
	activities: ActivityStructure[];
	isLoading: boolean;
}

export const $ActivitiesStore = createStore<ActivitiesStore>(
	{
		activities: [],
		isLoading: false,
	},
	{ name: "activitiesStore" }
);

export const setActivities = createEvent<ActivityStructure[]>("setActivities");
export const addActivity = createEvent<ActivityStructure>("addActivity");
export const startLoadingActivity = createEvent("startLoadingActivity");
export const endLoadingActivity = createEvent("endLoadingActivity");

$ActivitiesStore
	.on(setActivities, (state, activities) => {
		return {
			...state,
			activities,
		};
	})
	.on(addActivity, (state, activity) => {
		return {
			...state,
			activities: [activity, ...state.activities],
		};
	})
	.on(startLoadingActivity, (state) => {
		return {
			...state,
			isLoading: true,
		};
	})
	.on(endLoadingActivity, (state) => {
		return {
			...state,
			isLoading: false,
		};
	});
