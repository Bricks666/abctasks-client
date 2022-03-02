import { createTaskGroupApi, getTaskGroupsApi } from "@/api";
import { guard, sample } from "effector";
import {
	$TaskGroups,
	createGroup,
	createGroupFx,
	loadTaskGroups,
	loadTaskGroupsFx,
} from ".";
import { mayStartFxHandler } from "../handlers";
import { toValidTaskGroup } from "./utils";

loadTaskGroupsFx.use(getTaskGroupsApi);
createGroupFx.use(createTaskGroupApi);

guard({
	clock: loadTaskGroups,
	filter: sample({
		source: loadTaskGroupsFx.pending,
		fn: mayStartFxHandler,
	}),
	target: loadTaskGroupsFx,
});

sample({
	clock: loadTaskGroupsFx.doneData,
	fn: (response) => response.groups.map(toValidTaskGroup),
	target: $TaskGroups,
});

guard({
	clock: createGroup,
	filter: sample({
		source: createGroupFx.pending,
		fn: mayStartFxHandler,
	}),
	target: createGroupFx,
});

sample({
	source: $TaskGroups,
	clock: createGroupFx.doneData,
	fn: (state, response) => [...state, toValidTaskGroup(response.group)],
	target: $TaskGroups,
});
