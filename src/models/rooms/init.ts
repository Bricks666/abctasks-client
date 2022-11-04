/* eslint-disable import/no-extraneous-dependencies */
import { sample } from 'effector-logger';
import { roomsApi } from '@/api';
import {
	getRoomFx,
	getRoomsFx,
	createRoomFx,
	removeRoomFx,
	updateRoomFx,
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

getRoomsFx.use(roomsApi.getAll);
getRoomFx.use(roomsApi.getOne);
removeRoomFx.use(roomsApi.remove);
updateRoomFx.use(roomsApi.update);
createRoomFx.use(roomsApi.create);

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
