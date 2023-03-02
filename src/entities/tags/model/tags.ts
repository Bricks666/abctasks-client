import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { tag, Tag, tagsApi } from '@/shared/api';
import { controls, routes, getParams } from '@/shared/configs';
import { dataExtractor, StandardFailError } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';
import { TagsMap } from './types';

export const tagsDomain = createDomain();

export const $id = tagsDomain.store<null | number>(null);
const handlerFx = tagsDomain.effect<
	number,
	StandardResponse<Tag[]>,
	StandardFailError
>(tagsApi.getAll);

export const query = createQuery<
	number,
	StandardResponse<Tag[]>,
	StandardFailError,
	StandardResponse<Tag[]>,
	Tag[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(tag))),
	mapData: dataExtractor,
});
export const $tagsMap = query.$data.map((data) =>
	Object.values(data).reduce<TagsMap>((map, tag) => {
		map[tag.id] = tag;
		return map;
	}, {})
);

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
