/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import {
	CreateRoomRequest,
	Room,
	RoomResponse,
	UpdateRoomRequest,
} from './types';
import { StandardResponse } from '@/interfaces/response/standardResponse';

export const RoomsDomain = createDomain('RoomsDomain');

export const $Rooms = RoomsDomain.store<Room[]>([], { name: 'RoomsStore' });

export const loadRoomsFx = RoomsDomain.effect<
	void,
	StandardResponse<RoomResponse[]>
>('loadRoomsFx');
export const loadRoomFx = RoomsDomain.effect<
	number,
	StandardResponse<RoomResponse>
>('loadRoomFx');
export const deleteRoomFx = RoomsDomain.effect<
	number,
	StandardResponse<boolean>
>('deleteRoomFx');
export const createRoomFx = RoomsDomain.effect<
	CreateRoomRequest,
	StandardResponse<RoomResponse>
>('createRoomFx');
export const updateRoomFx = RoomsDomain.effect<
	UpdateRoomRequest,
	StandardResponse<RoomResponse>
>('updateRoomFx');
