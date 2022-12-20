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

export const progressDomain = createDomain();

export const handlerFx = progressDomain.effect<
	number,
	StandardResponse<Progress[]>,
	StandardFailError
>();
handlerFx.use(progressApi.getAll);

export const query = createQuery<
	number,
	StandardResponse<Progress[]>,
	StandardFailError,
	StandardSuccessResponse<Progress[]>,
	Progress[]
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(progress))),
	validate: getIsSuccessResponseValidator(),
	mapData: dataExtractor,
});

export const Gate = createGate<InRoomRequest>({
	domain: progressDomain,
});

sample({
	clock: Gate.open,
	fn: ({ roomId, }) => roomId,
	target: query.start,
});
