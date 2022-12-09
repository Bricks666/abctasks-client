import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array } from 'runtypes';
import { dataExtractor } from '../utils/dataExtractor';
import { activity, Activity } from './types';
import { getActivitiesFx } from './units';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/types';

export const getActivitiesQuery = createQuery<
	number,
	StandardResponse<Activity[]>,
	Error,
	StandardSuccessResponse<Activity[]>,
	Activity[]
>({
	effect: getActivitiesFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(activity))),
	mapData: dataExtractor,
});
