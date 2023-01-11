import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { Array } from 'runtypes';
import { group, Group, groupsApi } from '@/shared/api';
import { controls, routes, getParams } from '@/shared/configs';
import { dataExtractor, StandardFailError } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';
import { GroupsMap } from './types';

export const groupsDomain = createDomain();

export const $id = groupsDomain.store<null | number>(null);
export const invalidateCache = groupsDomain.event();
export const reset = groupsDomain.event();
const handlerFx = groupsDomain.effect<
	number,
	StandardResponse<Group[]>,
	StandardFailError
>();
handlerFx.use(groupsApi.getAll);

export const query = createQuery<
	number,
	StandardResponse<Group[]>,
	StandardFailError,
	StandardResponse<Group[]>,
	Group[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(group))),

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
		[getParams.groupId]: $id,
	},
});

sample({
	clock: reset,
	target: query.reset,
});
