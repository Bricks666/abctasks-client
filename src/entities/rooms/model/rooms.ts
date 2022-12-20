import { cache } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { Array } from 'runtypes';
import { GetRoomsRequest, room, Room, roomsApi } from '@/shared/api';
import { controls, routes, getParams } from '@/shared/configs';
import {
	createQueryWithAccess,
	getIsSuccessResponseValidator,
	dataExtractor,
	StandardFailError
} from '@/shared/lib';
import {
	StandardResponse,
	getStandardSuccessResponse,
	StandardSuccessResponse
} from '@/shared/types';

export const roomsDomain = createDomain();
export const add = roomsDomain.event<Room>();
export const update = roomsDomain.event<Room>();
export const remove = roomsDomain.event<Pick<Room, 'id'>>();
export const $id = roomsDomain.store<null | number>(null);
export const handlerFx = roomsDomain.effect<
	GetRoomsRequest,
	StandardResponse<Room[]>,
	StandardFailError
>();

handlerFx.use(roomsApi.getAll);

export const query = createQueryWithAccess<
	GetRoomsRequest,
	StandardResponse<Room[]>,
	StandardFailError,
	StandardSuccessResponse<Room[]>,
	Room[]
>({
	initialValue: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(room))),
	validate: getIsSuccessResponseValidator(),
	mapData: dataExtractor,
});

cache(query);

querySync({
	controls,
	route: routes.rooms,
	source: {
		[getParams.roomId]: $id,
	},
});

sample({
	clock: add,
	source: query.$data,
	fn: (rooms, result) => [...rooms, result],
	target: query.$data,
});

sample({
	clock: update,
	source: query.$data,
	fn: (rooms, result) => {
		return rooms.map((room) => (room.id === result.id ? result : room));
	},
	target: query.$data,
});

sample({
	clock: remove,
	source: query.$data,
	fn: (rooms, { id, }) => {
		return rooms.filter((room) => room.id !== id);
	},
	target: query.$data,
});
