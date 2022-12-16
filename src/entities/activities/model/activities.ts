import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { Array } from 'runtypes';
import { activitiesApi } from '@/shared/api';
import { Activity, activity } from '@/shared/api/activities/types';
import { dataExtractor } from '@/shared/models/utils';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse,
	InRoomRequest
} from '@/shared/types';

export const activitiesDomain = createDomain('ActivitiesDomain');

export const getActivitiesFx = activitiesDomain.effect<
	number,
	StandardResponse<Activity[]>
>('getActivitiesFx');
getActivitiesFx.use(activitiesApi.getAll);

export const getActivitiesQuery = createQuery<
	number,
	StandardResponse<Activity[]>,
	Error,
	StandardSuccessResponse<Activity[]>,
	Activity[]
>({
	initialData: [],
	effect: getActivitiesFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(activity))),
	mapData: dataExtractor,
});

export const ActivityGate = createGate<InRoomRequest>({
	domain: activitiesDomain,
	name: 'activitiesGate',
});

sample({
	clock: ActivityGate.open,
	fn: ({ roomId, }) => roomId,
	target: getActivitiesQuery.start,
});
