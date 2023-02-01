import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { Room, roomsApi, room } from '@/shared/api';
import { StandardFailError, dataExtractor } from '@/shared/lib';
import {
	StandardResponse,
	getStandardResponse,
	InRoomParams
} from '@/shared/types';

const roomDomain = createDomain();
const handlerFx = roomDomain.effect<
	number,
	StandardResponse<Room>,
	StandardFailError
>(roomsApi.getOne);

export const query = createQuery<
	number,
	StandardResponse<Room>,
	StandardFailError,
	StandardResponse<Room>,
	Room
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(room)),

	mapData: dataExtractor,
});

export const Gate = createGate<InRoomParams>({
	domain: roomDomain,
});

sample({
	clock: Gate.state,
	fn: ({ roomId, }) => roomId,
	target: query.start,
});

sample({
	clock: Gate.close,
	target: query.reset,
});
