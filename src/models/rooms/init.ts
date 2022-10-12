/* eslint-disable eqeqeq */
import { forward, sample } from 'effector';
import { roomsApi } from '@/api';
import {
	createRoomFx,
	removeRoomFx,
	updateRoomFx,
	getRoomFx,
	getRoomsFx,
	$RoomId,
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

forward({
	from: [
		removeRoomMutation.finished.success,
		updateRoomMutation.finished.success,
		createRoomMutation.finished.success,
	],
	to: getRoomsQuery.start,
});

sample({
	clock: getRoomQuery.finished.success,
	fn: (data) => {
		return data.data.id;
	},
	target: $RoomId,
});
