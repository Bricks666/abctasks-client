import { getTaskGroupsApi } from "@/api";
import { guard, sample } from "effector";
import { $TaskGroups, loadTaskGroups, loadTaskGroupsFx } from ".";
import { mayStartFxHandler } from "../handlers";
import { toValidTaskGroup } from "./utils";

loadTaskGroupsFx.use(getTaskGroupsApi);

guard({
	clock: loadTaskGroups,
	filter: sample({
		clock: loadTaskGroupsFx.pending,
		fn: mayStartFxHandler,
	}),
	target: loadTaskGroupsFx,
});

sample({
	clock: loadTaskGroupsFx.doneData,
	fn: (response) => response.groups.map(toValidTaskGroup),
	target: $TaskGroups,
});
