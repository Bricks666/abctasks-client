import { createMutation, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array, Boolean } from 'runtypes';
import { StandardFailError } from '@/packages/request';
import {
	CreateGroupRequest,
	UpdateGroupRequest,
	RemoveGroupRequest,
} from '@/api';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse,
} from '@/types';
import { Group, group } from './types';
import {
	createGroupFx,
	getGroupsFx,
	removeGroupFx,
	updateGroupFx,
} from './units';
import { getIsSuccessResponseValidator } from '../validation/isSuccessResponse';
import { dataExtractor } from '../mapData/dataExtractor';
import { WithoutAccess } from '../auth';

export const getGroupsQuery = createQuery<
	number,
	StandardResponse<Group[]>,
	StandardFailError,
	StandardSuccessResponse<Group[]>,
	Group[]
>({
	effect: getGroupsFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(group))),
	validate: getIsSuccessResponseValidator(),
	mapData: (data: StandardSuccessResponse<Group[]>) => dataExtractor(data),
});

export const createGroupMutation = createMutation<
	WithoutAccess<CreateGroupRequest>,
	StandardResponse<Group>,
	StandardSuccessResponse<Group>,
	StandardFailError
>({
	effect: createGroupFx,
	contract: runtypeContract(getStandardSuccessResponse(group)),
});

export const updateGroupMutation = createMutation<
	WithoutAccess<UpdateGroupRequest>,
	StandardResponse<Group>,
	StandardSuccessResponse<Group>,
	StandardFailError
>({
	effect: updateGroupFx,
	contract: runtypeContract(getStandardSuccessResponse(group)),
});

export const removeGroupMutation = createMutation<
	WithoutAccess<RemoveGroupRequest>,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: removeGroupFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});
