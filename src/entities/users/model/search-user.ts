import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, createEvent, sample } from 'effector';
import { debounce } from 'patronum';
import { Array } from 'runtypes';
import { LoginSearchQuery, user, User, usersApi } from '@/shared/api';
import { dataExtractor, StandardFailError } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';

const searchUserDomain = createDomain();

const handlerFx = searchUserDomain.effect<
	LoginSearchQuery,
	StandardResponse<User[]>,
	StandardFailError
>(usersApi.getAllIncludeLogin);

export const query = createQuery<
	LoginSearchQuery,
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
