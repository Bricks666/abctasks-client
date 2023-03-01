import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { activitiesApi, ActivitySphere, activitySphere } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';

const activitySpheres = createDomain();

const handlerFx = activitySpheres.effect(activitiesApi.getSpheres);

export const query = createQuery<
	void,
	StandardResponse<ActivitySphere[]>,
	Error,
	StandardResponse<ActivitySphere[]>,
	ActivitySphere[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(activitySphere))),
	mapData: dataExtractor,
});

cache(query);
