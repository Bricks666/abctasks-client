import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { progress, Progress, progressApi } from '@/shared/api';
import { dataExtractor, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	getStandardResponse,
	InRoomParams
} from '@/shared/types';

export const progressDomain = createDomain();

const handlerFx = progressDomain.effect<
	InRoomParams,
	StandardResponse<Progress[]>,
	StandardFailError
>(progressApi.getAll);

export const query = createQuery<
	InRoomParams,
	StandardResponse<Progress[]>,
	StandardFailError,
	StandardResponse<Progress[]>,
	Progress[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(progress))),
	mapData: dataExtractor,
});

cache(query);
