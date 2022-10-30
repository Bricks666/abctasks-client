/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { createGate } from 'effector-react';
import { StandardFailError } from '@/packages/request';
import {
	CreateGroupRequest,
	UpdateGroupRequest,
	RemoveGroupRequest,
} from '@/api';
import { StandardResponse, InRoomRequest } from '@/types';
import { attachWithAccessToken } from '../auth';
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

export const createGroupBaseFx = GroupsDomain.effect<
	CreateGroupRequest,
	StandardResponse<Group>,
	StandardFailError
>('createGroupBaseFx');
export const createGroupFx = attachWithAccessToken({
	effect: createGroupBaseFx,
	name: 'createGroupBaseFx',
});

export const updateGroupBaseFx = GroupsDomain.effect<
	UpdateGroupRequest,
	StandardResponse<Group>,
	StandardFailError
>('updateGroupBaseFx');
export const updateGroupFx = attachWithAccessToken({
	effect: updateGroupBaseFx,
	name: 'updateGroupBaseFx',
});

export const removeGroupBaseFx = GroupsDomain.effect<
	RemoveGroupRequest,
	StandardResponse<boolean>,
	StandardFailError
>('removeGroupBaseFx');
export const removeGroupFx = attachWithAccessToken({
	effect: removeGroupBaseFx,
	name: 'removeGroupBaseFx',
});

export const groupsGate = createGate<InRoomRequest>({
	domain: GroupsDomain,
	name: 'groupsGate',
});
