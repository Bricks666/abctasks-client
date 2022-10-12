import { createMutation, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array, Boolean } from 'runtypes';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse,
} from '@/types/response';
import {
	CreateGroupRequest,
	Group,
	group,
	RemoveGroupRequest,
	UpdateGroupRequest,
} from './types';
import {
	createGroupFx,
	getGroupsFx,
	removeGroupFx,
	updateGroupFx,
} from './units';
import { getIsSuccessResponseValidator } from '../validation/isSuccessResponse';
import { dataExtractor } from '../mapData/dataExtractor';

export const getGroupsQuery = createQuery<
	number,
	StandardResponse<Group[]>,
	Error,
	StandardSuccessResponse<Group[]>,
	Group[]
>({
	effect: getGroupsFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(group))),
	validate: getIsSuccessResponseValidator(),
	mapData: (data: StandardSuccessResponse<Group[]>) => dataExtractor(data),
});

export const createGroupMutation = createMutation<
	CreateGroupRequest,
	StandardResponse<Group>,
	StandardSuccessResponse<Group>,
	Error
>({
	effect: createGroupFx,
	contract: runtypeContract(getStandardSuccessResponse(group)),
});

export const updateGroupMutation = createMutation<
	UpdateGroupRequest,
	StandardResponse<Group>,
	StandardSuccessResponse<Group>,
	Error
>({
	effect: updateGroupFx,
	contract: runtypeContract(getStandardSuccessResponse(group)),
});

export const removeGroupMutation = createMutation<
	RemoveGroupRequest,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	Error
>({
	effect: removeGroupFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});
