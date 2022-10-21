/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { StandardFailError } from '@/packages/request';
import {
	CreateGroupRequest,
	UpdateGroupRequest,
	RemoveGroupRequest,
} from '@/api';
import { StandardResponse } from '@/types/response';
import { attachWithAccessToken } from '../auth';
import { Group } from './types';

export const GroupsDomain = createDomain('GroupsDomain');

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
