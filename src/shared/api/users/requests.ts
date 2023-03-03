import { StandardResponse } from '@/shared/types';
import { User } from '../auth';
import { instance, normalizeQuery } from '../request';
import { SearchUsersQuery } from './types';

export const searchUsers = async (query: SearchUsersQuery) => {
	return instance
		.get('users', {
			searchParams: new URLSearchParams(normalizeQuery(query)),
		})
		.json<StandardResponse<User[]>>();
};
