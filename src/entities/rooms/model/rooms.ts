import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { Array } from 'runtypes';
import { GetRoomsRequest, room, Room, roomsApi } from '@/shared/api';
import { controls, routes } from '@/shared/configs';
import { getParams } from '@/shared/const';
import { createQueryWithAccess } from '@/shared/lib';
import {
	getIsSuccessResponseValidator,
	dataExtractor
} from '@/shared/models/utils';
import { StandardFailError } from '@/shared/packages';
import {
	StandardResponse,
	InRoomRequest,
	getStandardSuccessResponse,
	StandardSuccessResponse
} from '@/shared/types';

export const roomsDomain = createDomain();

export const $roomId = roomsDomain.store<null | number>(null);
export const getRoomsFx = roomsDomain.effect<
	GetRoomsRequest,
	StandardResponse<Room[]>,
	StandardFailError
>('getRoomsFx');

export const getRoomFx = roomsDomain.effect<
	number,
	StandardResponse<Room>,
	StandardFailError
>('getRoomFx');

getRoomsFx.use(roomsApi.getAll);
getRoomFx.use(roomsApi.getOne);

export const getRoomsQuery = createQueryWithAccess<
	GetRoomsRequest,
	StandardResponse<Room[]>,
	StandardFailError,
	StandardSuccessResponse<Room[]>,
	Room[]
>({
	initialValue: [],
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

export const RoomsGate = createGate<void>({
	domain: roomsDomain,
	name: 'roomsGate',
});

export const RoomGate = createGate<InRoomRequest>({
	domain: roomsDomain,
	name: 'roomGate',
});

sample({
	clock: RoomsGate.open,
	fn: () => ({}),
	target: getRoomsQuery.start,
});

sample({
	clock: RoomGate.open,
	fn: ({ roomId, }) => roomId,
	target: getRoomQuery.start,
});

cache(getRoomsQuery, {
	staleAfter: '15min',
	purge: RoomsGate.close,
});

cache(getRoomQuery, {
	staleAfter: '15min',
});

querySync({
	controls,
	route: routes.rooms,
	source: {
		[getParams.roomId]: $roomId,
	},
});
