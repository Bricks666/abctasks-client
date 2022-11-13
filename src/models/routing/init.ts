import { sample } from 'effector';
import { HistoryPushParams, querySync, redirect } from 'atomic-router';
import { roomsRoute } from '@/routes';
import { routes } from '@/const';
import {
	$groupId,
	$location,
	$popups,
	$roomId,
	$taskId,
	$taskStatus,
	closeCreateGroupPopup,
	closeCreateRoomPopup,
	closeCreateTaskPopup,
	closeGroupsPopup,
	closeUpdateGroupPopup,
	closeUpdateRoomPopup,
	closeUpdateTaskPopup,
	controls,
	goToState,
	removePopup,
	router,
	saveCurrentLocation,
	setState,
} from './units';

querySync({
	controls,
	source: {
		[routes.GET_PARAMS.popup]: $popups,
		[routes.GET_PARAMS.groupId]: $groupId,
		[routes.GET_PARAMS.taskId]: $taskId,
		[routes.GET_PARAMS.taskStatus]: $taskStatus,
		[routes.GET_PARAMS.roomId]: $roomId,
	},
});

sample({
	clock: removePopup,
	source: $popups,
	fn: (popups, popup) => {
		return popups.replaceAll(popup, '');
	},
	target: $popups,
});

sample({
	clock: closeUpdateGroupPopup,
	fn: () => routes.POPUPS.updateGroup,
	target: removePopup,
});

sample({
	clock: closeCreateGroupPopup,
	fn: () => routes.POPUPS.createGroup,
	target: removePopup,
});

sample({
	clock: closeCreateTaskPopup,
	fn: () => routes.POPUPS.createTask,
	target: removePopup,
});

sample({
	clock: closeUpdateTaskPopup,
	fn: () => routes.POPUPS.updateTask,
	target: removePopup,
});

sample({
	clock: closeCreateRoomPopup,
	fn: () => routes.POPUPS.createRoom,
	target: removePopup,
});

sample({
	clock: closeUpdateRoomPopup,
	fn: () => routes.POPUPS.updateRoom,
	target: removePopup,
});

sample({
	clock: closeGroupsPopup,
	fn: () => routes.POPUPS.groups,
	target: removePopup,
});

sample({
	clock: setState,
	target: $location,
});

sample({
	clock: saveCurrentLocation,
	source: { path: router.$path, query: router.$query },
	fn: ({ path, query }) => {
		return { path, query };
	},
	target: $location,
});

sample({
	clock: goToState,
	source: $location,
	fn: ({ path, query }): Omit<HistoryPushParams, 'history'> => ({
		method: 'replace',
		path,
		query,
		params: {},
	}),
	target: router.push,
});

sample({
	clock: [closeUpdateGroupPopup, closeCreateGroupPopup],
	target: $groupId.reinit!,
});

sample({
	clock: [closeCreateTaskPopup, closeUpdateTaskPopup],
	target: $taskId.reinit!,
});

sample({
	clock: [closeCreateTaskPopup, closeUpdateTaskPopup],
	target: $taskId.reinit!,
});

sample({
	clock: [closeUpdateTaskPopup],
	target: $taskStatus.reinit!,
});

sample({
	clock: [closeCreateRoomPopup, closeUpdateRoomPopup],
	target: $roomId.reinit!,
});

redirect({
	clock: router.routeNotFound,
	route: roomsRoute,
});
