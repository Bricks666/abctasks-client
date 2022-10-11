/* eslint-disable eqeqeq */
import { forward } from 'effector';
import { roomsApi } from '@/api';
import {
	createRoomFx,
	deleteRoomFx,
	updateRoomFx,
	loadRoomFx,
	loadRoomsFx,
} from './units';
import {
	createRoomMutation,
	deleteRoomMutation,
	loadRoomsQuery,
	updateRoomMutation,
} from './queries';

loadRoomsFx.use(roomsApi.getAll);
loadRoomFx.use(roomsApi.getOne);
deleteRoomFx.use(roomsApi.remove);
updateRoomFx.use(roomsApi.update);
createRoomFx.use(roomsApi.create);

forward({
	from: [
		deleteRoomMutation.finished.success,
		updateRoomMutation.finished.success,
		createRoomMutation.finished.success,
	],
	to: loadRoomsQuery.start,
});
