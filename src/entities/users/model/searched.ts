import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { LoginSearchQuery, user, User, usersApi } from '@/shared/api';
import { dataExtractor, StandardFailError } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';

const searchedUsersDomain = createDomain();

const handlerFx = searchedUsersDomain.effect<
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
