import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { LoginSearchQuery, user, User, usersApi } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import {
	getStandardResponse,
	StandardFailResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/shared/types';

const usersInRoom = createDomain();

const handlerFx = usersInRoom.effect<
	LoginSearchQuery,
	StandardResponse<User[]>,
	StandardFailResponse
>();

handlerFx.use(usersApi.getAllIncludeLogin);

export const query = createQuery<
	LoginSearchQuery,
	StandardResponse<User[]>,
	StandardFailResponse,
	StandardSuccessResponse<User[]>,
	User[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(user))),
	mapData: dataExtractor,
});
