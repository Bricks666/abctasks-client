import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';

import {
	Activity,
	activity,
	GetActivitiesInRoomParams,
	activitiesApi
} from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import {
	StandardResponse,
	getStandardResponse,
	PaginationResponse,
	getPaginationResponse
} from '@/shared/types';

const activitiesDomain = createDomain();
const handlerFx = activitiesDomain.effect<
	GetActivitiesInRoomParams,
	StandardResponse<PaginationResponse<Activity>>
>(activitiesApi.getAll);

export const query = createQuery<
	GetActivitiesInRoomParams,
	StandardResponse<PaginationResponse<Activity>>,
	Error,
	StandardResponse<PaginationResponse<Activity>>,
	PaginationResponse<Activity>
>({
	initialData: { items: [], totalCount: 0, limit: 50, },
	effect: handlerFx,
	contract: runtypeContract(
		getStandardResponse(getPaginationResponse(activity))
	),
	mapData: dataExtractor,
});

export const $hasItems = query.$data.map((data) => !!data.totalCount);
export const $pageCount = query.$data.map((data) =>
	Math.ceil(data.totalCount / data.limit)
);

cache(query);
