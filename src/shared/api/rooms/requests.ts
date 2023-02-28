import { AccessOptions, fetcher } from '@/shared/lib';
import { InRoomParams, StandardResponse } from '@/shared/types';
import { User } from '../auth';
import {
	AddUserRoomParams,
	AnswerInviteParams,
	CreateRoomParams,
	ExitRoomParams,
	GetLinkHashParams,
	InviteByHashParams,
	RemoveRoomParams,
	RemoveUserParams,
	Room,
	UpdateRoomParams
} from './types';

const roomsFetcher = fetcher.create({
	baseURL: 'rooms',
});

export const getAll = async ({ accessToken, }: AccessOptions) => {
	return roomsFetcher.get<StandardResponse<Room[]>>({
		accessToken,
		path: {
			url: '',
		},
	});
};

export const getOne = async (id: number) => {
	return roomsFetcher.get<StandardResponse<Room>>({
		path: {
			url: id,
		},
	});
};

export const create = async ({ accessToken, ...body }: CreateRoomParams) => {
	return roomsFetcher.post<StandardResponse<Room>>({
		path: {
			url: 'create',
		},
		accessToken,
		body,
	});
};

export const update = async ({
	id,
	accessToken,
	...body
}: UpdateRoomParams) => {
	return roomsFetcher.put<StandardResponse<Room>>({
		path: {
			url: [id, 'update'],
		},
		accessToken,
		body,
	});
};

export const remove = async ({ id, accessToken, }: RemoveRoomParams) => {
	return roomsFetcher.delete<StandardResponse<boolean>>({
		path: {
			url: [id, 'remove'],
		},
		accessToken,
	});
};

export const getMembers = async ({ roomId, }: InRoomParams) => {
	return roomsFetcher.get<StandardResponse<User[]>>({
		path: {
			url: [roomId, 'members'],
		},
	});
};

export const getInvited = async ({ roomId, }: InRoomParams) => {
	return roomsFetcher.get<StandardResponse<User[]>>({
		path: {
			url: [roomId, 'members', 'invited'],
		},
	});
};

export const invite = async ({
	id,
	userId,
	accessToken,
}: AddUserRoomParams) => {
	return roomsFetcher.put<StandardResponse<User>>({
		path: {
			url: [id, 'members', userId],
		},
		body: null,
		accessToken,
	});
};

export const getLinkHash = async ({ id, accessToken, }: GetLinkHashParams) => {
	return roomsFetcher.get<StandardResponse<string>>({
		path: {
			url: [id, 'members', 'link-hash'],
		},
		accessToken,
	});
};

export const approveInvite = async ({
	id,
	accessToken,
}: AnswerInviteParams) => {
	return roomsFetcher.put<StandardResponse<User>>({
		path: {
			url: [id, 'members', 'approve'],
		},
		body: null,
		accessToken,
	});
};

export const rejectInvite = async ({ id, accessToken, }: AnswerInviteParams) => {
	return roomsFetcher.put<StandardResponse<boolean>>({
		path: {
			url: [id, 'members', 'reject'],
		},
		body: null,
		accessToken,
	});
};

export const inviteByHash = async ({
	id,
	accessToken,
	token,
}: InviteByHashParams) => {
	return roomsFetcher.put<StandardResponse<boolean>>({
		path: {
			url: [id, 'members', token],
		},
		body: null,
		accessToken,
	});
};

export const exit = async ({ id, accessToken, }: ExitRoomParams) => {
	return roomsFetcher.delete<StandardResponse<boolean>>({
		path: {
			url: [id, 'members', 'exit'],
		},
		accessToken,
	});
};

export const removeUser = async ({
	id,
	userId,
	accessToken,
}: RemoveUserParams) => {
	return roomsFetcher.delete<StandardResponse<boolean>>({
		path: {
			url: [id, 'members', 'remove', userId],
		},
		accessToken,
	});
};
