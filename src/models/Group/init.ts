import { forward, guard, sample } from "effector";
import {
	$TaskGroups,
	loadTaskGroups,
	loadTaskGroupsFx,
	$MayLoadTaskGroups,
} from ".";
import { getTaskGroups } from "../../api";
import { toValidTaskGroup } from "../../utils";
import { loadTasksFx } from "../Tasks";
import { loadTasksProgressFx } from "../TasksProgress";

loadTaskGroupsFx.use(getTaskGroups);

guard({
	clock: loadTaskGroups,
	filter: $MayLoadTaskGroups,
	target: loadTaskGroupsFx,
});

sample({
	clock: loadTaskGroupsFx.doneData,
	fn: (response) => response.groups.map(toValidTaskGroup),
	target: $TaskGroups,
});

forward({
	from: [loadTasksFx, loadTasksProgressFx],
	to: loadTaskGroups,
});

sample({
	clock: loadTaskGroupsFx.pending,
	fn: (isLoading) => !isLoading,
	target: $MayLoadTaskGroups,
});
