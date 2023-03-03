import { InRoomParams, StandardResponse } from '@/shared/types';
import { User } from '../auth';
import { instance } from '../request';
import {
	AddUserRoomParams,
	InviteByHashParams,
	RemoveUserParams
} from './types';

export const getAll = async ({ roomId, }: InRoomParams) => {
	return instance
		.get(`rooms/${roomId}/members`)
		.json<StandardResponse<User[]>>();
};

export const getAllInvited = async ({ roomId, }: InRoomParams) => {
	return instance
		.get(`rooms/${roomId}/members/invited`)
		.json<StandardResponse<User[]>>();
};

export const invite = async ({ roomId, userId, }: AddUserRoomParams) => {
	return instance
		.put(`rooms/${roomId}/members/${userId}`)
		.json<StandardResponse<User>>();
};

export const getLinkHash = async ({ roomId, }: InRoomParams) => {
	return instance
		.get(`rooms/${roomId}/members/link-hash`)
		.json<StandardResponse<string>>();
};

export const approveInvite = async ({ roomId, }: InRoomParams) => {
	return instance
		.put(`rooms/${roomId}/members/approve`)
		.json<StandardResponse<User>>();
};

export const rejectInvite = async ({ roomId, }: InRoomParams) => {
	return instance
		.put(`rooms/${roomId}/members/reject`)
		.json<StandardResponse<boolean>>();
};

export const inviteByHash = async ({ roomId, token, }: InviteByHashParams) => {
	return instance
		.put(`rooms/${roomId}/members/${token}`)
		.json<StandardResponse<boolean>>();
};

export const exit = async ({ roomId, }: InRoomParams) => {
	return instance
		.delete(`rooms/${roomId}/members/exit`)
		.json<StandardResponse<boolean>>();
};

export const remove = async ({ roomId, userId, }: RemoveUserParams) => {
	return instance
		.delete(`rooms/${roomId}/members/remove/${userId}`)
		.json<StandardResponse<boolean>>();
};
