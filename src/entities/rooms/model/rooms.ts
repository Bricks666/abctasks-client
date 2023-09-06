import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain } from 'effector';
import { Array } from 'runtypes';

import { room, Room, roomsApi } from '@/shared/api';
import { controls, routes, getParams } from '@/shared/configs';
import { dataExtractor } from '@/shared/lib';
import {
	StandardResponse,
	getStandardResponse,
	InRoomParams
} from '@/shared/types';

export const roomsDomain = createDomain();
export const $id = roomsDomain.store<null | number>(null);
const handlerFx = roomsDomain.effect<
	InRoomParams,
	StandardResponse<Room[]>,
	Error
>(roomsApi.getAll);

export const query = createQuery<
	InRoomParams,
	StandardResponse<Room[]>,
	Error,
	StandardResponse<Room[]>,
	Room[]
>({
	initialData: [],
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
