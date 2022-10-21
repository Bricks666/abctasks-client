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
	createGroupBaseFx,
	removeGroupBaseFx,
	updateGroupBaseFx,
} from './units';

getGroupsFx.use(groupsApi.getAll);
createGroupBaseFx.use(groupsApi.create);
updateGroupBaseFx.use(groupsApi.update);
removeGroupBaseFx.use(groupsApi.remove);

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
