import { InRoomParams, StandardResponse } from '@/shared/types';

import { User } from '../auth';
import { instance } from '../request';

import { RemoveUserParams } from './types';

export const getAll = async ({ roomId, }: InRoomParams) => {
	return instance.get(`members/${roomId}`).json<StandardResponse<User[]>>();
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
