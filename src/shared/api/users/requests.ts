import queryString from 'query-string';

import { instance } from '../request';

import { GetUsersRequestParams, GetUsersResponseData } from './types';

export const getUsers = async (
	query: GetUsersRequestParams,
	signal?: AbortSignal
): GetUsersResponseData => {
	return instance
		.get('users', {
			searchParams: new URLSearchParams(queryString.stringify(query)),
			signal,
		})
		.json();
};
