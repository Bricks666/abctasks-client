/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { createGate } from 'effector-react';
import { StandardFailError } from '@/packages';
import {
	CreateRoomRequest,
	GetRoomsRequest,
	RemoveRoomRequest,
	UpdateRoomRequest,
} from '@/api';
import { StandardResponse, InRoomRequest } from '@/types';
import { Room } from './types';

export const RoomsDomain = createDomain('RoomsDomain');

export const getRoomsFx = RoomsDomain.effect<
	GetRoomsRequest,
	StandardResponse<Room[]>,
	StandardFailError
>('getRoomsFx');

export const getRoomFx = RoomsDomain.effect<
	number,
	StandardResponse<Room>,
	StandardFailError
>('getRoomFx');

export const createRoomFx = RoomsDomain.effect<
	CreateRoomRequest,
	StandardResponse<Room>,
	StandardFailError
>('createRoomFx');

export const updateRoomFx = RoomsDomain.effect<
	UpdateRoomRequest,
	StandardResponse<Room>,
	StandardFailError
>('updateRoomFx');

export const removeRoomFx = RoomsDomain.effect<
	RemoveRoomRequest,
	StandardResponse<boolean>,
	StandardFailError
>('removeRoomFx');

export const RoomsGate = createGate({
	domain: RoomsDomain,
	name: 'roomsGate',
});

export const RoomGate = createGate<InRoomRequest>({
	domain: RoomsDomain,
	name: 'roomGate',
});
