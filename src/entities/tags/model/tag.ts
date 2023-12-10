import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { GetTagParams, Tag, tag, tagsApi } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';

const tagDomain = createDomain();

const handlerFx = tagDomain.effect<GetTagParams, StandardResponse<Tag>, Error>(
	tagsApi.getOne
);

export const query = createQuery<
	GetTagParams,
	StandardResponse<Tag>,
	Error,
	StandardResponse<Tag>,
	Tag
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(tag)),
	mapData: dataExtractor,
});

export const Gate = createGate<GetTagParams>();

sample({
	clock: Gate.open,
	target: query.start,
});

sample({
	clock: Gate.close,
	target: query.reset,
});
