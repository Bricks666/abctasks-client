import {
	createTaskGroupApi,
	deleteGroupApi,
	editGroupApi,
	getTaskGroupsApi,
} from "@/api";
import { guard, sample } from "effector";
import {
	$TaskGroups,
	createGroup,
	createGroupFx,
	deleteGroup,
	deleteGroupFx,
	editGroup,
	editGroupFx,
	loadTaskGroups,
	loadTaskGroupsFx,
} from ".";
import { mayStartFxHandler } from "../handlers";
import { toValidTaskGroup } from "./utils";

loadTaskGroupsFx.use(getTaskGroupsApi);
createGroupFx.use(createTaskGroupApi);
deleteGroupFx.use(deleteGroupApi);
editGroupFx.use(editGroupApi);

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

guard({
	clock: deleteGroup,
	filter: sample({
		source: deleteGroupFx.pending,
		fn: mayStartFxHandler,
	}),
	target: deleteGroupFx,
});

sample({
	source: $TaskGroups,
	clock: deleteGroupFx.doneData,
	fn: (state, { groupId }) => state.filter((group) => group.id !== groupId),
	target: $TaskGroups,
});

guard({
	clock: editGroup,
	filter: sample({
		source: editGroupFx.pending,
		fn: mayStartFxHandler,
	}),
	target: editGroupFx,
});

sample({
	source: $TaskGroups,
	clock: editGroupFx.doneData,
	fn: (state, { group }) =>
		state.map((currentGroup) =>
			currentGroup.id === group.groupId ? toValidTaskGroup(group) : currentGroup
		),
	target: $TaskGroups,
});
