import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { tag, Tag, tagsApi } from '@/shared/api';
import { controls, routes, getParams } from '@/shared/configs';
import { dataExtractor, StandardFailError } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';
import { GroupsMap } from './types';

export const groupsDomain = createDomain();

export const $id = groupsDomain.store<null | number>(null);
const handlerFx = groupsDomain.effect<
	number,
	StandardResponse<Tag[]>,
	StandardFailError
>();
handlerFx.use(tagsApi.getAll);

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
export const $groupsMap = query.$data.map((data) =>
	Object.values(data).reduce<GroupsMap>((map, group) => {
		map[group.id] = group;
		return map;
	}, {})
);

cache(query);

querySync({
	controls,
	route: routes.room.groups,
	source: {
		[getParams.tagId]: $id,
	},
});
