/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { createGate } from 'effector-react';
import { StandardFailError } from '@/packages/request';
import {
	CreateRoomRequest,
	GetRoomsRequest,
	RemoveRoomRequest,
	UpdateRoomRequest,
} from '@/api';
import { StandardResponse, InRoomRequest } from '@/types';
import { Room } from './types';
import { attachWithAccessToken } from '../auth';

export const RoomsDomain = createDomain('RoomsDomain');

export const getRoomsBaseFx = RoomsDomain.effect<
	GetRoomsRequest,
	StandardResponse<Room[]>,
	StandardFailError
>('getRoomsBaseFx');
export const getRoomsFx = attachWithAccessToken({
	effect: getRoomsBaseFx,
	name: 'getRoomsFx',
});

export const getRoomFx = RoomsDomain.effect<
	number,
	StandardResponse<Room>,
	StandardFailError
>('getRoomBaseFx');

export const createRoomBaseFx = RoomsDomain.effect<
	CreateRoomRequest,
	StandardResponse<Room>,
	StandardFailError
>('createRoomBaseFx');
export const createRoomFx = attachWithAccessToken({
	effect: createRoomBaseFx,
	name: 'createRoomFx',
});

export const updateRoomBaseFx = RoomsDomain.effect<
	UpdateRoomRequest,
	StandardResponse<Room>,
	StandardFailError
>('updateRoomBaseFx');

export const updateRoomFx = attachWithAccessToken({
	effect: updateRoomBaseFx,
	name: 'updateRoomFx',
});

export const removeRoomBaseFx = RoomsDomain.effect<
	RemoveRoomRequest,
	StandardResponse<boolean>,
	StandardFailError
>('removeRoomBaseFx');

export const removeRoomFx = attachWithAccessToken({
	effect: removeRoomBaseFx,
	name: 'removeRoomFx',
});

export const roomsGate = createGate({
	domain: RoomsDomain,
	name: 'roomsGate',
});

export const roomGate = createGate<InRoomRequest>({
	domain: RoomsDomain,
	name: 'roomGate',
});
