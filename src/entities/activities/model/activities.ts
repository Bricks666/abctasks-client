import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { Array } from 'runtypes';
import { activitiesApi } from '@/shared/api';
import { Activity, activity } from '@/shared/api/activities/types';
import { dataExtractor } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse,
	InRoomRequest
} from '@/shared/types';

const activitiesDomain = createDomain('ActivitiesDomain');
export const reset = activitiesDomain.event();
export const invalidateCache = activitiesDomain.event();
export const handlerFx = activitiesDomain.effect<
	number,
	StandardResponse<Activity[]>
>();
handlerFx.use(activitiesApi.getAll);

export const query = createQuery<
	number,
	StandardResponse<Activity[]>,
	Error,
	StandardSuccessResponse<Activity[]>,
	Activity[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(activity))),
	mapData: dataExtractor,
});

export const Gate = createGate<InRoomRequest>({
	domain: activitiesDomain,
});

sample({
	clock: reset,
	target: [query.reset, invalidateCache],
});

sample({
	clock: Gate.open,
	fn: ({ roomId, }) => roomId,
	target: query.start,
});

sample({
	clock: Gate.close,
	target: reset,
});
