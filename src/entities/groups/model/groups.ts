import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { Array } from 'runtypes';
import { group, Group, groupsApi } from '@/shared/api';
import {
	getIsSuccessResponseValidator,
	dataExtractor
} from '@/shared/models/utils';
import { StandardFailError } from '@/shared/packages';
import {
	getStandardSuccessResponse,
	InRoomRequest,
	StandardResponse,
	StandardSuccessResponse
} from '@/shared/types';

export const groupsDomain = createDomain('GroupsDomain');

export interface GroupsMap {
	[id: number]: Group | undefined;
}

export const $groupsMap = groupsDomain.store<GroupsMap>(
	{},
	{
		name: 'GroupsMap',
	}
);
export const invalidateCache = groupsDomain.event();
export const getGroupsFx = groupsDomain.effect<
	number,
	StandardResponse<Group[]>,
	StandardFailError
>('getGroupsFx');
getGroupsFx.use(groupsApi.getAll);

export const getGroupsQuery = createQuery<
	number,
	StandardResponse<Group[]>,
	StandardFailError,
	StandardSuccessResponse<Group[]>,
	Group[]
>({
	initialData: [],
	effect: getGroupsFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(group))),
	validate: getIsSuccessResponseValidator(),
	mapData: dataExtractor,
});

export const GroupsGate = createGate<InRoomRequest>({
	domain: groupsDomain,
	name: 'groupsGate',
});

sample({
	clock: GroupsGate.open,
	fn: ({ roomId, }) => roomId,
	target: getGroupsQuery.start,
});

sample({
	clock: GroupsGate.close,
	target: invalidateCache,
});

sample({
	source: getGroupsQuery.$data,
	fn: (data) =>
		Object.values(data).reduce<GroupsMap>((map, group) => {
			map[group.id] = group;
			return map;
		}, {}),
	target: $groupsMap,
});

cache(getGroupsQuery, {
	staleAfter: '15min',
	purge: invalidateCache,
});
