import { fetcher } from '@/shared/lib';
import { InRoomParams, StandardResponse } from '@/shared/types';
import { User } from '../auth';
import { LoginSearchQuery } from './types';

const usersFetcher = fetcher.create({
	baseURL: 'users',
});

export const getAllInRoom = async (
	params: InRoomParams
): Promise<StandardResponse<User[]>> => {
	return usersFetcher.get({
		path: {
			url: '',
			query: {
				roomId: params.roomId.toString(),
			},
		},
	});
};

export const getAllIncludeLogin = async (
	params: LoginSearchQuery
): Promise<StandardResponse<User[]>> => {
	return usersFetcher.get({
		path: {
			url: '',
			query: {
				login: params.login,
			},
		},
	});
};
