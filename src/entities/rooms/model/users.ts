import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { roomsApi, user, User } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import {
	getStandardResponse,
	InRoomParams,
	StandardFailResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/shared/types';

const usersInRoom = createDomain();

const handlerFx = usersInRoom.effect<
	InRoomParams,
	StandardResponse<User[]>,
	StandardFailResponse
>();

handlerFx.use(roomsApi.getUsers);

export const query = createQuery<
	InRoomParams,
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
