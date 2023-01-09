import { cache } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { GetRoomsParams, room, Room, roomsApi } from '@/shared/api';
import { controls, routes, getParams } from '@/shared/configs';
import {
	createQueryWithAccess,
	dataExtractor,
	StandardFailError
} from '@/shared/lib';
import {
	StandardResponse,
	getStandardResponse,
	StandardSuccessResponse
} from '@/shared/types';

export const roomsDomain = createDomain();
export const $id = roomsDomain.store<null | number>(null);
const handlerFx = roomsDomain.effect<
	GetRoomsParams,
	StandardResponse<Room[]>,
	StandardFailError
>();

handlerFx.use(roomsApi.getAll);

export const query = createQueryWithAccess<
	GetRoomsParams,
	StandardResponse<Room[]>,
	StandardFailError,
	StandardSuccessResponse<Room[]>,
	Room[]
>({
	initialValue: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(room))),

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
