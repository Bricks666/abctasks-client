import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import {
	Activity,
	activity,
	GetActivitiesInRoomParams,
	activitiesApi
} from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const activitiesDomain = createDomain();
const handlerFx = activitiesDomain.effect<
	GetActivitiesInRoomParams,
	StandardResponse<Activity[]>
>();
handlerFx.use(activitiesApi.getAll);

export const query = createQuery<
	GetActivitiesInRoomParams,
	StandardResponse<Activity[]>,
	Error,
	StandardResponse<Activity[]>,
	Activity[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(activity))),
	mapData: dataExtractor,
});
