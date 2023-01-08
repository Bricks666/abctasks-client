import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { roomsApi, user, User } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import {
	getStandardSuccessResponse,
	InRoomRequest,
	StandardFailResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/shared/types';

const usersInRoom = createDomain();

const handlerFx = usersInRoom.effect<
	InRoomRequest,
	StandardResponse<User[]>,
	StandardFailResponse
>();

handlerFx.use(roomsApi.getUsers);

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
