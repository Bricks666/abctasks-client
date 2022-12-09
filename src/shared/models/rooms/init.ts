/* eslint-disable import/no-extraneous-dependencies */
import { sample } from 'effector';
import {
	closeCreateRoomPopup,
	closeUpdateRoomPopup
} from '../../configs/routes';
import {
	createRoomMutation,
	removeRoomMutation,
	getRoomsQuery,
	updateRoomMutation,
	getRoomQuery
} from './queries';
import {
	getRoomFx,
	getRoomsFx,
	createRoomFx,
	removeRoomFx,
	updateRoomFx,
	RoomsGate,
	RoomGate
} from './units';
import { roomsApi } from '@/api';

getRoomsFx.use(roomsApi.getAll);
getRoomFx.use(roomsApi.getOne);
removeRoomFx.use(roomsApi.remove);
updateRoomFx.use(roomsApi.update);
createRoomFx.use(roomsApi.create);

sample({
	clock: [
		removeRoomMutation.finished.success,
		updateRoomMutation.finished.success,
		createRoomMutation.finished.success
	],
	fn: () => ({}),
	target: getRoomsQuery.start,
});

sample({
	clock: updateRoomMutation.finished.success,
	target: closeUpdateRoomPopup,
});

sample({
	clock: createRoomMutation.finished.success,
	target: closeCreateRoomPopup,
});

sample({
	clock: RoomsGate.open,
	fn: () => ({}),
	target: getRoomsQuery.start,
});

sample({
	clock: RoomGate.open,
	fn: ({ roomId, }) => roomId,
	target: getRoomQuery.start,
});

getRoomsQuery.finished.finally.watch(console.log);
