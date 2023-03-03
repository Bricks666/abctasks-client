import { Record, Number, String, Static } from 'runtypes';
import { hex, InRoomParams } from '@/shared/types';

export const tag = Record({
	id: Number,
	roomId: Number,
	name: String,
	mainColor: hex,
	secondColor: hex,
});

export interface Tag extends Static<typeof tag> {}

export interface GetTagParams extends InRoomParams {
	readonly id: number;
}

export interface CreateTagParams extends Omit<Tag, 'id'> {}

export interface UpdateTagParams
	extends Partial<Omit<CreateTagParams, 'roomId'>>,
		InRoomParams {
	readonly id: number;
}

export interface RemoveTagParams extends InRoomParams {
	readonly id: number;
}
