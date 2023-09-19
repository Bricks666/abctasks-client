import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain } from 'effector';
import { Array } from 'runtypes';

import { tag, Tag, tagsApi } from '@/shared/api';
import { controls, routes, getParams } from '@/shared/configs';
import { dataExtractor } from '@/shared/lib';
import {
	getStandardResponse,
	InRoomParams,
	StandardResponse
} from '@/shared/types';

export const tagsDomain = createDomain();

export const $id = tagsDomain.store<null | number>(null);
const handlerFx = tagsDomain.effect(tagsApi.getAll);

export const query = createQuery<
	InRoomParams,
	StandardResponse<Tag[]>,
	Error,
	StandardResponse<Tag[]>,
	Tag[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(tag))),
	mapData: dataExtractor,
});

cache(query);

/**
 * TODO: Вынести на уровень страницы
 */
querySync({
	controls,
	route: routes.room.tags,
	source: {
		[getParams.tagId]: $id,
	},
});
