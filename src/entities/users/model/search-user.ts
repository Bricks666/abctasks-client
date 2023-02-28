import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, createEvent, sample } from 'effector';
import { debounce } from 'patronum';
import { Array } from 'runtypes';
import { SearchUsersQuery, user, User, usersApi } from '@/shared/api';
import { dataExtractor, StandardFailError } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';

const searchUserDomain = createDomain();

const handlerFx = searchUserDomain.effect<
	SearchUsersQuery,
	StandardResponse<User[]>,
	StandardFailError
>(usersApi.searchUsers);

export const query = createQuery<
	SearchUsersQuery,
	StandardResponse<User[]>,
	StandardFailError,
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
	fn: (login) => ({ login, }),
	target: query.start,
});
