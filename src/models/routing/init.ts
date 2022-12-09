import { sample } from 'effector';
import { HistoryPushParams, querySync, redirect } from 'atomic-router';
import { roomRoute, roomsRoute } from '@/routes';
import { getParams, popups } from '@/const';
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
		[getParams.popup]: $popups,
	},
});

querySync({
	controls,
	source: {
		[getParams.groupId]: $groupId,
		[getParams.taskId]: $taskId,
		[getParams.taskStatus]: $taskStatus,
	},
	route: roomRoute,
});

querySync({
	controls,
	source: {
		[getParams.roomId]: $roomId,
	},
	route: roomsRoute,
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
	fn: () => popups.updateGroup,
	target: removePopup,
});

sample({
	clock: closeCreateGroupPopup,
	fn: () => popups.createGroup,
	target: removePopup,
});

sample({
	clock: closeCreateTaskPopup,
	fn: () => popups.createTask,
	target: removePopup,
});

sample({
	clock: closeUpdateTaskPopup,
	fn: () => popups.updateTask,
	target: removePopup,
});

sample({
	clock: closeCreateRoomPopup,
	fn: () => popups.createRoom,
	target: removePopup,
});

sample({
	clock: closeUpdateRoomPopup,
	fn: () => popups.updateRoom,
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
