import { Record, Number, String, Static } from 'runtypes';
import { AccessOptions } from '@/shared/lib';
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

export interface CreateTagParams
	extends Required<AccessOptions>,
		Omit<Tag, 'id'> {}

export interface UpdateTagParams
	extends Partial<Omit<CreateTagParams, 'roomId' | 'accessToken'>>,
		Required<AccessOptions> {
	readonly id: number;
	readonly roomId: number;
}

export interface RemoveTagParams extends Required<AccessOptions> {
	readonly id: number;
	readonly roomId: number;
}
