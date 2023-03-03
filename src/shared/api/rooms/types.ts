import { Record, Number, String, Static, Boolean } from 'runtypes';
import { InRoomParams } from '@/shared/types';

export const room = Record({
	id: Number,
	ownerId: Number,
	name: String,
	description: String,
	canChange: Boolean,
}).asReadonly();

export interface Room extends Static<typeof room> {}

export interface CreateRoomParams extends Pick<Room, 'description' | 'name'> {}
export interface UpdateRoomParams
	extends Partial<CreateRoomParams>,
		InRoomParams {}
