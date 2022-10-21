import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array } from 'runtypes';
import { StandardFailError } from '@/packages/request';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse,
} from '@/types/response';
import { dataExtractor } from '../mapData/dataExtractor';
import { getIsSuccessResponseValidator } from '../validation/isSuccessResponse';
import { Progress, progress } from './types';
import { getProgressFx } from './units';

export const getProgressQuery = createQuery<
	number,
	StandardResponse<Progress[]>,
	StandardFailError,
	StandardSuccessResponse<Progress[]>,
	Progress[]
>({
	effect: getProgressFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(progress))),
	validate: getIsSuccessResponseValidator(),
	mapData: dataExtractor,
});
