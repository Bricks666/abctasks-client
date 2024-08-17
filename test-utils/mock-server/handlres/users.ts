/* eslint-disable import/no-extraneous-dependencies */
import { http } from 'msw';

import { users } from '../../fixtures';
import { BASE_URL } from '../constants';
import { createUrl, createStandardResponse } from '../utils';

const baseUsersUrl = createUrl(BASE_URL, 'users');
const getUsersUrl = baseUsersUrl;

export const success = {
	users: http.get(getUsersUrl, ({ request, }) => {
		const url = new URL(request.url);
		const username = url.searchParams.get('username') as string;

		const searchedUsers = users.filter((user) =>
			user.username.includes(username)
		);

		return createStandardResponse(searchedUsers);
	}),
};

export const standard = Object.values(success);
