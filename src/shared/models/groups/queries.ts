import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array, Boolean } from 'runtypes';
import { createMutationWithAccess } from '../fabrics';
import { dataExtractor, getIsSuccessResponseValidator } from '../utils';
import { Group, group } from './types';
import {
	createGroupFx,
	getGroupsFx,
	removeGroupFx,
	updateGroupFx
} from './units';
import {
	CreateGroupRequest,
	UpdateGroupRequest,
	RemoveGroupRequest
} from '@/api';
import { StandardFailError } from '@/packages';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/types';

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

export const createGroupMutation = createMutationWithAccess<
	CreateGroupRequest,
	StandardResponse<Group>,
	StandardSuccessResponse<Group>,
	StandardFailError
>({
	effect: createGroupFx,
	contract: runtypeContract(getStandardSuccessResponse(group)),
});

export const updateGroupMutation = createMutationWithAccess<
	UpdateGroupRequest,
	StandardResponse<Group>,
	StandardSuccessResponse<Group>,
	StandardFailError
>({
	effect: updateGroupFx,
	contract: runtypeContract(getStandardSuccessResponse(group)),
});

export const removeGroupMutation = createMutationWithAccess<
	RemoveGroupRequest,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: removeGroupFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});
