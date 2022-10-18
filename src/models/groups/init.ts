import { sample } from 'effector';
import {
	createGroupMutation,
	getGroupsQuery,
	removeGroupMutation,
	updateGroupMutation,
} from './queries';
import { groupsApi } from '@/api';
import {
	getGroupsFx,
	$GroupsMap,
	createGroupBaseFx,
	removeGroupBaseFx,
	updateGroupBaseFx,
} from './units';
import { $RoomId } from '../rooms';
import { createGroupsMap } from './utils';

getGroupsFx.use(groupsApi.getAll);
createGroupBaseFx.use(groupsApi.create);
updateGroupBaseFx.use(groupsApi.update);
removeGroupBaseFx.use(groupsApi.remove);

sample({
	clock: [
		updateGroupMutation.finished.success,
		createGroupMutation.finished.success,
		removeGroupMutation.finished.success,
	],
	source: $RoomId,
	fn: (roomId) => roomId,
	target: getGroupsQuery.start,
});

sample({
	clock: getGroupsQuery.finished.success,
	fn: (response) => {
		const { data } = response;

		return createGroupsMap(data);
	},
	target: $GroupsMap,
});
