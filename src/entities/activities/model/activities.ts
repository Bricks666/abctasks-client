import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { activitiesApi } from '@/shared/api';
import { Activity, activity } from '@/shared/api/activities/types';
import { dataExtractor } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const activitiesDomain = createDomain();
const handlerFx = activitiesDomain.effect<
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
