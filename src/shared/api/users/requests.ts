import { fetcher } from '@/shared/lib';
import { InRoomParams, StandardResponse } from '@/shared/types';
import { User } from '../auth';
import { SearchUsersQuery } from './types';

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

export const searchUsers = async (
	params: SearchUsersQuery
): Promise<StandardResponse<User[]>> => {
	return usersFetcher.get({
		path: {
			url: '',
			query: {
				username: params.username,
			},
		},
	});
};
