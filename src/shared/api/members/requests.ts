import { InRoomParams, StandardResponse } from '@/shared/types';

import { User } from '../auth';
import { instance } from '../request';

import {
	AddUserRoomParams,
	InviteByHashParams,
	RemoveUserParams
} from './types';

export const getAll = async ({ roomId, }: InRoomParams) => {
	return instance.get(`members/${roomId}`).json<StandardResponse<User[]>>();
};

export const getAllInvited = async ({ roomId, }: InRoomParams) => {
	return instance
		.get(`members/${roomId}/invited`)
		.json<StandardResponse<User[]>>();
};

export const invite = async ({ roomId, userId, }: AddUserRoomParams) => {
	return instance
		.put(`members/${roomId}/invite/${userId}`)
		.json<StandardResponse<User>>();
};

export const getLinkHash = async ({ roomId, }: InRoomParams) => {
	return instance
		.get(`members/${roomId}/invite/generate-link`)
		.json<StandardResponse<string>>();
};

export const approveInvite = async ({ roomId, }: InRoomParams) => {
	return instance
		.put(`members/${roomId}/invitation/approve`)
		.json<StandardResponse<User>>();
};

export const rejectInvite = async ({ roomId, }: InRoomParams) => {
	return instance
		.put(`members/${roomId}/invitation/reject`)
		.json<StandardResponse<boolean>>();
};

export const inviteByHash = async ({ roomId, token, }: InviteByHashParams) => {
	return instance
		.put(`members/${roomId}/${token}`)
		.json<StandardResponse<boolean>>();
};

export const exit = async ({ roomId, }: InRoomParams) => {
	return instance
		.delete(`members/${roomId}/exit`)
		.json<StandardResponse<boolean>>();
};

export const remove = async ({ roomId, userId, }: RemoveUserParams) => {
	return instance
		.delete(`members/${roomId}/remove/${userId}`)
		.json<StandardResponse<boolean>>();
};
