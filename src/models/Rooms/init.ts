/* eslint-disable eqeqeq */
import { guard, sample } from 'effector';
import { createRoomApi, deleteRoomApi, editRoomApi, getRoomsApi } from '@/api';
import {
	$Rooms,
	createRoom,
	createRoomFx,
	deleteRoom,
	deleteRoomFx,
	editRoom,
	editRoomFx,
	loadRooms,
	loadRoomsFx,
	resetRooms,
} from '.';
import { mayStartFxHandler } from '../handlers';
import { toValidRoom } from './utils';

loadRoomsFx.use(getRoomsApi);
deleteRoomFx.use(deleteRoomApi);
editRoomFx.use(editRoomApi);
createRoomFx.use(createRoomApi);

guard({
	clock: loadRooms,
	filter: mayStartFxHandler(loadRoomsFx.pending),
	target: loadRoomsFx,
});

sample({
	clock: loadRoomsFx.doneData,
	fn: ({ rooms }) => rooms.map(toValidRoom),
	target: $Rooms,
});

sample({
	clock: createRoom,
	filter: mayStartFxHandler(createRoomFx.pending),
	target: createRoomFx,
});
sample({
	source: $Rooms,
	clock: createRoomFx.doneData,
	fn: (rooms, { room }) => [...rooms, toValidRoom(room)],
	target: $Rooms,
});

sample({
	clock: editRoom,
	filter: mayStartFxHandler(editRoomFx.pending),
	target: editRoomFx,
});
sample({
	source: $Rooms,
	clock: editRoomFx.doneData,
	fn: (rooms, { room }) =>
		rooms.map((r) => (r.id == room.roomId ? toValidRoom(room) : r)),
	target: $Rooms,
});

sample({
	clock: deleteRoom,
	filter: mayStartFxHandler(deleteRoomFx.pending),
	target: deleteRoomFx,
});
sample({
	source: $Rooms,
	clock: deleteRoomFx.doneData,
	fn: (rooms, { roomId }) => rooms.filter((room) => room.id != roomId),
	target: $Rooms,
});
sample({
	clock: resetRooms,
	fn: () => [],
	target: $Rooms,
});
