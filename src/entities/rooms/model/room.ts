import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';

import { Room, roomsApi, room } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import {
	StandardResponse,
	getStandardResponse,
	InRoomParams
} from '@/shared/types';

const roomDomain = createDomain();
const handlerFx = roomDomain.effect(roomsApi.getOne);

export const query = createQuery<
	InRoomParams,
	StandardResponse<Room>,
	Error,
	StandardResponse<Room>,
	Room
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(room)),

	mapData: dataExtractor,
});

export const $canChange = query.$data.map((room) => room?.canChange ?? false);

cache(query);
