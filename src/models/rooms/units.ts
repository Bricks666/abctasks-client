/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { CreateRoomRequest, RoomResponse, UpdateRoomRequest } from './types';
import { StandardResponse } from '@/types/response';

export const RoomsDomain = createDomain('RoomsDomain');

export const $RoomId = RoomsDomain.store<number>(0, { name: 'Active room id' });

export const getRoomsFx = RoomsDomain.effect<
	void,
	StandardResponse<RoomResponse[]>
>('getRoomsFx');
export const getRoomFx = RoomsDomain.effect<
	number,
	StandardResponse<RoomResponse>
>('getRoomFx');
export const removeRoomFx = RoomsDomain.effect<
	number,
	StandardResponse<boolean>
>('removeRoomFx');
export const createRoomFx = RoomsDomain.effect<
	CreateRoomRequest,
	StandardResponse<RoomResponse>
>('createRoomFx');
export const updateRoomFx = RoomsDomain.effect<
	UpdateRoomRequest,
	StandardResponse<RoomResponse>
>('updateRoomFx');
