/* eslint-disable import/no-extraneous-dependencies */
import { sample } from 'effector-logger';
import { roomsApi } from '@/api';
import {
	getRoomFx,
	$RoomId,
	getRoomsBaseFx,
	createRoomBaseFx,
	removeRoomBaseFx,
	updateRoomBaseFx,
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
	clock: getRoomQuery.finished.success,
	fn: (data) => {
		return data.data.id;
	},
	target: $RoomId,
});
