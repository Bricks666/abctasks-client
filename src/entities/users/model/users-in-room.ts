import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { roomsApi, user, User } from '@/shared/api';
import { dataExtractor, StandardFailError } from '@/shared/lib';
import {
	getStandardResponse,
	InRoomParams,
	StandardResponse
} from '@/shared/types';

const usersInRoom = createDomain();

const handlerFx = usersInRoom.effect<
	InRoomParams,
	StandardResponse<User[]>,
	StandardFailError
>();

handlerFx.use(roomsApi.getUsers);

export const query = createQuery<
	InRoomParams,
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

export const $ids = query.$data.map((users) => users.map((user) => user.id));
export const $count = query.$data.map((users) => users.length);
export const $hasError = query.$error.map((error) => !!error);
