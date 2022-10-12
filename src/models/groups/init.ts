import { sample } from 'effector';
import {
	createGroupMutation,
	getGroupsQuery,
	removeGroupMutation,
	updateGroupMutation,
} from './queries';
import { groupsApi } from '@/api';
import {
	createGroupFx,
	removeGroupFx,
	updateGroupFx,
	getGroupsFx,
	$GroupsMap,
} from './units';
import { $RoomId } from '../rooms';
import { createGroupsMap } from './utils';

getGroupsFx.use(groupsApi.getAll);
createGroupFx.use(groupsApi.create);
updateGroupFx.use(groupsApi.update);
removeGroupFx.use(groupsApi.remove);

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
