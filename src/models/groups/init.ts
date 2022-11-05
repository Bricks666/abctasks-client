/* eslint-disable import/no-extraneous-dependencies */
import { sample } from 'effector-logger';
import {
	createGroupMutation,
	getGroupsQuery,
	removeGroupMutation,
	updateGroupMutation,
} from './queries';
import { groupsApi } from '@/api';
import {
	getGroupsFx,
	createGroupFx,
	removeGroupFx,
	updateGroupFx,
	GroupsGate,
	$GroupsMap,
} from './units';
import { createGroupsMap } from './utils';

getGroupsFx.use(groupsApi.getAll);
createGroupFx.use(groupsApi.create);
updateGroupFx.use(groupsApi.update);
removeGroupFx.use(groupsApi.remove);

sample({
	clock: createGroupMutation.finished.success,
	source: getGroupsQuery.$data,
	fn: (groups, { data: { data } }) => {
		if (!groups) {
			return null;
		}
		return [...groups, data];
	},
	target: getGroupsQuery.$data,
});

sample({
	clock: updateGroupMutation.finished.success,
	source: getGroupsQuery.$data,
	fn: (groups, { data: { data } }) => {
		if (!groups) {
			return null;
		}
		return groups.map((group) => {
			if (group.id === data.id) {
				return data;
			}
			return group;
		});
	},
	target: getGroupsQuery.$data,
});

sample({
	clock: removeGroupMutation.finished.success,
	source: getGroupsQuery.$data,
	fn: (groups, { data: { data }, params }) => {
		if (!groups || !data) {
			return groups;
		}
		const { id } = params;
		return groups.filter((group) => group.id !== id);
	},
	target: getGroupsQuery.$data,
});

sample({
	clock: GroupsGate.open,
	fn: ({ roomId }) => roomId,
	target: getGroupsQuery.start,
});

sample({
	source: getGroupsQuery.$data,
	fn: (data) => (data ? createGroupsMap(data) : {}),
	target: $GroupsMap,
});
