import { createQuery, createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array, Boolean } from 'runtypes';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse,
} from '@/types/response';
import { getIsSuccessResponseValidator } from '../validation/isSuccessResponse';
import {
	CreateRoomRequest,
	Room,
	roomResponse,
	RoomResponse,
	UpdateRoomRequest,
} from './types';
import {
	createRoomFx,
	removeRoomFx,
	getRoomFx,
	getRoomsFx,
	updateRoomFx,
} from './units';
import { converter } from './utils';
import { dataExtractor } from '../mapData/dataExtractor';

export const getRoomsQuery = createQuery<
	void,
	StandardResponse<RoomResponse[]>,
	Error,
	StandardSuccessResponse<RoomResponse[]>,
	Room[]
>({
	effect: getRoomsFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(roomResponse))),
	validate: getIsSuccessResponseValidator(),
	mapData: (response: StandardSuccessResponse<RoomResponse[]>) =>
		dataExtractor<RoomResponse[]>(response).map(converter),
});

export const getRoomQuery = createQuery<
	number,
	StandardResponse<RoomResponse>,
	Error,
	StandardSuccessResponse<RoomResponse>,
	Room
>({
	effect: getRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(roomResponse)),
	validate: getIsSuccessResponseValidator(),
	mapData: (response: StandardSuccessResponse<RoomResponse>) =>
		converter(dataExtractor<RoomResponse>(response)),
});

export const createRoomMutation = createMutation<
	CreateRoomRequest,
	StandardResponse<RoomResponse>,
	StandardSuccessResponse<RoomResponse>,
	Error
>({
	effect: createRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(roomResponse)),
});

export const updateRoomMutation = createMutation<
	UpdateRoomRequest,
	StandardResponse<RoomResponse>,
	StandardSuccessResponse<RoomResponse>,
	Error
>({
	effect: updateRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(roomResponse)),
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
