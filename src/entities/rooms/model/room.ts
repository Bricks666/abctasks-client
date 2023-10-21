import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

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

export const $canChange = query.$data.map((room) => room?.canChange || false);

export const Gate = createGate<InRoomParams>({
	domain: roomDomain,
});

sample({
	clock: Gate.state,
	filter: ({ roomId, }) => Boolean(roomId),
	target: query.start,
});

sample({
	clock: Gate.close,
	target: query.reset,
});
