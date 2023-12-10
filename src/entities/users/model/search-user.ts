import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, createEvent, sample } from 'effector';
import { debounce } from 'patronum';
import { Array } from 'runtypes';

import { SearchUsersQuery, user, User, usersApi } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';

const searchUserDomain = createDomain();

const handlerFx = searchUserDomain.effect<
	SearchUsersQuery,
	StandardResponse<User[]>,
	Error
>(usersApi.searchUsers);

export const query = createQuery<
	SearchUsersQuery,
	StandardResponse<User[]>,
	Error,
	StandardResponse<User[]>,
	User[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(user))),
	mapData: dataExtractor,
});

export const searchChanged = createEvent<string>();

const debouncedSearchChanged = debounce({
	source: searchChanged,
	timeout: 200,
});

sample({
	clock: debouncedSearchChanged,
	fn: (username) => ({ username, }),
	target: query.start,
});
