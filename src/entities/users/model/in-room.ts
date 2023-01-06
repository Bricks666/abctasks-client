import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Array } from 'runtypes';
import { user, User, usersApi } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import {
	getStandardSuccessResponse,
	InRoomRequest,
	StandardFailResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/shared/types';

const usersInRoom = createDomain();

export const add = usersInRoom.event<User>();

const handlerFx = usersInRoom.effect<
	InRoomRequest,
	StandardResponse<User[]>,
	StandardFailResponse
>();

handlerFx.use(usersApi.getAllInRoom);

export const query = createQuery<
	InRoomRequest,
	StandardResponse<User[]>,
	StandardFailResponse,
	StandardSuccessResponse<User[]>,
	User[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(user))),
	mapData: dataExtractor,
});

sample({
	clock: add,
	source: query.$data,
	fn: (users, user) => [...users, user],
	target: query.$data,
});
