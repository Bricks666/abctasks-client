import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, createEvent, sample } from 'effector';
import { debounce } from 'patronum';
import { Array } from 'runtypes';

import { SearchUsersQuery, user, UserDto, usersApi } from '@/shared/api';
import { extractData } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';

/**
 * Move into `features` layer
 */
const searchUserDomain = createDomain();

const handlerFx = searchUserDomain.effect<
	SearchUsersQuery,
	StandardResponse<UserDto[]>,
	Error
>(usersApi.searchUsers);

export const query = createQuery<
	SearchUsersQuery,
	StandardResponse<UserDto[]>,
	Error,
	StandardResponse<UserDto[]>,
	UserDto[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(user))),
	mapData: extractData,
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
