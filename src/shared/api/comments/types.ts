import { Number, Record, String, Static } from 'runtypes';
import { InRoomParams } from '@/shared/types';

export const comment = Record({
	id: Number,
	roomId: Number,
	authorId: Number,
	taskId: Number,
	content: String,
}).asReadonly();

export interface Comment extends Static<typeof comment> {}

export interface BaseCommentParams extends InRoomParams {
	readonly taskId: number;
}

export interface GetOneParams extends BaseCommentParams {
	readonly id: number;
}

export interface CreateParams extends BaseCommentParams {
	readonly content: string;
}

export interface UpdateParams extends BaseCommentParams {
	readonly id: number;
	readonly content: string;
}

export interface RemoveParams extends BaseCommentParams {
	readonly id: number;
}
