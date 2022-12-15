import { sample } from 'effector';
import { popups } from '@/shared/const';
import {
	$groupId,
	$location,
	$popups,
	$roomId,
	closeCreateGroupPopup,
	closeCreateRoomPopup,
	closeCreateTaskPopup,
	closeUpdateGroupPopup,
	closeUpdateRoomPopup,
	closeUpdateTaskPopup,
	removePopup,
	setState
} from './units';

// querySync({
// 	controls,
// 	source: {
// 		[getParams.popup]: $popups,
// 	},
// });

// querySync({
// 	controls,
// 	source: {
// 		[getParams.groupId]: $groupId,
// 		[getParams.taskId]: $taskId,
// 		[getParams.taskStatus]: $taskStatus,
// 	},
// 	route: roomRoute,
// });

// querySync({
// 	controls,
// 	source: {
// 		[getParams.roomId]: $roomId,
// 	},
// 	route: roomsRoute,
// });

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
	clock: [closeUpdateGroupPopup, closeCreateGroupPopup],
	target: $groupId.reinit!,
});

sample({
	clock: [closeCreateRoomPopup, closeUpdateRoomPopup],
	target: $roomId.reinit!,
});
