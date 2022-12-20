import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { Array } from 'runtypes';
import { group, Group, groupsApi } from '@/shared/api';
import { controls, routes, getParams } from '@/shared/configs';
import {
	getIsSuccessResponseValidator,
	dataExtractor,
	StandardFailError
} from '@/shared/lib';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/shared/types';
import { GroupsMap } from './types';

export const groupsDomain = createDomain();

export const add = groupsDomain.event<Group>();
export const update = groupsDomain.event<Group>();
export const remove = groupsDomain.event<Pick<Group, 'id'>>();
export const $id = groupsDomain.store<null | number>(null);
export const invalidateCache = groupsDomain.event();
export const reset = groupsDomain.event();
export const handlerFx = groupsDomain.effect<
	number,
	StandardResponse<Group[]>,
	StandardFailError
>();
handlerFx.use(groupsApi.getAll);

export const query = createQuery<
	number,
	StandardResponse<Group[]>,
	StandardFailError,
	StandardSuccessResponse<Group[]>,
	Group[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(group))),
	validate: getIsSuccessResponseValidator(),
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
	route: routes.room,
	source: {
		[getParams.groupId]: $id,
	},
});

sample({
	clock: reset,
	target: query.reset,
});

sample({
	clock: add,
	source: query.$data,
	fn: (groups, group) => [...groups, group],
	target: query.$data,
});

sample({
	clock: update,
	source: query.$data,
	fn: (groups, group) => groups.map((g) => (g.id === group.id ? group : g)),
	target: query.$data,
});

sample({
	clock: remove,
	source: query.$data,
	fn: (groups, { id, }) => groups.filter((group) => group.id !== id),
	target: query.$data,
});
