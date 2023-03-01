import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { activitiesApi, ActivityAction, activityAction } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';

const activityActions = createDomain();

const handlerFx = activityActions.effect(activitiesApi.getActions);

export const query = createQuery<
	void,
	StandardResponse<ActivityAction[]>,
	Error,
	StandardResponse<ActivityAction[]>,
	ActivityAction[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(activityAction))),
	mapData: dataExtractor,
});

cache(query);
