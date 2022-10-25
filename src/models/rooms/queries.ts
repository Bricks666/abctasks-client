import { createQuery, createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array, Boolean } from 'runtypes';
import { StandardFailError } from '@/packages/request';
import {
	CreateRoomRequest,
	GetRoomsRequest,
	RemoveRoomRequest,
	UpdateRoomRequest,
} from '@/api';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse,
} from '@/types';
import { room, Room } from './types';
import {
	createRoomFx,
	removeRoomFx,
	getRoomFx,
	getRoomsFx,
	updateRoomFx,
} from './units';
import { dataExtractor } from '../mapData/dataExtractor';
import { getIsSuccessResponseValidator } from '../validation/isSuccessResponse';
import { WithoutAccess } from '../auth';

export const getRoomsQuery = createQuery<
	WithoutAccess<GetRoomsRequest>,
	StandardResponse<Room[]>,
	StandardFailError,
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
	StandardFailError,
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
	WithoutAccess<CreateRoomRequest>,
	StandardResponse<Room>,
	StandardSuccessResponse<Room>,
	StandardFailError
>({
	effect: createRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(room)),
});

export const updateRoomMutation = createMutation<
	WithoutAccess<UpdateRoomRequest>,
	StandardResponse<Room>,
	StandardSuccessResponse<Room>,
	StandardFailError
>({
	effect: updateRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(room)),
});

export const removeRoomMutation = createMutation<
	WithoutAccess<RemoveRoomRequest>,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: removeRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});
