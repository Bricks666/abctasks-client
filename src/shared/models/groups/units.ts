/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import {
	CreateGroupRequest,
	UpdateGroupRequest,
	RemoveGroupRequest
} from '@/shared/api';
import { StandardFailError } from '@/shared/packages';
import { StandardResponse, InRoomRequest } from '@/shared/types';
import { Group, GroupsMap } from './types';

export const GroupsDomain = createDomain('GroupsDomain');

export const $GroupsMap = GroupsDomain.store<GroupsMap>(
	{},
	{
		name: 'GroupsMap',
	}
);

export const getGroupsFx = GroupsDomain.effect<
	number,
	StandardResponse<Group[]>,
	StandardFailError
>('getGroupsFx');

export const createGroupFx = GroupsDomain.effect<
	CreateGroupRequest,
	StandardResponse<Group>,
	StandardFailError
>('createGroupFx');

export const updateGroupFx = GroupsDomain.effect<
	UpdateGroupRequest,
	StandardResponse<Group>,
	StandardFailError
>('updateGroupFx');

export const removeGroupFx = GroupsDomain.effect<
	RemoveGroupRequest,
	StandardResponse<boolean>,
	StandardFailError
>('removeGroupFx');

export const GroupsGate = createGate<InRoomRequest>({
	domain: GroupsDomain,
	name: 'groupsGate',
});
