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
	ItemsResponse,
	getItemsResponse
} from '@/shared/types';

const activitiesDomain = createDomain();
const handlerFx = activitiesDomain.effect<
	GetActivitiesInRoomParams,
	StandardResponse<ItemsResponse<Activity>>
>();
handlerFx.use(activitiesApi.getAll);

export const query = createQuery<
	GetActivitiesInRoomParams,
	StandardResponse<ItemsResponse<Activity>>,
	Error,
	StandardResponse<ItemsResponse<Activity>>,
	ItemsResponse<Activity>
>({
	initialData: { items: [], totalCount: 0, limit: 50, },
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(getItemsResponse(activity))),
	mapData: dataExtractor,
});

cache(query);
