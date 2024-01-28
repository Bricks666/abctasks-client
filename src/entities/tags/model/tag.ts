import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';

import { GetTagParams, Tag, tag, tagsApi } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';

const tagDomain = createDomain();

const handlerFx = tagDomain.effect(tagsApi.getOne);

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
