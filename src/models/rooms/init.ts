/* eslint-disable import/no-extraneous-dependencies */
import { sample } from 'effector-logger';
import { roomsApi } from '@/api';
import {
	getRoomFx,
	getRoomsBaseFx,
	createRoomBaseFx,
	removeRoomBaseFx,
	updateRoomBaseFx,
	roomsGate,
	roomGate,
} from './units';
import {
	createRoomMutation,
	removeRoomMutation,
	getRoomsQuery,
	updateRoomMutation,
	getRoomQuery,
} from './queries';

getRoomsBaseFx.use(roomsApi.getAll);
getRoomFx.use(roomsApi.getOne);
removeRoomBaseFx.use(roomsApi.remove);
updateRoomBaseFx.use(roomsApi.update);
createRoomBaseFx.use(roomsApi.create);

sample({
	clock: [
		removeRoomMutation.finished.success,
		updateRoomMutation.finished.success,
		createRoomMutation.finished.success,
	],
	fn: () => ({}),
	target: getRoomsQuery.start,
});

sample({
	clock: roomsGate.open,
	fn: () => ({}),
	target: getRoomsQuery.start,
});

sample({
	clock: roomGate.open,
	fn: ({ roomId }) => roomId,
	target: getRoomQuery.start,
});
