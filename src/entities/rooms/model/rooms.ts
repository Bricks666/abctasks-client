import { cache, createQuery, keepFresh } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect } from 'effector';
import { interval } from 'patronum';
import { Array } from 'runtypes';

import { room, Room, roomsApi } from '@/shared/api';
import { extractData } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(roomsApi.getAll);

export const query = createQuery<
	void,
	StandardResponse<Room[]>,
	Error,
	StandardResponse<Room[]>,
	Room[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(room))),

	mapData: extractData,
});

cache(query);

keepFresh(query, {
	triggers: [interval({ timeout: 5000, })],
});
