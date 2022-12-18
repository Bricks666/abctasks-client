import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { Array } from 'runtypes';
import { progress, Progress, progressApi } from '@/shared/api';
import {
	getIsSuccessResponseValidator,
	dataExtractor,
	StandardFailError
} from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse,
	InRoomRequest
} from '@/shared/types';

export const progressDomain = createDomain('ProgressDomain');

export const getProgressFx = progressDomain.effect<
	number,
	StandardResponse<Progress[]>,
	StandardFailError
>('getProgressFx');
getProgressFx.use(progressApi.getAll);

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

export const ProgressGate = createGate<InRoomRequest>({
	domain: progressDomain,
	name: 'progressGate',
});

sample({
	clock: ProgressGate.open,
	fn: ({ roomId, }) => roomId,
	target: getProgressQuery.start,
});
