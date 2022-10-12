/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { StandardResponse } from '@/types/response';
import {
	CreateGroupRequest,
	Group,
	GroupsMap,
	RemoveGroupRequest,
	UpdateGroupRequest,
} from './types';

export const GroupsDomain = createDomain('GroupsDomain');

export const $GroupsMap = GroupsDomain.store<GroupsMap>({});

export const getGroupsFx = GroupsDomain.effect<
	number,
	StandardResponse<Group[]>
>('getGroupsFx');
export const createGroupFx = GroupsDomain.effect<
	CreateGroupRequest,
	StandardResponse<Group>
>('createGroupFx');
export const updateGroupFx = GroupsDomain.effect<
	UpdateGroupRequest,
	StandardResponse<Group>
>('updateGroupFx');
export const removeGroupFx = GroupsDomain.effect<
	RemoveGroupRequest,
	StandardResponse<boolean>
>('deleteGroupFx');
