import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array, Boolean } from 'runtypes';
import { createMutationWithAccess, createQueryWithAccess } from '../fabrics';
import { dataExtractor, getIsSuccessResponseValidator } from '../utils';
import { room, Room } from './types';
import {
	getRoomFx,
	getRoomsFx,
	removeRoomFx,
	createRoomFx,
	updateRoomFx
} from './units';
import {
	CreateRoomRequest,
	GetRoomsRequest,
	RemoveRoomRequest,
	UpdateRoomRequest
} from '@/api';
import { StandardFailError } from '@/packages';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/types';

export const getRoomsQuery = createQueryWithAccess<
	GetRoomsRequest,
	StandardResponse<Room[]>,
	StandardFailError,
	StandardSuccessResponse<Room[]>,
	Room[]
>({
	effect: getRoomsFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(room))),
	validate: getIsSuccessResponseValidator(),
	mapData: dataExtractor,
});

export const getRoomQuery = createQuery<
	number,
	StandardResponse<Room>,
	StandardFailError,
	StandardSuccessResponse<Room>,
	Room
>({
	effect: getRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(room)),
	validate: getIsSuccessResponseValidator(),
	mapData: dataExtractor,
});

export const createRoomMutation = createMutationWithAccess<
	CreateRoomRequest,
	StandardResponse<Room>,
	StandardSuccessResponse<Room>,
	StandardFailError
>({
	effect: createRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(room)),
});

export const updateRoomMutation = createMutationWithAccess<
	UpdateRoomRequest,
	StandardResponse<Room>,
	StandardSuccessResponse<Room>,
	StandardFailError
>({
	effect: updateRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(room)),
});

export const removeRoomMutation = createMutationWithAccess<
	RemoveRoomRequest,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: removeRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});
