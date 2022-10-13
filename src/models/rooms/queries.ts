import { createQuery, createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array, Boolean } from 'runtypes';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse,
} from '@/types/response';
import { getIsSuccessResponseValidator } from '../validation/isSuccessResponse';
import { CreateRoomRequest, room, Room, UpdateRoomRequest } from './types';
import {
	createRoomFx,
	removeRoomFx,
	getRoomFx,
	getRoomsFx,
	updateRoomFx,
} from './units';
import { dataExtractor } from '../mapData/dataExtractor';

export const getRoomsQuery = createQuery<
	void,
	StandardResponse<Room[]>,
	Error,
	StandardSuccessResponse<Room[]>,
	Room[]
>({
	effect: getRoomsFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(room))),
	validate: getIsSuccessResponseValidator(),
	mapData: (response: StandardSuccessResponse<Room[]>) =>
		dataExtractor<Room[]>(response),
});

export const getRoomQuery = createQuery<
	number,
	StandardResponse<Room>,
	Error,
	StandardSuccessResponse<Room>,
	Room
>({
	effect: getRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(room)),
	validate: getIsSuccessResponseValidator(),
	mapData: (response: StandardSuccessResponse<Room>) =>
		dataExtractor<Room>(response),
});

export const createRoomMutation = createMutation<
	CreateRoomRequest,
	StandardResponse<Room>,
	StandardSuccessResponse<Room>,
	Error
>({
	effect: createRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(room)),
});

export const updateRoomMutation = createMutation<
	UpdateRoomRequest,
	StandardResponse<Room>,
	StandardSuccessResponse<Room>,
	Error
>({
	effect: updateRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(room)),
});

export const removeRoomMutation = createMutation<
	number,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	Error
>({
	effect: removeRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});
