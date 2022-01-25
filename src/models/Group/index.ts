import {
	createEffect,
	createEvent,
	createStore,
	combine,
} from "effector-logger";
import { HEX } from "../../interfaces/common";
import { TaskGroupsResponse } from "../../interfaces/response";

export interface TaskGroup {
	readonly id: number;
	readonly name: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}

export const $TaskGroups = createStore<TaskGroup[]>([], { name: "TaskGroups" });

export const loadTaskGroupsFx = createEffect<void, TaskGroupsResponse>(
	"loadTaskGroupsFx"
);

export const loadTaskGroups = createEvent("loadTaskGroups");

interface TaskGroupsMap {
	[id: number]: TaskGroup;
}

export const $MayLoadTaskGroups = createStore<boolean>(true, {
	name: "MayLoadTaskGroups",
});

export const $TaskGroupsMap = combine<TaskGroup[], TaskGroupsMap>(
	$TaskGroups,
	(groups) => {
		return Object.values(groups).reduce<TaskGroupsMap>((map, group) => {
			map[group.id] = group;
			return map;
		}, {});
	}
);
