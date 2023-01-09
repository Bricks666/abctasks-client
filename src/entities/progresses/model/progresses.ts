import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { Array } from 'runtypes';
import { progress, Progress, progressApi } from '@/shared/api';
import { dataExtractor, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardResponse,
	InRoomParams
} from '@/shared/types';

export const progressDomain = createDomain();

const handlerFx = progressDomain.effect<
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
	contract: runtypeContract(getStandardResponse(Array(progress))),

	mapData: dataExtractor,
});

export const Gate = createGate<InRoomParams>({
	domain: progressDomain,
});

sample({
	clock: Gate.open,
	fn: ({ roomId, }) => roomId,
	target: query.start,
});
